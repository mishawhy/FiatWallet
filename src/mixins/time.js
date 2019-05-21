/* ============
 * Mixins for working with time
 * ============
 *
 */

import moment from 'moment'

export default {
  filters: {
    relativeTime: function (date, sourceFormat) {
      if (!date) return ''
      if (sourceFormat) return moment(date, sourceFormat).fromNow()
      return moment(date).fromNow()
    },
    time: function (date, format, sourceFormat) {
      if (!date) return ''
      if (sourceFormat) return moment(date, sourceFormat).format(format)
      return moment(date).format(format)
    }
  }
}
