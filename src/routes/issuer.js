/* ============
 * Routes File
 * ============
 *
 * The routes and redirects for dashboard are defined in this file.
 */
import * as ROUTES from '@/constant/routes'

export default [
  {
    name: ROUTES.ISSUER_USERS,
    path: ROUTES.ISSUER_USERS_URL,
    component: () => import('@/interfaces/issuer/Users.vue')
  },
  {
    path: ROUTES.ISSUER_USER_DETAIL_PATH,
    component: () => import('@/modules/UserDetails/UsersDetail.vue'),
    children: [
      {
        name: ROUTES.USER_DETAIL,
        path: ROUTES.USER_DETAIL_PATH,
        component: () => import('@/modules/UserDetails/components/PassportDetail.vue')
      },
      {
        name: ROUTES.USER_TRANSACTIONS,
        path: ROUTES.USER_TRANSACTIONS_PATH,
        component: () => import('@/modules/UserDetails/components/UserTransactions.vue')
      },
      {
        name: ROUTES.USER_ISSUE_TOKENS,
        path: ROUTES.USER_ISSUE_TOKENS_PATH,
        component: () => import('@/modules/UserDetails/components/IssueTokens.vue')
      },
      {
        name: ROUTES.USER_BANK_ACCOUNTS,
        path: ROUTES.USER_BANK_ACCOUNTS_PATH,
        component: () => import('@/modules/UserDetails/components/BankAccounts.vue')
      },
      {
        name: ROUTES.USER_FEES_CHARGER,
        path: ROUTES.USER_FEES_CHARGER_PATH,
        component: () => import('@/modules/UserDetails/components/FeeCharger.vue')
      },
      {
        name: ROUTES.USER_DEPOSIT_ACCOUNT,
        path: ROUTES.USER_DEPOSIT_ACCOUNT_PATH,
        component: () => import('@/modules/UserDetails/components/SetDepositAccount.vue')
      }
    ]
  },
  {
    name: ROUTES.ISSUER_TRANSACTION,
    path: ROUTES.ISSUER_TRANSACTION_URL,
    component: () => import('@/interfaces/issuer/Transactions.vue')
  },
  {
    name: ROUTES.ISSUER_DEPOSIT,
    path: ROUTES.ISSUER_DEPOSIT_URL,
    component: () => import('@/interfaces/issuer/Deposit.vue')
  },
  {
    name: ROUTES.ISSUER_WITHDRAW,
    path: ROUTES.ISSUER_WITHDRAW_URL,
    component: () => import('@/interfaces/issuer/Withdraw.vue')
  },
  {
    path: '/*',
    redirect: {
      name: ROUTES.ISSUER_USERS
    }
  }
]
