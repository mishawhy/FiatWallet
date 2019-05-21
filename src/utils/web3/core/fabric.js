import Web3 from 'web3'
import tokenAbi from '@/../build/contracts/StableUSD.json'
import passportAbi from '@/../build/contracts/SkylarkPassport.json'
/**
 *
 */
class Web3Fabric {
    // static __EURO = null;
    // static __USD = null;
    static __contracts = {
      'USD': null,
      'EURO': null,
      'PASSPORT': null
    };
    static __fees = {
      'USD': null,
      'EURO': null
    };

    static async get_fees (currency, address) {
      if (Web3Fabric.__fees[currency] === null) {
        const instance = Web3Fabric.get_contract_instance(currency)
        const fees = await instance.methods.getFees(address).call()
        Web3Fabric.__fees[currency] = {
          'transfer': {
            flex: fees[0],
            fix: fees[1]
          },
          'deposit': {
            flex: fees[2],
            fix: fees[3]
          },
          'withdraw': {
            flex: fees[4],
            fix: fees[5]
          }
        }
      }
      return Web3Fabric.__fees[currency]
    }
    static async get_fees_pass (currency, address) {
      const instance = Web3Fabric.get_contract_instance(currency)
      const fees = await instance.methods.getPassportFees(address).call()
      const feesPass = {
        'transfer': {
          flex: fees[0],
          fix: fees[1]
        },
        'deposit': {
          flex: fees[2],
          fix: fees[3]
        },
        'withdraw': {
          flex: fees[4],
          fix: fees[5]
        }
      }

      return feesPass
    }

    static get_passport_instance () {
      if (Web3Fabric.__contracts['PASSPORT'] === null) {
        window.web3 = new Web3(window.web3.currentProvider)
        Web3Fabric.__contracts['PASSPORT'] = new window.web3.eth.Contract(
          passportAbi.abi,
          process.env['VUE_APP_PASSPORT']
        )
      }
      return Web3Fabric.__contracts['PASSPORT']
    }

    static get_contract_instance (currency) {
      if (Web3Fabric.__contracts[currency] === null) {
        window.web3 = new Web3(window.web3.currentProvider)
        Web3Fabric.__contracts[currency] = new window.web3.eth.Contract(
          tokenAbi.abi,
          process.env['VUE_APP_STABLE_' + currency]
        )
      }
      return Web3Fabric.__contracts[currency]
    }
}

export default Web3Fabric
