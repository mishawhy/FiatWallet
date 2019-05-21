/* ============
 * Mutations for the connect module
 * ============
 *
 * The mutations that are available on the
 * connect module.
 */

import {
  SET_TRANSACTIONS_STATE,
  SET_PROCESS_STATE,
  RESET_PROCESS_STATE
} from '@/constant/mutations'

/* eslint-disable no-param-reassign */
export default {
  [SET_TRANSACTIONS_STATE] (state, { key, value = null }) {
    state[key] = value
  },
  [SET_PROCESS_STATE] (state, { key, value = null }) {
    state['process'][key] = value
  },
  [RESET_PROCESS_STATE] (state, key) {
    state['process'][key] = null
  }
}
