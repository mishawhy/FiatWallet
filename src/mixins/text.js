/* ============
 * Mixins for working with text
 * ============
 *
 */
import { is } from 'ramda'

const isFloat = n => {
  return Number(n) === n && n % 1 !== 0
}

export default {
  filters: {
    shortAddress: function (address) {
      if (!address) return ''
      return (
        address.slice(0, 4) +
        '...' +
        address.slice(address.length - 4, address.length)
      )
    },
    shortText: function (text, start, end) {
      if (text !== null) {
        if (start + end >= text.length) return text
        return (
          text.slice(0, start) +
          '...' +
          text.slice(text.length - end, text.length)
        )
      }
    },
    shortEmail: function (email) {
      let re = /^([a-zA-Z0-9]{1,2})(.+?)@/
      return email.replace(re, '$1...@')
    },
    slice: function (text, length) {
      if (!is(String, text)) return
      if (text.length >= length) {
        return text.slice(0, length) + '...'
      }
      return text
    },
    money: function (price, fixed = 2) {
      if (price) {
        let val
        if (isFloat(price)) {
          val = parseFloat(price).toFixed(fixed)
        } else {
          val = parseFloat(price).toFixed(fixed)
        }

        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }
      return '0'
    },
    fiatMoney: function (price, fixed = 2) {
      if (price) {
        let val
        if (isFloat(price)) {
          val = parseFloat(price).toFixed(fixed)
        } else {
          val = parseInt(price)
        }
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }
      return '0'
    },
    crypto: function (amount) {
      return amount / Math.pow(10, 18)
    },
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
