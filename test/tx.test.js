// const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent');
const { ether } = require('openzeppelin-solidity/test/helpers/ether')
const shouldFail = require('openzeppelin-solidity/test/helpers/shouldFail')
const { ethGetBalance } = require('openzeppelin-solidity/test/helpers/web3')
const time = require('openzeppelin-solidity/test/helpers/time')
const {
  ZERO_ADDRESS
} = require('openzeppelin-solidity/test/helpers/constants')

const { BigNumber } = require('bignumber.js')

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()
const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()
const Passport = artifacts.require('Passport')
const StableUSD = artifacts.require('StableUSD')
const StableEURO = artifacts.require('StableEURO')
const FeesCharger = artifacts.require('FeesCharger')

contract('Passport', function ([
  owner,
  issuer,
  provider,
  client1,
  client2,
  feeTr,
  feeDp,
  feeWt
]) {
  before(async function () {
    const STABLE_USD = '0x9AAf9cDA1C1cFf304BB0Bb22f5c721F61dC9da52'
    const STABLE_EURO = '0x08F547429e2d2A7F1F71ce0a20502F93049CDC05'
    this.passport = await Passport.new({ from: owner })
    this.feesCharger = await FeesCharger.new({ from: owner })
    this.stableUSD = await StableUSD.at(STABLE_USD)
    this.stableEURO = await StableEURO.at(STABLE_EURO)
    console.log(this.stableUSD.address)
    console.log(this.stableEURO.address)
  })

  describe('Issue passport', function () {
    it('should issue 1000 USD to client1', async function () {
      for (var i = 0; i < 5; i++) {
        const amount = 1000 * i * 0.6
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
      for (var i = 0; i < 8; i++) {
        const amount = 1000 * i * 0.6
        const am = await web3.utils.toWei(amount.toString(), 'ether')
        await this.stableEURO.mint(client1, am, {
          from: owner
        })
      }

      // const balance = await web3.utils.fromWei(
      //   await this.stableUSD.balanceOf(client1))

      console.log(balance)
    })
    it('should list events Transfer', async function () {
      const transfers = await this.stableUSD.Transfer({ fromBlock: 0 })
      console.log(transfers)
    })
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

  // describe('Issue passport', function() {
  //   it('should issue passport to owner', async function() {
  //     const pass = await web3.utils.toHex('my passport #23472634736');
  //     const zone = 1;
  //     const tx = await this.passport.issuePass(owner, pass, zone);
  //     const getPass = await this.passport.getPass(owner);
  //     const isPassOwner = await this.passport.isPassOwner(getPass, owner);
  //     console.log(getPass, isPassOwner);
  //     isPassOwner.should.be.equal(true);
  //     const hasPass = await this.passport.hasPass(owner);
  //     hasPass.should.be.equal(true);
  //   });
  //   it('should get pass', async function() {
  //     const pass = await this.passport.getPass(owner);
  //     const dec = await web3.utils.hexToUtf8(pass);
  //     // console.log(dec);
  //   });
  //   it('should issue pass and set fee for user 1', async function() {
  //     const pass = await web3.utils.toHex('my passport #ssas34234234');
  //     const zone = 3;
  //     console.log(pass);
  //     const tx = await this.passport.issuePass(user1, pass, zone);
  //     const pass1 = await this.passport.getPass(user1);
  //     const hasPass = await this.passport.hasPass(user1);
  //     const fx = await this.feesCharger.setUsdFee(pass1, 5, 0, 10, 0, 20, 0, {
  //       from: issuer
  //     });
  //     hasPass.should.be.equal(true);
  //   });
  //   it('should issue pass and set fee for user 2', async function() {
  //     const pass = await web3.utils.toHex('my passport #ssas34234234');
  //     const zone = 3;
  //     console.log(pass);
  //     const tx = await this.passport.issuePass(user2, pass, zone);
  //     const pass1 = await this.passport.getPass(user2);
  //     const hasPass = await this.passport.hasPass(user2);
  //     const fx = await this.feesCharger.setUsdFee(pass1, 5, 0, 10, 0, 20, 0, {
  //       from: issuer
  //     });
  //     hasPass.should.be.equal(true);
  //   });
  // });
  // describe('StableUSD Transfers', function() {
  //   it('should issue USD to user1 with pass', async function() {
  //     const tx = await this.stableUSD.mint(user1, web3.utils.toWei(100000), {
  //       from: issuer
  //     });
  //     // console.log('Fee Wallet', depositFeeWalletBalance / Math.pow(10, 18));
  //   });
  //
  //   it('should show balance', async function() {
  //     const balanceUser1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(user1)
  //     );
  //     console.log('User1:', balanceUser1.toNumber());
  //     const balanceUser2 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(user2)
  //     );
  //     console.log('User2:', balanceUser2.toNumber());
  //     const feeTr1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeTr)
  //     );
  //     console.log('TransferFee:', feeTr1.toNumber());
  //
  //     const feeTrdd1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeDp)
  //     );
  //     console.log('DepositFee:', feeTrdd1.toNumber());
  //
  //     const feeTrs1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeWt)
  //     );
  //     console.log('WithdrawFee:', feeTrs1.toNumber());
  //
  //     const total = await web3.utils.fromWei(
  //       await this.stableUSD.totalSupply()
  //     );
  //     console.log('total:', total.toNumber());
  //   });
  //
  //   it('should transfer from user 1 to user 2', async function() {
  //     await this.stableUSD.transfer(user2, ether(90000), { from: user1 });
  //   });
  //
  //   // it('should issue USD to user with pass', async function() {
  //   //   const pass = await this.passport.getPass(user1);
  //   //   const depositFee = this.feesCharger.getDepositFee(pass, 1, ether(100000));
  //   //   const tx = await this.stableUSD.mint(user1, ether(100000), {
  //   //     from: issuer
  //   //   });
  //   //   const balance = await this.stableUSD.balanceOf(user1);
  //   //   const deposit = await this.stableUSD.balanceOf(feeWt);
  //   //   const total = await this.stableUSD.totalSupply();
  //   //   const totalWei = await web3.fromWei(total, 'ether');
  //   //   console.log('User balance: ', balance / Math.pow(10, 18));
  //   //   console.log('Fee balance: ', deposit / Math.pow(10, 18));
  //   //   console.log('Total supply: ', totalWei.toNumber());
  //   //   // console.log('Fee Wallet', depositFeeWalletBalance / Math.pow(10, 18));
  //   // });
  //   it('should show balance', async function() {
  //     const balanceUser1 = await web3.utils.utils.fromWei(
  //       await this.stableUSD.balanceOf(user1)
  //     );
  //     console.log('User1:', balanceUser1.toNumber());
  //     const balanceUser2 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(user2)
  //     );
  //     console.log('User2:', balanceUser2.toNumber());
  //     const feeTr1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeTr)
  //     );
  //     console.log('TransferFee:', feeTr1.toNumber());
  //
  //     const feeTrdd1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeDp)
  //     );
  //     console.log('DepositFee:', feeTrdd1.toNumber());
  //
  //     const feeTrs1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeWt)
  //     );
  //     console.log('WithdrawFee:', feeTrs1.toNumber());
  //
  //     const total = await web3.utils.fromWei(
  //       await this.stableUSD.totalSupply()
  //     );
  //     console.log('total:', total.toNumber());
  //   });
  //   it('should withdraw USD from user 2 with pass', async function() {
  //     // const pass = await this.passport.getPass(user2);
  //     // const depositFee = this.feesCharger.getWithdrawFee(
  //     //   pass,
  //     //   1,
  //     //   ether(100000)
  //     // );
  //     const tx = await this.stableUSD.burn(user2, ether(80000), {
  //       from: issuer
  //     });
  //     // console.log('Fee Wallet', depositFeeWalletBalance / Math.pow(10, 18));
  //   });
  //
  //   it('should show balance', async function() {
  //     const balanceUser1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(user1)
  //     );
  //     console.log('User1:', balanceUser1.toNumber());
  //     const balanceUser2 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(user2)
  //     );
  //     console.log('User2:', balanceUser2.toNumber());
  //     const feeTr1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeTr)
  //     );
  //     console.log('TransferFee:', feeTr1.toNumber());
  //
  //     const feeTrdd1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeDp)
  //     );
  //     console.log('DepositFee:', feeTrdd1.toNumber());
  //
  //     const feeTrs1 = await web3.utils.fromWei(
  //       await this.stableUSD.balanceOf(feeWt)
  //     );
  //     console.log('WithdrawFee:', feeTrs1.toNumber());
  //
  //     const total = await web3.utils.fromWei(
  //       await this.stableUSD.totalSupply()
  //     );
  //     console.log('total:', total.toNumber());
  //   });
  // });
})
