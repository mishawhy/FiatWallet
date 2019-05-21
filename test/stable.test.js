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
    console.log(owner)
    const balance = await web3.eth.getBalance(owner)
    console.log(balance)
    this.passport = await Passport.new({ from: owner })
    this.stableUSD = await StableUSD.new(
      this.passport.address,
      feeTr,
      feeDp,
      feeWt,
      {
        from: owner
      }
    )
    this.stableEURO = await StableEURO.new(
      this.passport.address,
      feeTr,
      feeDp,
      feeWt,
      {
        from: owner
      }
    )
    console.log(this.passport.address)
    console.log(this.stableUSD.address)
    console.log(this.stableEURO.address)
  })

  describe('Issue passport', function () {
    it('should owner issue passport to client1', async function () {
      const pass = 234234234
      const type = 1
      const tx = await this.passport.issue(client1, pass, type, {
        from: owner
      })
      // const isClient = await this.passport.isClient(client2)
      // isClient.should.be.equal(true)
    })
    it('should owner issue passport to client2', async function () {
      const pass = 2342324234
      const type = 1
      const tx = await this.passport.issue(client2, pass, type, {
        from: owner
      })
      // const isClient = await this.passport.isClient(client2)
      // isClient.should.be.equal(true)
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

    it('should set default fee', async function () {
      const fx = await this.stableUSD.setDefaultFee(5, 0, 10, 0, 20, 0, {
        from: owner
      })
      const defaultFee = await this.stableUSD.getDefaultFees()
      const depositFlex = defaultFee[2].toNumber()
      console.log(depositFlex)
    })
    it('should set passport fee', async function () {
      const pass = await this.passport.get(client1)
      const fixTransfer = 0.5
      const fixTransferAmount = await web3.utils.toWei(fixTransfer.toString(), 'ether')
      const fx = await this.stableUSD.setPassportFee(pass, 5, fixTransferAmount, 30, 0, 20, 0, {
        from: owner
      })
      const amount = 1000
      const amountUsd = await web3.utils.toWei(amount.toString(), 'ether')
      const fee = await this.stableUSD.getTransferFee(client1, amountUsd)

      const defaultFee = await this.stableUSD.getPassportFees(client1)
      // const depositFlex = defaultFee[1].toNumber()
      const balance = await web3.utils.fromWei(fee)

      console.log(balance)
    })
    it('should transfer with ref from client 1 to client2', async function () {
      const ref = await web3.utils.toHex('Invoice #2323')
      const amountToSend = 200
      const amount = await web3.utils.toWei(amountToSend.toString(), 'ether')

      const tx = await this.stableUSD.transferRef(client2, amount, ref, {
        from: client1
      })
      console.log(tx)
    })
    it('should list events Transfer', async function () {
      const transfers = await this.stableUSD.Transfer({ fromBlock: 0 })
      console.log(transfers)
    })

    it('should transfer with ref from client 1 to client2', async function () {
      const amountToSend = 200
      const amount = await web3.utils.toWei(amountToSend.toString(), 'ether')

      const tx = await this.stableUSD.withdraw(amount, {
        from: client1
      })
      console.log(tx)
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
