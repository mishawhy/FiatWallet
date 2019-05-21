/* ============
 * Actions for the Business Verification module
 * ============
 *
 * The actions that are available on this module
 */

import Vue from 'vue'
import { propOr, pathOr, is } from 'ramda'
import { Message } from 'element-ui'
import { prepareNetworkErrors } from '@/utils/errors'
import { SET_VERIFICATION_STATE } from '@/constant/mutations'

export default {
  setComponentState ({ commit, rootState, dispatch }, payload) {
    commit(SET_VERIFICATION_STATE, payload)
  },
  passportStatus ({ commit }) {
    console.log('state')
    commit(SET_VERIFICATION_STATE, {
      key: 'loading',
      value: true
    })
    return Vue.http
      .get('passport/status')
      .then(response => {
        let vstep = 'VVerificationStatus'
        let tstep = 3

        const { step, data } = response.body
        console.info(step, data)
        switch (step) {
          case 'GENERAL': {
            vstep = 'VGeneral'
            tstep = 1
            break
          }
          case 'EMAIL': {
            vstep = 'VEmailConfirm'
            tstep = 2
            break
          }
          case 'PHONE': {
            vstep = 'VPhoneConfirm'
            tstep = 2
            break
          }
          case 'BUSINESS' : {
            console.log(data.type)
            if (data.type === 'PRIVATE') {
              vstep = 'VPrivate'
            } else {
              vstep = 'VCorporate'
            }
            tstep = 3
            break
          }
          case 'FINISH': {
            console.log('HELLO WORLD 1')
            const { status } = data
            vstep = 'VVerificationStatus'
            commit(SET_VERIFICATION_STATE, {
              key: 'status',
              value: {
                [status]: true
              }
            })
            break
          }
        }
        commit(SET_VERIFICATION_STATE, {
          key: 'step',
          value: tstep
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'tab',
          value: vstep
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'data',
          value: data
        })
      })
      .catch(error => {
        const errors = propOr([], 'body', error)
        let message = errors
        if (is(Array, errors)) message = prepareNetworkErrors(errors)
        Message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: message
        })
      })

      .finally(() => {
        commit(SET_VERIFICATION_STATE, {
          key: 'loading',
          value: false
        })
      })
  },
  submitGeneral ({ commit }, payload) {
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'data',
    //   value: payload
    // })
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'tab',
    //   value: 'VEmailConfirm'
    // })
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'data',
    //   value: payload
    // })
    return Vue.http
      .post('passport/general/', payload)
      .then(response => {
        commit(SET_VERIFICATION_STATE, {
          key: 'data',
          value: payload
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'tab',
          value: 'VEmailConfirm'
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'step',
          value: 2
        })
      })
      .catch(error => {
        const errors = propOr([], 'body', error)
        let message = errors
        if (is(Array, errors)) message = prepareNetworkErrors(errors)
        Message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: message
        })
      })
  },
  submitEmailConfirm ({ commit }, payload) {
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'tab',
    //   value: 'VPhoneConfirm'
    // })
    return Vue.http
      .post('passport/confirm_email', payload)
      .then(response => {
        commit(SET_VERIFICATION_STATE, {
          key: 'tab',
          value: 'VPhoneConfirm'
        })
      })

      .catch(error => {
        const errors = pathOr('', ['body', 'detail'], error)
        Message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: errors
        })
      })
  },
  submitPhoneConfirm ({ commit }, payload) {
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'tab',
    //   value: 'VIdentityVerification'
    // })
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'step',
    //   value: 2
    // })
    return Vue.http
      .post('passport/confirm_phone', payload)
      .then(response => {
        commit(SET_VERIFICATION_STATE, {
          key: 'tab',
          value: 'VVerificationStatus'
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'status',
          value: {
            WAIT: true
          }
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'step',
          value: 3
        })
      })
      .catch(error => {
        const errors = pathOr('', ['body', 'detail'], error)
        Message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: errors
        })
      })
  },
  submitIdentityVerification ({ commit }, payload) {
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'tab',
    //   value: 'VBusinessVerification'
    // })
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'step',
    //   value: 3
    // })
    return Vue.http
      .put('passport/documents', payload)
      .then(response => {
        commit(SET_VERIFICATION_STATE, {
          key: 'tab',
          value: 'VVerificationStatus'
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'status',
          value: {
            WAIT: true
          }
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'step',
          value: 3
        })
      })
      .catch(error => {
        const errors = propOr([], 'body', error)
        let message = errors
        if (is(Array, errors)) message = prepareNetworkErrors(errors)
        Message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: message
        })
      })
  },
  submitPrivateVerification ({ commit }, payload) {
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'tab',
    //   value: 'VVerificationStatus'
    // })
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'status',
    //   value: {
    //     WAIT: true
    //   }
    // })
    return Vue.http
      .post('passport/private', payload)
      .then(response => {
        commit(SET_VERIFICATION_STATE, {
          key: 'tab',
          value: 'VVerificationStatus'
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'status',
          value: {
            WAIT: true
          }
        })
      })
      .catch(error => {
        const errors = propOr([], 'body', error)
        let message = errors
        if (is(Array, errors)) message = prepareNetworkErrors(errors)
        Message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: message
        })
      })
  },
  submitCorpVerification ({ commit }, payload) {
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'tab',
    //   value: 'VVerificationStatus'
    // })
    // commit(SET_VERIFICATION_STATE, {
    //   key: 'status',
    //   value: {
    //     WAIT: true
    //   }
    // })
    return Vue.http
      .post('passport/corp', payload)
      .then(response => {
        commit(SET_VERIFICATION_STATE, {
          key: 'tab',
          value: 'VVerificationStatus'
        })
        commit(SET_VERIFICATION_STATE, {
          key: 'status',
          value: {
            WAIT: true
          }
        })
      })
      .catch(error => {
        const errors = propOr([], 'body', error)
        let message = errors
        if (is(Array, errors)) message = prepareNetworkErrors(errors)
        Message({
          dangerouslyUseHTMLString: true,
          type: 'error',
          message: message
        })
      })
  }
}
