/* ============
 * Actions for the connect module
 * ============
 *
 * The actions that are available on the
 * connect module
 */

import { SET_TRANSACTIONS_STATE, SET_PROCESS_STATE } from '@/constant/mutations'
import {
  getTransactions, sendTransfer, getBalance, withdraw, getFee,
  issue, burn
} from '@/utils/web3'
import { path } from 'ramda'
import { get_invoice } from '../../../utils/invoices'
import moment from 'moment'
import InvoiceGenerator from '../../../utils/invoices/generator'

export default {
  async getIssuerTransactions ({ commit, state, rootState }, {
    more = false,
    filter
  }) {
    const data = await getTransactions({
      more: more,
      filter: {
        limit: 15,
        ...filter
      }
    })
    let transactions = more ? path(['data', 'transactions'], state) : []
    transactions = transactions.concat(data.transactions)
    commit(SET_TRANSACTIONS_STATE, {
      key: 'data',
      value: {
        transactions,
        more: data.more
      }
    })
  },
  async getTransactions ({ commit, state, rootState }, {
    more = false,
    filter,
    address
  }) {
    if (address === undefined) {
      address = rootState.enter.address
    }
    const data = await getTransactions({
      more: more,
      address,
      filter: {
        limit: 15,
        ...filter
      }
    })
    let transactions = more ? path(['data', 'transactions'], state) : []
    transactions = transactions.concat(data.transactions)
    commit(SET_TRANSACTIONS_STATE, {
      key: 'data',
      value: {
        transactions,
        more: data.more
      }
    })
  },
  async sendToken ({ state, commit, dispatch, rootState }, {
    to, amount, currency, reference
  }) {
    commit(SET_PROCESS_STATE, {
      key: 'send',
      value: {
        type: 'wait',
        title: 'Waiting transactions 5-10 minutes',
        description: 'Stopodf'
      }
    })
    try {
      const transaction = await sendTransfer({
        from: rootState.enter.address,
        to,
        reference,
        amount,
        currency
      })
      commit(SET_PROCESS_STATE, {
        key: 'send',
        value: {
          type: 'done',
          title: 'Send done',
          description: 'Stopodf',
          invoice: {
            type: 'sendTransfer',
            params: {
              amount,
              currency,
              to,
              reference
            }
          }
        }
      })
    } catch (error) {
      commit(SET_PROCESS_STATE, {
        key: 'send',
        value: {
          type: 'failed',
          title: 'Something goes wrong',
          description: error.message
        }
      })
    }
  },
  async issueToken ({ state, commit, dispatch, rootState }, {
    to, amount, currency
  }) {
    commit(SET_PROCESS_STATE, {
      key: 'issue',
      value: {
        type: 'wait',
        title: 'Waiting transactions 5-10 minutes',
        description: 'Stopodf'
      }
    })
    try {
      const transaction = await issue({
        from: rootState.enter.address,
        to,
        amount,
        currency
      })
      commit(SET_PROCESS_STATE, {
        key: 'issue',
        value: {
          type: 'done',
          title: 'Issue done',
          description: 'Stopodf'
        }
      })
    } catch (error) {
      commit(SET_PROCESS_STATE, {
        key: 'issue',
        value: {
          type: 'failed',
          title: 'Something goes wrong',
          description: error.message
        }
      })
    }
  },
  async burnToken ({ state, commit, dispatch, rootState }, {
    to, amount, currency
  }) {
    commit(SET_PROCESS_STATE, {
      key: 'burn',
      value: {
        type: 'wait',
        title: 'Waiting transactions 5-10 minutes',
        description: 'Stopodf'
      }
    })
    try {
      const transaction = await burn({
        from: rootState.enter.address,
        to,
        amount,
        currency
      })
      commit(SET_PROCESS_STATE, {
        key: 'burn',
        value: {
          type: 'done',
          title: 'Burn done',
          description: 'Stopodf'
        }
      })
    } catch (error) {
      commit(SET_PROCESS_STATE, {
        key: 'burn',
        value: {
          type: 'failed',
          title: 'Something goes wrong',
          description: error.message
        }
      })
    }
  },
  async receiveToken ({ state, commit, dispatch, rootState }, {
    address, amount, reference, currency
  }) {
    commit(SET_PROCESS_STATE, {
      key: 'receipt',
      value: {
        type: 'wait',
        title: 'Waiting for invoice',
        description: 'Stopodf'
      }
    })

    commit(SET_PROCESS_STATE, {
      key: 'receipt',
      value: {
        type: 'done',
        title: 'Invoice generated',
        description: 'Stopodf',
        invoice: {
          type: 'receipt',
          params: {
            amount,
            currency,
            reference,
            address
          }
        }
      }
    })
  },
  async depositToken ({ state, commit, dispatch, rootState }, {
    amount, currency
  }) {
    commit(SET_PROCESS_STATE, {
      key: 'deposit',
      value: {
        type: 'done',
        title: 'Invoice successfully generated',
        description: 'Download invoice',
        invoice: {
          type: 'deposit',
          params: {
            amount,
            currency
          }
        }
      }
    })
  },
  async withdrawToken ({ state, commit, dispatch, rootState }, {
    amount, currency
  }) {
    commit(SET_PROCESS_STATE, {
      key: 'withdraw',
      value: {
        type: 'wait',
        title: 'Waiting confirmation',
        description: 'Waiting for confirmation withdraw request'
      }
    })
    try {
      const transaction = await withdraw({
        from: rootState.enter.address,
        amount,
        currency
      })
      commit(SET_PROCESS_STATE, {
        key: 'withdraw',
        value: {
          type: 'done',
          title: 'Withdraw request send',
          description: 'Stopodf',
          invoice: {
            type: 'withdraw',
            params: {
              amount,
              currency
            }
          }
        }
      })
    } catch (error) {
      commit(SET_PROCESS_STATE, {
        key: 'withdraw',
        value: {
          type: 'failed',
          title: 'Something goes wrong',
          description: error.message
        }
      })
    }
  },
  async getBalance ({ state, commit, dispatch, rootState }) {
    const from = rootState.enter.address
    const balance = await getBalance({ from, currency: 'USD' })
    commit(SET_TRANSACTIONS_STATE, {
      key: 'balance',
      value: balance
    })
  },
  async calculateFee ({ state, commit, dispatch, rootState }, { type, amount, currency }) {
    return await getFee({ type, amount, currency, address: rootState.enter.address })
  },
  async calculatePassportFee ({ state, commit, dispatch, rootState }, { type, amount, currency, address }) {
    return await getFee({ type, amount, currency, address })
  },

  /**
     * @param params {
     *     invoice_number: string,
     *     beneficiary_name: string,
     *     issue_date: string,
     *     due_date: string,
     *     deposit_amount: string,
     *     currency: string,
     *     skylark_beneficiary_name: string,
     *     skylark_iban: string,
     *     skylark_bic: string,
     * }
     */

  generateInvoice ({ state, commit, dispatch, rootState }, { type, params }) {
    try {
      new InvoiceGenerator(
        {
          ...params,
          ...rootState.enter.passport,
          address: rootState.enter.address
        }, { ...params, type }
      )
    } catch (e) {
      console.log(e)
    }

    // const invoice_withdraw = new InvoiceGenerator(
    //     {
    //         ...rootState.enter.passport,
    //         address: rootState.enter.address
    //     }, {...params, type: "withdraw"}
    // );
    // invoice_withdraw.get();
    //
    // const invoice_user = new InvoiceGenerator(
    //     {
    //         ...rootState.enter.passport,
    //         address: rootState.enter.address
    //     }, {...params, type: "user"}
    // );
    // invoice_user.get();
  }
}
