import tokenAbi from '@/../build/contracts/StableUSD.json'
import passportInterface from '@/../build/contracts/SkylarkPassport.json'
import Web3 from 'web3'

export const PASSPORT = {
  abi: passportInterface.abi,
  address: process.env.VUE_APP_PASSPORT
}

export const SIGN_MSG = process.env.VUE_APP_SIGN

export const GAS_EST = {
  buyTokens: 500000
}

export const NETWORKS = {
  main: 'Mainnet',
  ropsten: 'Ropsten',
  rinkeby: 'Rinkeby test network',
  kovan: 'Kovan test network',
  truffle: 'Truffle Develop Network'
}
export const main_contract_address = '0x0000000000000000000000000000000000000000'

export const APPROVED_NETWORK_ID = process.env.VUE_APP_NETWORK
export const ETHERSCAN = {
  ropsten: 'https://ropsten.etherscan.io/tx/',
  main: 'https://etherscan.io/tx/'
}
