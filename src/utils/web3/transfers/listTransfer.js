import Web3Utils from "../core/fabric";
import TxParser from "./txParser";
import TypeFilters from "./typeFilters";
import DateFilters from "./dateFilters";


export default class ListTransfer {
    constructor(address) {
        this.address = address
        this.__min_block = this.__get_min_block();
    }

    __get_min_block() {
        return process.env.VUE_APP_MIN_BLOCK

    }

    // Записываем последний найденый блок
    static __last_block = {
        all: null,
        custom: null,
    };
    /**
     * Если в течении __tx_counter_limit_zero итераций не найден блок то
     * умножаем  __tx_skip на __multiplier аналогично с делением если найденно
     * более __tx_skip делим на __multiplier
     * @type {number}
     * @private
     */

    __multiplier = 2;


    // __min_block = 5049500;
    /**
     * Счетчик найденных транзакций
     * @type {number}
     * @private
     */
    __tx_counter = 0;

    /**
     * Счетчик пустых итераций
     * @type {number}
     * @private
     */
    __iteration_missing_counter = 0;

    /**
     *
     * @type {number}
     * @private
     */
    __max_iteration_missing = 2;

    /**
     * максимальное количеств транзакций
     * @type {number}
     * @private
     */
    __tx_limit = 10;

    /**
     * Отсуп для поиска блоков
     * @type {number}
     * @private
     */
    __tx_skip = 240 * 128;

    type = {};

    fromBlock = 0;
    __clear = true;


    static async __get_last_block(query) {
        if (ListTransfer.__last_block[query] === null) {
            ListTransfer.__last_block[query] = await window.web3.eth.getBlockNumber()
        }
        return ListTransfer.__last_block[query];
    }

    static __save_last_block(last, query) {
        ListTransfer.__last_block[query] = last;
    }

    __missing() {
        this.__iteration_missing_counter += 1;
        if (this.__iteration_missing_counter > this.__max_iteration_missing) {
            this.__tx_skip = Math.floor(this.__tx_skip + this.__tx_skip);
            this.__iteration_missing_counter = 0;
        }
    }

    async __prepare_result(result, query) {
        let more = false;
        const transactions = result.slice(0, this.__tx_limit)
        // console.log(this.__tx_limit + 1, this.__tx_counter, result.length)
        if (this.__tx_limit + 1 <= this.__tx_counter) {
            ListTransfer.__save_last_block(result[transactions.length].blockNumber, query);
            more = true;
        }
        return {
            more,
            transactions
        };
    }

    async __search_transfers(currency_array, query, callbackSearch = () => {
    }) {
        const parser = new TxParser(this.address);
        const toBlockInit = await ListTransfer.__get_last_block(query);
        const load_while = this.type.address !== undefined;
        do {
            let logCounters = [];
            let toBlock = await ListTransfer.__get_last_block(query);
            this.fromBlock = toBlock - this.__tx_skip;
            if (this.fromBlock < this.__min_block - this.__tx_skip) break;
            for (const currencyKey of currency_array) {
                // console.log("TYPE", this.type);
                const instance = await Web3Utils.get_contract_instance(currencyKey);
                let transactions_one = [];
                if (load_while) {
                    transactions_one = await instance.getPastEvents('Transfer', {
                        fromBlock: this.fromBlock,
                        toBlock,
                        filter: {
                            to: this.address
                        },
                    });
                    this.type = {from: this.address}
                }

                const transactions = await instance.getPastEvents('Transfer', {
                    fromBlock: this.fromBlock,
                    toBlock,
                    filter: {
                        ...this.type
                    },
                });
                // console.warn(transactions);
                // console.warn(transactions_one);
                const transactions_result = [...transactions, ...transactions_one];
                // console.log(transactions_result);
                logCounters.push(Object.keys(transactions_result).length);
                await parser.set({['tx' + currencyKey]: transactions_result});
            }
            this.__tx_counter += logCounters.reduce((prev, next) => prev + next);
            if (logCounters.every(elem => elem < 1)) this.__missing();
            ListTransfer.__save_last_block(this.fromBlock, query);
            callbackSearch({
                max: toBlockInit,
                min: this.__min_block - this.__tx_skip,
                currentMin: this.fromBlock,
                currentMax: toBlock,
            })
        } while (this.__tx_limit + 1 > this.__tx_counter);
        // console.log(`SecondWay: ${end - start}ms`);
        return this.__prepare_result(await parser.get(), query)
    }

    async set_date({fromDate, toDate}, type = 'custom') {
        const date_filter = new DateFilters();
        await date_filter.set({fromDate, toDate});
        const output = await date_filter.get()
        this.__clear = false;
        // console.log("BLOCK", output.fromDate, output.toDate)
        ListTransfer.__last_block[type] = output.toDate;
        this.__min_block = output.fromDate;
    }

    set_type(type) {
        const type_filter = new TypeFilters(this.address);
        type_filter.set_types(type);
        this.type = type_filter.get()
    }

    set_limit(limit) {
        this.__tx_limit = limit;
    }

    async all(callbackSearch) {
        this.set_limit(1e+10);
        this.__min_block = this.__get_min_block();
        return await this.__search_transfers(['EURO', "USD"], 'all', callbackSearch);
    }

    async more(currency_array) {
        return await this.__search_transfers(currency_array, 'custom');
    }

    async list(currency_array) {
        if (this.__clear) {
            ListTransfer.__last_block['custom'] = null;
        }
        this.__clear = true;
        return await this.__search_transfers(currency_array, 'custom');
    }

}

