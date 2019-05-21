/* ============
 * Mutations for the Business Verification module
 * ============
 *
 * The mutations that are available on this module
 */

import { SET_VERIFICATION_STATE } from '@/constant/mutations'

/* eslint-disable no-param-reassign */
export default {
  [SET_VERIFICATION_STATE] (state, { key, value = null }) {
    state[key] = value
  }
}
