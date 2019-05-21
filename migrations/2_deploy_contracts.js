const Passport = artifacts.require('SkylarkPassport')
const StableUSD = artifacts.require('StableUSD')
const StableEURO = artifacts.require('StableEURO')
const moment = require('moment')
const BigNumber = web3.BigNumber
// const time = require('openzeppelin-solidity/test/helpers/time');

module.exports = async function (deployer, network, accounts) {
  // deployer.deploy(Passport).then(function (instance) {
  //   console.log(instance.address)
  // })
  // deployer.deploy(FeesCharger).then(function(instance) {
  //   console.log(instance.address);
  // });
  const pass = '0x72658721B3A2992b1FF1c6F49b32e358137827Be'
  const fee = '0x7663e56BFB0b77f5783e4d9BFB4A16c256270D12'
  const usd = '0x6af85c36cD3845237E537e9D336a80d420DCA9fb'
  const euro = '0x592E4092F06f53d3b93C77a31f0351F0704D0951'
  // deployer.deploy(StableEURO, pass, fee, fee, fee).then(function (instance) {
  //   console.log(instance.address)
  // })
  // deployer.deploy(StableUSD, pass, fee, fee, fee).then(function (instance) {
  //   console.log(instance.address)
  // })
}
