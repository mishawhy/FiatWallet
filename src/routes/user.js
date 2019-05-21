/* ============
 * Routes File
 * ============
 *
 * The routes and redirects for dashboard are defined in this file.
 */
import * as Routes from '@/constant/routes'

export default [
  {
    name: Routes.ROOT,
    path: Routes.ROOT_URL,
    component: () => import('@/interfaces/user/Home.vue')
  },
  {
    name: Routes.VERIFICATION,
    path: Routes.VERIFICATION_URL,
    component: () => import('@/interfaces/user/Verification.vue')
  },

  {
    name: Routes.DEPOSIT,
    path: Routes.DEPOSIT_URL,
    component: () => import('@/interfaces/user/Deposit.vue')
  }
]
