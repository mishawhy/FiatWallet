/* ============
 * Actions for the connect module
 * ============
 *
 * The actions that are available on the
 * connect module
//  */

import { SET_BALANCE_STATE } from '@/constant/mutations'
import { getTransactions, sendTransfer, getBalance, getTotalBalance } from '@/utils/web3'
export default {
  async getBalance ({ state, commit, dispatch, rootState }) {
    const from = rootState.enter.address
    const usd = await getBalance({ from, currency: 'USD' })
    const euro = await getBalance({ from, currency: 'EURO' })
    commit(SET_BALANCE_STATE, {
      key: 'balance',
      value: {
        usd,
        euro
      }
    })
  },
  async getUserBalance ({ state, commit, dispatch, rootState }, { address }) {
    const usd = await getBalance({ from: address, currency: 'USD' })
    const euro = await getBalance({ from: address, currency: 'EURO' })
    return {
      usd, euro
    }
  },
  async getTotalBalance ({ state, commit, dispatch, rootState }) {
    const from = rootState.enter.address
    const usd = await getTotalBalance({ currency: 'USD' })
    const euro = await getTotalBalance({ currency: 'EURO' })
    commit(SET_BALANCE_STATE, {
      key: 'total',
      value: {
        usd,
        euro
      }
    })
  }
}
