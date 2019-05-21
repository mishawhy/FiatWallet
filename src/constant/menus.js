import * as ROUTES from './routes'

export const MOBILE_MENU = [
  {
    name: ROUTES.ROOT,
    to: ROUTES.ROOT_URL,
    title: 'Home',
    icon: '<i class="fa fa-home" aria-hidden="true"></i>'
  },
  // {
  //   name: ROUTES.SEND,
  //   to: ROUTES.SEND_URL,
  //   title: 'Send tokens',
  //   icon: '<i class="fas fa-exchange-alt" aria-hidden="true"></i>'
  // },
  {
    name: ROUTES.VERIFICATION,
    to: ROUTES.VERIFICATION_URL,
    title: 'Verification',
    icon: '<i class="far fa-address-card"></i>'
  }
  // {
  //   name: ROUTES.BUSINESS_VERIFICATION,
  //   to: ROUTES.BUSINESS_VERIFICATION_URL,
  //   title: 'Business verification',
  //   icon: '<i class="far fa-address-card"></i>'
  //   // onlyNonVerified: true
  // }
]
export const ISSUER_MENU = [
  // {
  //   name: ROUTES.ANALYTICS,
  //   to: ROUTES.ANALYTICS_URL,
  //   title: 'Analytics',
  //   icon: '<i class="fas fa-chart-line"></i>'
  // },

  {
    name: ROUTES.ISSUER_TRANSACTION,
    to: ROUTES.ISSUER_TRANSACTION_URL,
    title: 'Transactions',
    icon: 'fas fa-exchange-alt'
  },
  {
    name: ROUTES.ISSUER_DEPOSIT,
    to: ROUTES.ISSUER_DEPOSIT_URL,
    title: 'Deposits',
    icon: 'fas fa-arrow-up'
  },
  {
    name: ROUTES.ISSUER_WITHDRAW,
    to: ROUTES.ISSUER_WITHDRAW_URL,
    title: 'Withdraws',
    icon: 'fas fa-arrow-down'
  },
  {
    name: ROUTES.ISSUER_USERS,
    to: ROUTES.ISSUER_USERS_URL,
    title: 'Passports',
    icon: 'fa fa-users'
  },
  {
    name: ROUTES.PASSPORT_GENERAL,
    to: ROUTES.PASSPORT_GENERAL_URL,
    title: 'Settings',
    icon: 'fas fa-cog'
  }
  // {
  //   name: ROUTES.SEND_ISSUER,
  //   to: ROUTES.SEND_ISSUER_URL,
  //   title: 'Send tokens',
  //   icon: '<i class="fas fa-exchange-alt" aria-hidden="true"></i>'
  // }
]
export const MENU = [
  {
    name: ROUTES.ROOT,
    to: ROUTES.ROOT_URL,
    title: 'Transactions',
    icon: 'fas fa-exchange-alt'
  },
  {
    name: ROUTES.DEPOSIT,
    to: ROUTES.DEPOSIT_URL,
    title: 'Deposit / Withdraw',
    icon: 'fas fa-arrow-up'
  },
  {
    name: ROUTES.VERIFICATION,
    to: ROUTES.VERIFICATION_URL,
    title: 'Verification',
    icon: 'far fa-address-card'
    // onlyNonVerified: true
  },
  {
    name: ROUTES.PASSPORT_GENERAL,
    to: ROUTES.PASSPORT_GENERAL_URL,
    title: 'Settings',
    icon: 'fas fa-cog'
  }
]
