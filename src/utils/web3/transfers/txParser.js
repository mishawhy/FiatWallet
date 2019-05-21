import moment from "moment";
import {main_contract_address} from "../../../constant/ethereum";

export default class TxParser {

    constructor(address) {
        this.address = address
    }

    __txUsd = [];
    __txEuro = [];

    async set({txUSD, txEURO, address}) {
        if (txUSD) this.__txUsd = [...this.__txUsd, ...await this.__predict_objects(txUSD, "USD", address)];
        if (txEURO) this.__txEuro = [...this.__txEuro, ...await this.__predict_objects(txEURO, "EURO", address)];
    }

    __get_type(from, to) {
        if (to === main_contract_address) {
            return 'withdraw'
        } else if (from === main_contract_address) {
            return 'deposit'
        } else if (to === this.address) {
            return 'received'
        } else if (from === this.address) {
            return 'send'
        } else {
            return 'transfer'
        }
    }

    __parse_address(address) {
        if (address === main_contract_address) {
            return "SkyLark"
        } else if (address === this.address) {
            return "My wallet"
        }
        return address
    }


    async __predict_objects(object, currency) {
        let new_array = [];
        for (const item of object) {
            const block = await window.web3.eth.getBlock(item.blockNumber);
            let ref;
            try {
                 ref = window.web3.utils.hexToString(item.returnValues.ref);
            } catch (e) {
                 ref = 'INVALID REFERENCE';
            }
            new_array.push({
                type: this.__get_type(item.returnValues.from, item.returnValues.to),
                to: this.__parse_address(item.returnValues.to),
                from: this.__parse_address(item.returnValues.from),
                value: window.web3.utils.fromWei(item.returnValues.value),
                currency: currency,
                ref,
                date: block.timestamp,
                to_full: item.returnValues.to,
                from_full: item.returnValues.from,
                fee: window.web3.utils.fromWei(item.returnValues.fee),
                blockNumber: item.blockNumber,
                hashUrl: process.env.VUE_APP_SCAN_URL + "/tx/" + item.transactionHash,
                transactionHash:  item.transactionHash
            });
        }
        // console.log(new_array)
        return new_array
    }

    __sort_by_desc(transactions) {
        const by_date = transactions.slice(0);
        by_date.sort((a, b) => a.date - b.date);
        by_date.map((data) => data.date = moment(data.date * 1000).format("YYYY-MM-DD HH:mm:ss"));
        return by_date.reverse()
    }

    async get() {
        return this.__sort_by_desc([...this.__txEuro, ...this.__txUsd])
    }
}
