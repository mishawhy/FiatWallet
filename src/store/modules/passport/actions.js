/* ============
 * Actions for the connect module
 * ============
 *
 * The actions that are available on the
 * connect module
 */

import Vue from 'vue'
import { Message } from 'element-ui'
import { path } from 'ramda'
import {
  SET_PASSPORT_STATE,
} from '@/constant/mutations'

export default {
  addNewBankAccount ({ commit, state, rootState }, params) {
    const isIssuer = rootState.enter.isIssuer
    const endpoint = isIssuer ? 'bank/deposit' : 'bank/my'
    return Vue.http
      .post(endpoint, params)
  },
  async updateGeneralData ({ commit, state, rootState }, params) {
    const endpoint = 'passport/my'
    let passport
    try {
      passport = await Vue.http
        .patch(endpoint, params)
    } catch (e) {
      Message.error('Something goes wrong with connection to server')
    }
    return passport
  },
  editBankAccount ({ commit, state, rootState }, payload) {
    const isIssuer = rootState.enter.isIssuer
    const { id, params } = payload
    const endpoint = isIssuer ? `bank/edit/${id}` : `bank/my_edit/${id}`
    return Vue.http
      .patch(endpoint, params)
  },
  async getBankAccounts ({ commit, state, rootState }) {
    const isIssuer = rootState.enter.isIssuer
    const endpoint = isIssuer ? 'bank/deposit' : 'bank/my'
    let banks
    try {
      banks = await Vue.http
        .get(endpoint)
    } catch (e) {
      console.warn(e)
    }
    commit(SET_PASSPORT_STATE, {
      key: 'data',
      value: path(['body', 'results'], banks)
    })
  }
}
