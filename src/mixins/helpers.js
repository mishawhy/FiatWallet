/* ============
 * Mixins for global helper
 * ============
 *
 */
import { fromPairs, filter, toPairs } from 'ramda'

export default {
  methods: {
    omitEmpty: function (obj) {
      return fromPairs(
        filter(pair => {
          if (pair[1]) return pair
        }, toPairs(obj))
      )
    },
    guid: function () {
      function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    }
  }
}
