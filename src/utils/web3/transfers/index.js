import Web3Utils from './../core/fabric'
import ListTransfer from './listTransfer'
import Csv from '../csv'

class Transfers {
    /**
     *
     * @param from
     * @param currency
     * @returns {Promise<*>}
     */
    static async get_balance({from, currency}) {
        const balance = await Web3Utils.get_contract_instance(currency).methods.balanceOf(from).call()
        return await window.web3.utils.fromWei(balance.toString())
    }

    static async get_total_balance({currency}) {
        const balance = await Web3Utils.get_contract_instance(currency).methods.totalSupply().call()
        return await window.web3.utils.fromWei(balance.toString())
    }


    static async export_csv({address, filter, progress}) {
        const query = await Transfers.get_transactions({address, filter}, true, (data) => {
            progress(Math.floor(100 - (100 / data.max * data.currentMax)));
        });
        const csv = new Csv();
        csv.set(query.transactions);
        await csv.download();
    }

    /**
     * Get all transactions
     * @param currency(USD, EURO, undefined)
     * @param from
     * @param filter {
     *     type: [withdraw, deposit, received, send, deposit-withdraw]
     *     fromDate: [2019-01-31],
     *     toDate: [2019-02-07],
     *     limit: 10
     * }
     * @param all
     * @param cb
     */
    static async get_transactions({currency, address, more, filter}, all = false, cb) {
        const list_transfer = new ListTransfer(address)
        let currency_array = ['USD', 'EURO']
        if (currency !== undefined) currency_array = [currency]
        if (typeof filter === 'object') {
            if (filter && 'type' in filter || address !== undefined) list_transfer.set_type(filter.type)
            if (filter && 'limit' in filter) list_transfer.set_limit(filter.limit)
            if (filter && 'fromDate' in filter && 'toDate' in filter) {
                await list_transfer.set_date({toDate: filter.toDate, fromDate: filter.fromDate})
            }
        }
        if (all) return await list_transfer.all(cb)
        if (more !== undefined && more) return await list_transfer.more(currency_array)
        return await list_transfer.list(currency_array)
    }
}

export default Transfers
