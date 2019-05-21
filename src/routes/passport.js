/* ============
 * Routes File
 * ============
 *
 * The routes and redirects for passport are defined in this file.
 */
import * as Routes from '@/constant/routes'

export default [
  {
    path: Routes.PASSPORT_EDIT_ROOT_PATH,
    component: () => import('@/interfaces/passport/Index.vue'),
    children: [{
      name: Routes.PASSPORT_GENERAL,
      path: Routes.PASSPORT_GENERAL_URL,
      component: () => import('@/modules/passport/PassportGeneral.vue')
    },
    {
      name: Routes.PASSPORT_BANK_ACCOUNT,
      path: Routes.PASSPORT_BANK_ACCOUNT_URL,
      component: () => import('@/modules/passport/PassportBankAccount.vue')
    }
    /* {
      name: Routes.PASSPORT_DELEGATE,
      path: Routes.PASSPORT_DELEGATE_URL,
      component: () => import('@/modules/passport/PassportDelegate.vue')
    },
    {
      name: Routes.PASSPORT_FEE_INFORMATION,
      path: Routes.PASSPORT_FEE_INFORMATION_URL,
      component: () => import('@/modules/passport/PassportFeeInformation.vue')
    } */]
  }
]
