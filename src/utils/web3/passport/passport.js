import Web3Utils from '../core/fabric'

class Passport {
  static get_user () {
    const instance = Web3Utils.get_passport_instance()
    /**
         * TODO: Ибашить
         */
  }
  static async issuePass ({ from, to, pass, type }) {
    const instance = Web3Utils.get_passport_instance()
    return await instance.methods.issue(to, pass, type).send({ from })
  }
  static async isProvider ({ account }) {
    const instance = Web3Utils.get_passport_instance()
    return await instance.methods.isProvider(account).call()
  }
}
export default Passport
