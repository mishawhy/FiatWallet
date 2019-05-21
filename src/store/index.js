/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// Modules
import enter from './modules/enter'
import verification from './modules/verification'
import transactions from './modules/transactions'
import balance from './modules/balance'
import users from './modules/users'
import passport from './modules/passport'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    enter,
    verification,
    transactions,
    balance,
    users,
    passport
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : []
})
