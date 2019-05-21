/* ============
 * Actions for the connect module
 * ============
 *
 * The actions that are available on the
 * connect module
 */

import sigUtil from 'eth-sig-util'
import Vue from 'vue'
import Web3 from 'web3'
import { PASSPORT, SIGN_MSG } from '@/constant/ethereum'
import { Message } from 'element-ui'
import { router } from '@/plugins/vue-router'
import { generateSignMessage } from '@/utils/sign'
import { ROOT, ENTER } from '@/constant/routes'
import { SET_ENTER_STATE } from '@/constant/mutations'
import { sign as sign_auth, isProvider } from '@/utils/web3'

/* eslint-disable */

export default {
  async initWeb3 ({ state, commit, dispatch }) {
    if (window.web3) {
      if (typeof ethereum !== 'undefined') {
        await ethereum.enable()
      }
      window.web3 = new Web3(web3.currentProvider)
      const accounts = await web3.eth.getAccounts()
      const network = await web3.eth.net.getNetworkType()
      if (network !== VUE_APP_NETWORK) {
        commit(SET_ENTER_STATE, {
          key: 'status',
          value: 'network'
        })
      } else {
        commit(SET_ENTER_STATE, {
          key: 'network',
          value: network
        })
        commit(SET_ENTER_STATE, {
          key: 'address',
          value: accounts[0]
        })
        commit(SET_ENTER_STATE, {
          key: 'status',
          value: 'ready'
        })
        const checkIsProvider = await isProvider(state.address);


        commit(SET_ENTER_STATE, {
          key: 'isProvider',
          value: checkIsProvider
        })
        commit(SET_ENTER_STATE, {
          key: 'isIssuer',
          value: checkIsProvider
        })


        // await dispatch('token/initialize', {}, { root: true });
        // await dispatch('crowdsale/initialize', {}, { root: true });
        // await dispatch('passport/isVerified', {}, { root: true });
      }
    } else {
      commit(SET_ENTER_STATE, {
        key: 'status',
        value: 'extension'
      })
    }
  },
  async sign ({ state, commit, rootState, dispatch }) {

    console.log('sign start')
    sign_auth(state.address).then(async (result) => {
      commit(SET_ENTER_STATE, {
        key: 'sign',
        value: result
      })

      // try {
      //   console.log('goo')
      // const passport = await Vue.http
      //   .get('passport/my/')
      //
      //
      //    if (passport.ok){
      //   commit(SET_ENTER_STATE, {
      //     key: 'passport',
      //     value: passport.body
      //   })
      //   }
      //
      // } catch(error){
      //   console.log(error)
      //   // Message.error({
      //   //   message: error.body.detail
      //   // })
      // }

      router.push({
        name: ROOT
      });
    });
  },
  async logout ({ state, commit, rootState, dispatch }) {
      for (let stateKey in state) {
        commit(SET_ENTER_STATE, {
          key: stateKey,
          value: null
        })
      }
      sessionStorage.removeItem('sign')
      router.push({
        name: ENTER
      });
  },
  async verifySign ({ state, commit, dispatch }) {
    try {
      if (state.sign == null) {
        return false
      }
      window.web3 = new Web3(web3.currentProvider)
      const network = await web3.eth.net.getNetworkType()
      if (network !== VUE_APP_NETWORK) {
        return false
      }
      if (state.address == null) {
        const accounts = await web3.eth.getAccounts()
        if (!accounts[0]) {
          return false
        }
        commit(SET_ENTER_STATE, {
          key: 'address',
          value: accounts[0]
        })
        commit(SET_ENTER_STATE, {
          key: 'network',
          value: network
        })

        const checkIsProvider = await isProvider({account: state.address})
        commit(SET_ENTER_STATE, {
          key: 'isIssuer',
          value: checkIsProvider
        })
        commit(SET_ENTER_STATE, {
          key: 'isProvider',
          value: checkIsProvider
        })
      }
      const message = generateSignMessage()

      const convMessage = window.web3.utils.toHex(message)
      const msgToSign = `${SIGN_MSG} ${convMessage}`
      const toSign = window.web3.utils.toHex(msgToSign)
      const recovered = sigUtil.recoverPersonalSignature({
        data: toSign, // The value to sign
        sig: state.sign
      })
      if (recovered !== state.address.toLowerCase()) {
        return false
      }
      console.log('is', state.isProvider)
        if (!state.isProvider){
      try {
        console.log('goo')

            const passport = await Vue.http
              .get('account/my/')
              commit(SET_ENTER_STATE, {
                key: 'passport',
                value: passport.body
              })

      } catch(error){
        console.log(error)
        // Message.error({
        //   message: error.body.detail
        // })
      }
    }
      const balance = await web3.eth.getBalance(state.address)
      const ethBalance = await web3.utils.fromWei(balance, 'ether')
      commit(SET_ENTER_STATE, {
        key: 'balance',
        value: ethBalance
      })
      // await dispatch('token/initialize', {}, { root: true });
      // await dispatch('crowdsale/initialize', {}, { root: true });
      // await dispatch('isVerified');
      return true
    } catch (error) {
      console.log(error)
    }
  },
  async getBalance ({ state, commit }, { address }) {
    window.web3 = new Web3(web3.currentProvider)
    const balance = await web3.eth.getBalance(address)
    const ethBalance = await web3.utils.fromWei(balance, 'ether')
    return ethBalance
  },
  async isProvider ({ commit, state, rootState, dispatch }) {
    // window.web3 = new Web3(web3.currentProvider);
    // console.log(PASSPORT.abi, PASSPORT.address);
    const passport = await new web3.eth.Contract(
      PASSPORT.abi,
      PASSPORT.address
    )
    const isProvider = await passport.methods.isProvider(state.address).call({
      from: state.address
    })
    commit(SET_ENTER_STATE, {
      key: 'isProvider',
      value: isProvider
    })
    return isProvider
  },
  // async isProvider({ commit, rootState, dispatch }, { address }) {
  //   window.web3 = new Web3(web3.currentProvider);
  //   const passport = await new web3.eth.Contract(
  //     PASSPORT.abi,
  //     PASSPORT.address
  //   );
  //
  //   const isProvider = await passport.methods.isProvider(address).call();
  //   return isProvider;
  // },
  async rejectUser ({ commit, rootState, dispatch }, { address }) {
    commit('components/' + UPDATE_USER_STATUS, {
      key: 'userList',
      value: { address, status: 'REJECT' }
    })
    Vue.http
      .post('passport/change_status', { address, status: 'REJECT' })
      .then(response => {
        Message.success({
          message: `User ${address} was rejected`
        })
      })
      .catch(error => {
        console.log(error)
        Message.error({
          message: 'Something goes wrong'
        })
      })
  },
  async setProvider ({ commit, rootState, dispatch }, { address }) {
    window.web3 = new Web3(web3.currentProvider)
    const crowdsale = await new web3.eth.Contract(
      CROWDSALE.abi,
      CROWDSALE.address
    )

    const tx = await crowdsale.methods
      .setProvider(address)
      .send({
        from: rootState.enter.address,
        gasPrice: '10000000000'
      })
      .on('transactionHash', function (hash) {
        Message({
          message: `TX Hash: ${hash}`,
          duration: 10000,
          showClose: true
        })
        // commit('components/' + SET_COMPONENT_STATE, {
        //   key: component,
        //   value: { txHash: hash }
        // });
      })
      .on('receipt', async function (receipt) {
        commit('components/' + UPDATE_USER_PROVIDER_STATUS, {
          key: 'userList',
          value: { address, isProvider: true }
        })
        Message.success({
          message: `User ${address} was added as provider`
        })

        // await dispatch('token/getBalance', {}, { root: true });
      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        // console.log(confirmationNumber);
        // if (confirmationNumber === 5) {
        // await dispatch('token/getBalance', {}, { root: true });
        // }
      })
      .on('error', function (error) {
        Message.error({
          message: error
        })
      })
  },
  async rejectProvider ({ commit, rootState, dispatch }, { address }) {
    window.web3 = new Web3(web3.currentProvider)
    const crowdsale = await new web3.eth.Contract(
      CROWDSALE.abi,
      CROWDSALE.address
    )

    const tx = await crowdsale.methods
      .deactivateProvider(address)
      .send({
        from: rootState.enter.address,
        gasPrice: '10000000000'
      })
      .on('transactionHash', function (hash) {
        Message({
          message: `TX Hash: ${hash}`,
          duration: 10000,
          showClose: true
        })
        // commit('components/' + SET_COMPONENT_STATE, {
        //   key: component,
        //   value: { txHash: hash }
        // });
      })
      .on('receipt', async function (receipt) {
        commit('components/' + UPDATE_USER_PROVIDER_STATUS, {
          key: 'userList',
          value: { address, isProvider: false }
        })
        Message.success({
          message: `User ${address} was rejected as provider`
        })

        // await dispatch('token/getBalance', {}, { root: true });
      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        // console.log(confirmationNumber);
        // if (confirmationNumber === 5) {
        // await dispatch('token/getBalance', {}, { root: true });
        // }
      })
      .on('error', function (error) {
        Message.error({
          message: error
        })
      })
  },
  async addToWhitelist ({ commit, rootState, dispatch }, { address, zone }) {
    window.web3 = new Web3(web3.currentProvider)
    const crowdsale = await new web3.eth.Contract(
      CROWDSALE.abi,
      CROWDSALE.address
    )

    const tx = await crowdsale.methods
      .setWhitelisted(address, zone)
      .send({
        from: rootState.enter.address,
        gasPrice: '10000000000'
      })
      .on('transactionHash', function (hash) {
        Message({
          message: `TX Hash: ${hash}`,
          duration: 10000,
          showClose: true
        })
        // commit('components/' + SET_COMPONENT_STATE, {
        //   key: component,
        //   value: { txHash: hash }
        // });
      })
      .on('receipt', async function (receipt) {
        commit('components/' + UPDATE_USER_STATUS, {
          key: 'userList',
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
              message: 'Something goes wrong'
            })
          })
        // await dispatch('token/getBalance', {}, { root: true });
      })
      .on('confirmation', async function (confirmationNumber, receipt) {
        // console.log(confirmationNumber);
        // if (confirmationNumber === 5) {
        // await dispatch('token/getBalance', {}, { root: true });
        // }
      })
      .on('error', function (error) {
        Message.error({
          message: error
        })
      })
  }
}
