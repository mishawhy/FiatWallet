/* ============
 * Mutations for the connect module
 * ============
 *
 * The mutations that are available on the
 * connect module.
 */

import { SET_ENTER_STATE, RESET_ENTER_STATE } from '@/constant/mutations'

/* eslint-disable no-param-reassign */
export default {
  [SET_ENTER_STATE] (state, { key, value = null }) {
    state[key] = value
  },
  [RESET_ENTER_STATE] (state, payload) {}
}
