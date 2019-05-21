import Web3Utils from '../core/fabric'

export default class Movements {
  static async send ({ from, to, reference, amount, currency }) {
    const instance = Web3Utils.get_contract_instance(currency)
    const transfer = await window.web3.utils.toWei(amount.toString(), 'ether')
    const hexReference = await window.web3.utils.toHex(reference)
    return await instance.methods.transferRef(to, transfer, hexReference).send({ from })
  }

  static async withdraw ({ from, amount, currency }) {
    const instance = Web3Utils.get_contract_instance(currency)
    const transfer = await window.web3.utils.toWei(amount.toString(), 'ether')
    return await instance.methods.withdraw(transfer).send({ from })
  }
  static async issue ({ from, to, amount, currency }) {
    const instance = Web3Utils.get_contract_instance(currency)
    const transfer = await window.web3.utils.toWei(amount.toString(), 'ether')
    return await instance.methods.mint(to, transfer).send({ from })
  }
  static async burn ({ from, to, amount, currency }) {
    const instance = Web3Utils.get_contract_instance(currency)
    const transfer = await window.web3.utils.toWei(amount.toString(), 'ether')
    return await instance.methods.burn(to, transfer).send({ from })
  }

  static async get_fee ({ currency, amount, type, address }) {
    const fees = await Web3Utils.get_fees(currency, address)
    console.log('FEES', fees)
    const flex = Number(fees[type].flex) / 10
    const fix = window.web3.utils.fromWei(fees[type].fix)
    console.info('%', (amount * flex) / 100 + Number(fix))
    return (amount * flex) / 100 + Number(fix)
  }
  static async get_fee_by_address ({ currency, address }) {
    const fees = await Web3Utils.get_fees(currency, address)
    let feesConvert = { transfer: {}, deposit: {}, withdraw: {} }
    const types = ['transfer', 'deposit', 'withdraw']
    types.forEach((item) => {
      feesConvert[item].flex = Number(fees[item].flex) / 10
      feesConvert[item].fix = Number(window.web3.utils.fromWei(fees[item].fix))
    })
    return feesConvert
  }

  static async set_fee_to_address ({ currency, fees, pass, from }) {
    const instance = Web3Utils.get_contract_instance(currency)
    console.log({ currency, fees, pass, from })
    let feesConvert = { transfer: {}, deposit: {}, withdraw: {} }
    const types = ['transfer', 'deposit', 'withdraw']
    types.forEach((item) => {
      feesConvert[item].flex = String(fees[item].flex * 10)
      feesConvert[item].fix = window.web3.utils.toWei(String(fees[item].fix), 'ether')
    })
    console.log(feesConvert)
    // const args = []
    // console.log(...args)
    return await instance.methods.setPassportFee(pass, feesConvert['transfer'].flex, feesConvert['transfer'].fix, feesConvert['deposit'].flex, feesConvert['deposit'].fix, feesConvert['withdraw'].flex, feesConvert['withdraw'].fix).send({ from })

    // return await instance.methods.set(to, transfer).send({ from })

    // console.log(feesConvert)
    // return feesConvert
  }
}
