/* ============
 * Mutations for the passport module
 * ============
 *
 * The mutations that are available on the
 * passport module.
 */

import {
  SET_PASSPORT_STATE
} from '@/constant/mutations'

/* eslint-disable no-param-reassign */
export default {
  [SET_PASSPORT_STATE] (state, { key, value = null }) {
    state[key] = value
  }
}
