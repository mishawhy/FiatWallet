/* ============
 * Actions for the users module
 * ============
 *
 * The actions that are available on the
 * users module
 */

import Vue from 'vue'
import { Message } from 'element-ui'
import { SET_USERS_STATE, UPDATE_USER_STATUS } from '@/constant/mutations'
import { issuePass } from '@/utils/web3'

export default {
  async getUsersList ({ commit }, filter) {
    let users

    console.log('SEARCH', filter)
    try {
      users = await Vue.http
        .get('passport/users/', {
          params: filter
        })
    } catch (error) {
      console.warn(error)
      Message({
        type: 'error',
        dangerouslyUseHTMLString: true,
        message: error.body.detail
      })
    }
    commit(SET_USERS_STATE, {
      key: 'usersList',
      value: users
    })
  },
  async issuePass ({ commit, rootState }, args) {
    try {
      const from = rootState.enter.address
      const address = args.to
      const tx = await issuePass({ ...args, from })
      commit(UPDATE_USER_STATUS, {
        key: 'usersList',
        value: { address, status: 'APPROVED' }
      })

      Vue.http
        .post('passport/change_status', { address, status: 'APPROVED' })
        .then(response => {
          Message.success({
            message: `User ${address} was successfully whitelisted`
          })
        })
        .catch(error => {
          Message.error({
            message: 'Something goes wrong' + error
          })
        })
    } catch (error) {
      Message.error({
        message: 'Something goes wrong: ' + error
      })
    }
    return tx
  },
  async rejectPass ({ commit, rootState }, { address }) {
    try {
      // const from = rootState.enter.address
      // const address = args.to
      // const tx = await issuePass({ ...args, from })
      commit(UPDATE_USER_STATUS, {
        key: 'usersList',
        value: { address, status: 'REJECT' }
      })

      Vue.http
        .post('passport/change_status', { address, status: 'REJECT' })
        .then(response => {
          Message.success({
            message: `User ${address} was successfully rejected`
          })
        })
        .catch(error => {
          Message.error({
            message: 'Something goes wrong' + error
          })
        })
    } catch (error) {
      Message.error({
        message: 'Something goes wrong: ' + error
      })
    }
    return tx
  }
}
