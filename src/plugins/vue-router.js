/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import Vue from 'vue'
import {equals, not, prop} from 'ramda'
import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'
import { ENTER } from '@/constant/routes'
import { SET_ENTER_STATE } from '@/constant/mutations'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'side-bar-menu-open',
  scrollBehavior: function (to, from, savedPosition) {
    if (from && to.name === from.name && equals(to.params, from.params)) {
      return
    }
    return savedPosition || { x: 0, y: 0 }
  },
  routes
})
const loading = (to, from, active = true) => {
  if (not(equals(prop('name', to), prop('name', from)))) {
    store.commit('enter/' + SET_ENTER_STATE, {
      key: 'loading',
      value: active
    })
  }
}
router.beforeEach(async (to, from, next) => {
  loading(to, from)

  if (to.matched.some(m => m.meta.auth)) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the enter page
     */
    const isVerified = await store.dispatch('enter/verifySign')
    if (!isVerified) {
      loading(to, from, false)
      return next({
        name: ENTER
      })
    } else {
      loading(to, from, false)
      return next()
    }
  } else {
    // if (to.name === AUTH && isVerified) {
    //   store.commit(SET_INITIAL_STATE, {
    //     key: 'loading',
    //     value: false
    //   });
    //   return next({ name: ROOT });
    // }
    loading(to, from, false)
    return next()
  }
})

Vue.router = router

export default {
  router
}
