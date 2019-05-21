import moment from "moment";

class DateFilters {
    date = {};
    __tx_to_day = 86400 / 15;
    __tx_to_hour = Math.floor(this.__tx_to_day / 24);
    __tx_to_minute = Math.floor(this.__tx_to_hour / 60);

    async __correlate(current_block_number, fromDate, unix_of_time) {
        let flag = true;
        const multiplex = {
            'days': this.__tx_to_day,
            'minutes': this.__tx_to_minute,
        };
        const last = await window.web3.eth.getBlockNumber()

        do {
            let current_block = await window.web3.eth.getBlock(current_block_number);
            if (current_block === null) {
                current_block = {
                    number: current_block_number
                }
            }
            if (current_block.number >= last) {
                return last
            } else if (current_block.number <= 0) {
                return 0
            }
            const current_block_date = moment(current_block.timestamp * 1000);
            const current_block_diff = fromDate.diff(current_block_date, unix_of_time);

            if (current_block_diff !== 0) {
                current_block_number += (current_block_diff * multiplex[unix_of_time]);
            } else {
                flag = false;
                break;
            }
        } while (flag);
        return current_block_number;
    }

    async __get_block_by_date(date) {
        const last_number = await window.web3.eth.getBlockNumber();
        const last_block = await window.web3.eth.getBlock(last_number);
        const last_block_date = moment(last_block.timestamp * 1000);
        date = moment(date);
        const date_diff = last_block_date.diff(date, 'days');
        let current_block_number = Math.floor(last_number - (date_diff * this.__tx_to_day));
        current_block_number = await this.__correlate(current_block_number, date, 'days');
        current_block_number = await this.__correlate(current_block_number, date, 'minutes');
        return current_block_number;
    }

    async set(date) {
        this.date = date
    }

    async get() {
        let result = {};
        for (let key in this.date) {
            result[key] = await this.__get_block_by_date(this.date[key])
        }
        console.log(result);
        return result;
    }
}

export default DateFilters;