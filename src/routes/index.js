/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

// CLIENT Routes
import user from './user'

// ISSUER Routes
import issuer from './issuer'
import passport from './passport'

import * as ROUTE from '@/constant/routes'

import store from '@/store'

export default [
  {
    path: '/',
    component: () => import('@/interfaces/Index.vue'),
    meta: {
      auth: true
    },
    beforeEnter: async (to, from, next) => {
      const isIssuer = store.state.enter.isIssuer
      // if (isIssuer) {
      //   return next({
      //     name: ROUTE.ISSUER_TRANSACTIONS
      //   })
      // }
      return next()
    },
    children: [...user]
  },
  {
    path: ROUTE.PASSPORT_EDIT_PATH,
    component: () => import('@/interfaces/Index.vue'),
    meta: {
      auth: true
    },
    children: [...passport]
  },
  {
    name: ROUTE.ISSUER,
    path: ROUTE.ISSUER_URL,
    component: () => import('@/interfaces/Index.vue'),
    meta: {
      auth: true,
      issuer: true
    },
    beforeEnter: async (to, from, next) => {
      const isIssuer = store.state.enter.isIssuer
      if (!isIssuer) {
        return next({
          name: ROUTE.ROOT
        })
      }
      return next()
    },
    children: [...issuer]
  },
  {
    name: ROUTE.ENTER,
    path: ROUTE.ENTER_URL,
    component: () => import('@/interfaces/enter/Index.vue')
  },
  {
    path: '/*',
    redirect: '/'
  }
]
