const expectEvent = require('openzeppelin-solidity/test/helpers/expectEvent')
const { ether } = require('openzeppelin-solidity/test/helpers/ether')
const shouldFail = require('openzeppelin-solidity/test/helpers/shouldFail')
const { ethGetBalance } = require('openzeppelin-solidity/test/helpers/web3')
const time = require('openzeppelin-solidity/test/helpers/time')
const {
  ZERO_ADDRESS
} = require('openzeppelin-solidity/test/helpers/constants')

const BigNumber = web3.BigNumber

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()
const should = require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()
const AllowanceCrowdsaleImpl = artifacts.require('MocoCrowdsale')
const SimpleToken = artifacts.require('SimpleToken')
const BTCAsset = artifacts.require('BTCAsset')

contract('AllowanceCrowdsale', function ([
  owner,
  investor,
  wallet,
  purchaser,
  tokenWallet,
  provider,
  assetWallet
]) {
  const rate = new BigNumber(10)
  const rateBtc = new BigNumber(100)
  const bonus = new BigNumber(5)
  const minAmount = new BigNumber(0.01)
  const minAmountBtc = new BigNumber(0.01)
  const cap = ether(10)
  const value = ether(0.42)
  const tokenAllowance = new BigNumber('1e22')

  before(async function () {
    this.openingTime = (await time.latest()) + time.duration.minutes(25)
    this.closingTime = this.openingTime + time.duration.weeks(120)
    this.bonusPeriod = this.closingTime - time.duration.weeks(4)
    this.unlock1 = this.closingTime + time.duration.days(182)
    this.unlock2 = this.closingTime + time.duration.days(365)
    this.token = await SimpleToken.new({ from: tokenWallet })
    // this.asset = await BTCAsset.new({ from: assetWallet });
    this.crowdsale = await AllowanceCrowdsaleImpl.new(
      this.openingTime,
      this.closingTime,
      this.unlock1,
      this.unlock2,
      this.bonusPeriod,
      bonus,
      rate,
      owner,
      this.token.address,
      tokenWallet,
      { from: owner }
    )
    // await this.crowdsale.setAsset(this.asset.address, 0, minAmountBtc, rateBtc);
    // await this.asset.delegateMint(
    //   purchaser,
    //   this.crowdsale.address,
    //   tokenAllowance,
    //   {
    //     from: assetWallet
    //   }
    // );
    await this.token.approve(this.crowdsale.address, tokenAllowance, {
      from: tokenWallet
    })
  })

  describe('accepting payments', function () {
    it('should wallet is owner', async function () {
      // await this.crowdsale.transferOwnership(wallet);
      const owner = await this.crowdsale.owner()
      owner.should.be.equal(wallet)
    })
    it('should create crowdsale with correct parameters', async function () {
      should.exist(this.crowdsale)
      should.exist(this.token);
      //
      (await this.crowdsale.openingTime()).should.be.bignumber.equal(
        this.openingTime
      );
      (await this.crowdsale.closingTime()).should.be.bignumber.equal(
        this.closingTime
      );
      (await this.crowdsale.rate()).should.be.bignumber.equal(rate);
      (await this.crowdsale.wallet()).should.be.equal(wallet)
    })

    it('should have token wallet', async function () {
      (await this.crowdsale.tokenWallet()).should.be.equal(tokenWallet)
    })
    it('should not accept payments before start', async function () {
      await shouldFail.reverting(this.crowdsale.send(ether(1)))
      await shouldFail.reverting(
        this.crowdsale.buyTokens(investor, { from: investor, value: ether(1) })
      )
    })

    // it('should be is open', async function() {
    //   await time.increaseTo(this.openingTime);
    //   const isOpen = await this.crowdsale.isOpen();
    //   isOpen.should.be.equal(true);
    // });
    it('should owner set new provider', async function () {
      await this.crowdsale.setProvider(provider, {
        from: owner
      })
      const isProvider = await this.crowdsale.isProvider(provider)
      const isProviderOwner = await this.crowdsale.isProvider(owner)
      const isProviderOther = await this.crowdsale.isProvider(investor)
      isProvider.should.be.equal(true)
      isProviderOwner.should.be.equal(true)
      isProviderOther.should.be.equal(false)
    })
    it('should provider add investor to whitelist', async function () {
      const zoneInit = 170
      await this.crowdsale.setWhitelisted(purchaser, zoneInit, {
        from: provider
      })
      const zone = await this.crowdsale.getWhitelistedZone(purchaser)
      Number(zone).should.be.equal(zoneInit)
    })
    it('should owner deactivate provider permissions and set again', async function () {
      await this.crowdsale.deactivateProvider(provider, {
        from: owner
      })
      const isProvider = await this.crowdsale.isProvider(provider)
      isProvider.should.be.equal(false)
      await this.crowdsale.setProvider(provider, {
        from: owner
      })
      const isProviderNext = await this.crowdsale.isProvider(provider)
      isProviderNext.should.be.equal(true)
    })
    it('should count bonus amount', async function () {
      const investmentAmount = ether(1)
      const totalTokens = await this.crowdsale.calculateTokens(
        investmentAmount
      )
      const expectedTokenAmount = rate.mul(investmentAmount)
      const expectedBonusAmount = expectedTokenAmount.div(bonus)
      totalTokens.should.be.bignumber.equal(
        expectedTokenAmount.add(expectedBonusAmount)
      )
    })

    it('should accept payments during the sale', async function () {
      const isWhitelisted = await this.crowdsale.isWhitelisted(purchaser)
      const investmentAmount = ether(1)
      const expectedTokenAmount = rate.mul(investmentAmount)
      const expectedBonusAmount = expectedTokenAmount.div(bonus)
      await time.increaseTo(this.openingTime)
      await this.crowdsale.buyTokens(purchaser, {
        value: investmentAmount,
        from: purchaser
      });
      (await this.token.balanceOf(purchaser)).should.be.bignumber.equal(0);
      (await this.crowdsale.balanceOf(purchaser)).should.be.bignumber.equal(
        expectedBonusAmount.add(expectedTokenAmount)
      )
    })
    it('should make withdrawTokens after locked period is closed', async function () {
      const beforeWithdraw = await this.token.balanceOf(purchaser)
      const lockedTokens = await this.crowdsale.balanceOf(purchaser)
      console.log(lockedTokens, beforeWithdraw)
      await time.increaseTo(this.unlock2 + time.duration.minutes(2))
      const isUnlocked = await this.crowdsale.lockedTwoHasEnd()
      isUnlocked.should.be.equal(true)
      await this.crowdsale.withdrawTokens(purchaser)
      const afterWithdraw = await this.token.balanceOf(purchaser)
      afterWithdraw.should.be.bignumber.equal(lockedTokens.add(beforeWithdraw))
    })

    // it('should make asset transfer to crowdsale', async function() {
    //   const investmentAmount = ether(1);
    //   const before = await this.asset.balanceOf(wallet);
    //   await this.crowdsale.buyTokensAsset(
    //     purchaser,
    //     this.asset.address,
    //     investmentAmount,
    //     {
    //       from: purchaser
    //     }
    //   );
    //   const tokenBalance = await this.token.balanceOf(purchaser);
    //   const after = await this.asset.balanceOf(wallet);
    //   console.log(tokenBalance / Math.pow(10, 18));
    // });

    // it('should accept sends', async function() {
    //   await this.crowdsale.send(value);
    // });
    //
    // it('should accept payments', async function() {
    //   await this.crowdsale.buyTokens(investor, {
    //     value: value,
    //     from: purchaser
    //   });
    // });
  })

  // describe('high-level purchase', function() {
  //   it('should log purchase', async function() {
  //     const { logs } = await this.crowdsale.sendTransaction({
  //       value: value,
  //       from: investor
  //     });
  //     expectEvent.inLogs(logs, 'TokensPurchased', {
  //       purchaser: investor,
  //       beneficiary: investor,
  //       value: value,
  //       amount: expectedTokenAmount
  //     });
  //   });

  //   it('should assign tokens to sender', async function() {
  //     await this.crowdsale.sendTransaction({ value: value, from: investor });
  //     (await this.token.balanceOf(investor)).should.be.bignumber.equal(
  //       expectedTokenAmount
  //     );
  //   });
  //
  //   it('should forward funds to wallet', async function() {
  //     const pre = await ethGetBalance(wallet);
  //     await this.crowdsale.sendTransaction({ value, from: investor });
  //     const post = await ethGetBalance(wallet);
  //     post.minus(pre).should.be.bignumber.equal(value);
  //   });
  // });
  //
  // describe('check remaining allowance', function() {
  //   it('should report correct allowace left', async function() {
  //     const remainingAllowance = tokenAllowance - expectedTokenAmount;
  //     await this.crowdsale.buyTokens(investor, {
  //       value: value,
  //       from: purchaser
  //     });
  //     (await this.crowdsale.remainingTokens()).should.be.bignumber.equal(
  //       remainingAllowance
  //     );
  //   });
  //
  //   context('when the allowance is larger than the token amount', function() {
  //     beforeEach(async function() {
  //       const amount = await this.token.balanceOf(tokenWallet);
  //       await this.token.approve(this.crowdsale.address, amount.plus(1), {
  //         from: tokenWallet
  //       });
  //     });
  //
  //     it('should report the amount instead of the allowance', async function() {
  //       (await this.crowdsale.remainingTokens()).should.be.bignumber.equal(
  //         await this.token.balanceOf(tokenWallet)
  //       );
  //     });
  //   });
  // });
  //
  // describe('when token wallet is different from token address', function() {
  //   it('creation reverts', async function() {
  //     this.token = await SimpleToken.new({ from: tokenWallet });
  //     await shouldFail.reverting(
  //       AllowanceCrowdsaleImpl.new(
  //         rate,
  //         wallet,
  //         this.token.address,
  //         ZERO_ADDRESS
  //       )
  //     );
  //   });
})
// });
