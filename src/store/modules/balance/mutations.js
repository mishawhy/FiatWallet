/* ============
 * Mutations for the connect module
 * ============
 *
 * The mutations that are available on the
 * connect module.
 */

import {
  SET_BALANCE_STATE
} from '@/constant/mutations'

/* eslint-disable no-param-reassign */
export default {
  [SET_BALANCE_STATE] (state, { key, value = null }) {
    state[key] = value
  }
}
