/* ============
 * Mutations for the users module
 * ============
 *
 * The mutations that are available on the
 * users module.
 */
import {
  SET_USERS_STATE,
  UPDATE_USER_STATUS
} from '@/constant/mutations'

/* eslint-disable no-param-reassign */
export default {
  [SET_USERS_STATE] (state, { key, value = null }) {
    state[key] = value
  },
  [UPDATE_USER_STATUS] (state, { key, value }) {
    const { address, status } = value
    let item = state[key].body.results.find(p => {
      return p.address === address
    })
    item.status = status
  }
}
