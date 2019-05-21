import { NETWORKS, APPROVED_NETWORK_ID } from './ethereum'
export const NOTIFY = {
  changeNetwork: {
    status: 'process',
    title: `Please change Metamask to ${NETWORKS[APPROVED_NETWORK_ID]}`,
    msg: {
      // att: `Be aware that you send
      //  BTC to correct address with correct fees amount to quickest execution`,
      body: ` Thank you for waiting, we will do our best to make it process more quickest as
        possible. We will notify you when verification be done using your email address.`
    }
  },
  noNetwork: {
    status: 'failed',
    title: `No metamask or Trust Identify`,
    msg: {
      att: `Be aware that you send
       BTC to correct address with correct fees amount to quickest execution`,
      body: ` Thank you for waiting, we will do our best to make it process more quickest as
        possible. We will notify you when verification be done using your email address.`
    }
  }
}
export const NOTIFICATION = {
  verify: {
    style: 'process',
    text: 'Please verify your account',
    route: 'VERIFICATION'
  },
  deposit: {
    style: 'active',
    text: 'Make a deposit to your wallet',
    route: 'DEPOSIT'
  },
  buyTokens: {
    style: 'active',
    text: 'Buy tokens right now',
    route: 'ROOT'
  }
}
