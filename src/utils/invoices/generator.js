import moment from 'moment'
import { Message } from 'element-ui'
import deposit from './templates/deposit'
import withdraw from './templates/withdraw'
import u2u from './templates/u2u'

class InvoiceGenerator {
  // skylark_name = '???? Название?';
  // skylark_address = '???? Какой аддрес?';

  constructor (params, { amount, currency, type }) {
    this.values = {
      amount, currency, type
    }
    this.params = this.__prepare_params(params, this.values)
  }

  static __generate_invoice_no (params) {
    const address = params.address.split('x')
    const date = moment()
    return date.format('DDMM') +
            '-' + Math.floor(Math.random() * 90 + 10) + '-' +
            address[1].substring(0, 4) +
            address[1].substring(address[1].length - 4)
  }

  __get_bank (params) {
    const bank_key = this.values.type === 'deposit' ? 'deposit_bank_list' : 'bank_list'
    console.info('BANK', bank_key, params)
    let depositBank = null
    for (let bank of params[bank_key]) {
      if (bank.currency === this.values.currency && bank.active) {
        depositBank = bank
        break
      }
    }
    console.info('BANK 11', bank_key, params, depositBank)

    if (depositBank === null) {
      Message.error('Not available bank account for this operation')
    } else {
      return {
        ...depositBank
        // bank_iban: depositBank.iban,
      }
    }
  }

  __get_name_and_address (params) {
    if (params.passport_corp.length > 0) {
      return {
        beneficiary_name: params.passport_corp[0].legal_entry_name,
        current_address: params.passport_corp[0].legal_entry_organizations_form
      }
    } else {
      return {
        beneficiary_name: params.first_name + ' ' + params.last_name,
        current_address: params.current_address
      }
    }
  }

  __prepare_params (params, values) {
    let result = {}

    if (values.type === 'receipt') {
      // console.log('RESULT', params, values)
      result = {
        ...this.__get_name_and_address(params),
        ref: params.reference,
        address: params.address,
        invoice_number: InvoiceGenerator.__generate_invoice_no(params),
        current_date: moment().format('DD-MM-YYYY'),
        amount: this.values.amount,
        currency: this.values.currency
      }
    } else {
      const bank = this.__get_bank(params)
      result = {
        ...bank,
        ...this.__get_name_and_address(params),
        address: params.address,
        invoice_number: InvoiceGenerator.__generate_invoice_no(params),
        current_date: moment().format('DD-MM-YYYY'),
        deposit_amount: this.values.amount,
        currency: this.values.currency
      }
    }

    console.log('RESULT', result, values)

    if (values.type === 'deposit') deposit(result)
    else if (values.type === 'withdraw') withdraw(result)
    else if (values.type === 'receipt') u2u(result)
  }
}

export default InvoiceGenerator
