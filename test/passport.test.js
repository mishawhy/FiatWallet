// const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');
const { ether } = require('openzeppelin-solidity/test/helpers/ether')
const shouldFail = require('openzeppelin-solidity/test/helpers/shouldFail')
const { ethGetBalance } = require('openzeppelin-solidity/test/helpers/web3')
const time = require('openzeppelin-solidity/test/helpers/time')
// const {
//   ZERO_ADDRESS
// } = require('openzeppelin-solidity/test/helpers/constants')

const { BigNumber } = require('bignumber.js')

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()
const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()
const Passport = artifacts.require('SkylarkPassport')
const StableUSD = artifacts.require('StableUSD')
const StableEURO = artifacts.require('StableEURO')

contract('Passport', function ([owner, provider, client1, client2]) {
  before(async function () {
    this.passport = await Passport.new({ from: owner })
    this.stableUSD = await StableUSD.new(
      this.passport.address,
      owner,
      owner,
      owner,
      {
        from: owner
      }
    )
    this.stableEURO = await StableEURO.new(
      this.passport.address,
      owner,
      owner,
      owner,
      {
        from: owner
      }
    )
    console.log(this.passport.address)
    console.log(this.stableUSD.address)
    console.log(this.stableEURO.address)
  })

  describe('Issue passport', function () {
    it('should issue passport', async function () {
      const pass = 234234234
      const type = 3
      const tx = await this.passport.issue(client1, pass, type, {
        from: owner
      })
    })
    it('should grant provider', async function () {
      const tx = await this.passport.grantProvider(provider, {
        from: owner
      })
    })
    it('should issue passport from provider', async function () {
      const pass = 3343434
      const type = 3
      const tx = await this.passport.issue(client2, pass, type, {
        from: provider
      })
    })
    it('should check if account has active passport', async function () {
      const isActive = await this.passport.hasActive(client2)
      console.log(isActive)
    })

    it('should issue 1000 USD to client1', async function () {
      for (var i = 0; i < 10; i++) {
        const amount = 1000 * i
        const am = await web3.utils.toWei(amount.toString(), 'ether')

        await this.stableUSD.mint(client1, am, {
          from: owner
        })
      }
      const balance = await web3.utils.fromWei(
        await this.stableUSD.balanceOf(client1))

      console.log(balance)
    })
    it('should issue 1000 EURO to client1', async function () {
      for (var i = 0; i < 10; i++) {
        const amount = 1000 * i
        const am = await web3.utils.toWei(amount.toString(), 'ether')
        await this.stableEURO.mint(client1, am, {
          from: owner
        })
      }

      // const balance = await web3.utils.fromWei(
      //   await this.stableUSD.balanceOf(client1))

      // console.log(balance)
    })

    // it('should owner issue own passport', async function() {
    //   const pass = await web3.utils.toHex('Google Corporation');
    //   const type = 3;
    //   const tx = await this.passport.issuePass(owner, pass, type, {
    //     from: owner
    //   });
    //   const getPass = await this.passport.getPass(owner);
    //   console.log(getPass);
    //   const isPassOwner = await this.passport.isPassOwner(getPass, owner);
    //   // console.log(tx.receipt.logs[0].args, tx.receipt.logs[0].id);
    //   isPassOwner.should.be.equal(true);
    //   const hasPass = await this.passport.hasActivePass(owner);
    //   hasPass.should.be.equal(true);
    // });
    // it('should get pass', async function() {
    //   const pass = await this.passport.getPass(owner);
    //   const dec = await web3.utils.hexToUtf8(pass);
    //   // console.log(dec);
    // });
    // it('should owner issue passport to provider', async function() {
    //   const pass = await web3.utils.toHex('Provider');
    //   const type = 3;
    //   const tx = await this.passport.issuePass(provider, pass, type, {
    //     from: owner
    //   });
    //   const hasPass = await this.passport.hasActivePass(provider);
    //   hasPass.should.be.equal(true);
    // });
    // it('should owner grant passport as provider', async function() {
    //   const tx = await this.passport.grantProvider(provider, {
    //     from: owner
    //   });
    //   const isProvider = await this.passport.isProvider(provider);
    //   isProvider.should.be.equal(true);
    // });
    // it('should owner issue passport to issuer', async function() {
    //   const pass = await web3.utils.toHex('Issuer');
    //   const type = 3;
    //   const tx = await this.passport.issuePass(issuer, pass, type, {
    //     from: owner
    //   });
    //   const hasPass = await this.passport.hasActivePass(issuer);
    //   hasPass.should.be.equal(true);
    // });
    //
    // it('should owner grant passport as issuer', async function() {
    //   const tx = await this.passport.grantProvider(issuer, {
    //     from: owner
    //   });
    //   const isIssuer = await this.passport.isProvider(issuer);
    //   isIssuer.should.be.equal(true);
    // });
    //
    // it('should provider issue passport to client1', async function() {
    //   const pass = await web3.utils.toHex('Client1');
    //   const type = 1;
    //   const tx = await this.passport.issuePass(client1, pass, type, {
    //     from: provider
    //   });
    //   const isClient = await this.passport.isClient(client1);
    //   isClient.should.be.equal(true);
    // });
    // it('should issue pass and set fee for user 1', async function() {
    //   const pass = await web3.utils.toHex('my passport #ssas34234234');
    //   const zone = 3;
    //   console.log(pass);
    //   const tx = await this.passport.issuePass(user1, pass, zone);
    //   const pass1 = await this.passport.getPass(user1);
    //   const hasPass = await this.passport.hasPass(user1);
    //   const fx = await this.feesCharger.setUsdFee(pass1, 5, 0, 10, 0, 20, 0, {
    //     from: issuer
    //   });
    //   hasPass.should.be.equal(true);
    // });
    // it('should issue pass and set fee for user 2', async function() {
    //   const pass = await web3.utils.toHex('my passport #ssas34234234');
    //   const zone = 3;
    //   console.log(pass);
    //   const tx = await this.passport.issuePass(user2, pass, zone);
    //   const pass1 = await this.passport.getPass(user2);
    //   const hasPass = await this.passport.hasPass(user2);
    //   const fx = await this.feesCharger.setUsdFee(pass1, 5, 0, 10, 0, 20, 0, {
    //     from: issuer
    //   });
    //   hasPass.should.be.equal(true);
    // });
  })
})
