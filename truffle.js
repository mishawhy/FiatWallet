require('babel-register')
var HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic =
  'shoe brave stool real omit spot goddess alter unfair slim scan agent'
/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  networks: {
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/v3/325bab81c75e41fb9dd9c277b5508688'
        )
      },
      network_id: '3',
      gas: 4712388,
      gasPrice: 10000000000
    },
    mainnet: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          'https://mainnet.infura.io/LLKlrMBYnda3xmbLx3eZ'
        )
      },
      network_id: '1',
      gas: 3000000,
      gasPrice: 10000000000
    },
    // test: {
    //   provider: function() {
    //     return new HDWalletProvider(mnemonic, 'http://127.0.0.1:7545/');
    //   },
    //   network_id: '*',
    //   gas: 2000000, // <--- Twice as much
    //   gasPrice: 10000000000
    // },
    // development: {
    //   network_id: '3',
    //   gas: 4712388,
    //   gasPrice: 10000000000,
    //   provider: function () {
    //     return new HDWalletProvider(
    //       mnemonic,
    //       'https://ropsten.infura.io/v3/325bab81c75e41fb9dd9c277b5508688'
    //     )
    //   }
    //
    // }
    development: {
      network_id: '1550067510283',
      host: '104.46.7.13',
      port: 8546
    }
    // develop: {
    //   accounts: 10,
    //   defaultEtherBalance: 200,
    //   blockTime: 3,
    //   mnemonic:
    //     'shoe brave stool real omit spot goddess alter unfair slim scan agent',
    //   network_id: 5777
    // }
  }
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
}
