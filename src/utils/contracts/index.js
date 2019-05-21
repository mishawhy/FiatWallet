import tokenAbi from '@/../build/contracts/StableUSD.json'
import Web3 from 'web3'

function stableUsdInstance () {
  // try {
  // console.info(tokenAbi.abi, process.env.VUE_APP_STABLE_USD)

  window.web3 = new Web3(web3.currentProvider)

  return new web3.eth.Contract(
    tokenAbi.abi,
    process.env.VUE_APP_STABLE_USD
  )
  // } catch (e) {
  //   console.log(e)
  // }
}

function stableEuroInstance () {
  // try {
  // console.info(tokenAbi.abi, process.env.VUE_APP_STABLE_USD)

  window.web3 = new Web3(web3.currentProvider)

  return new web3.eth.Contract(
    tokenAbi.abi,
    process.env.VUE_APP_STABLE_EURO
  )
  // } catch (e) {
  //   console.log(e)
  // }
}

export {
  stableUsdInstance,
  stableEuroInstance
}
