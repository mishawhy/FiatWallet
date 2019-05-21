const ethers = require('ethers')
const expect = require('chai').expect
const Web3 = require('web3')
const supertest = require('supertest')
const request = supertest('https://kyc-backend-example.herokuapp.com')

/**
 * ЛОГИКА АВТОИЗАЦИИ
 * 1. Иницилизация пользователя и получения токена и ключа (token, key)
 * 2. Подпись токена
 * 3. Сохранение токена и ключа в локальном хранилище или в куках
 * 4. Передача токена и ключа в загловке (Header) Authorization = токен, Key = ключ
 * 5. При повторном заходе проверяем есть ли token и key в локальном хранилище если есть то init НЕ ДЕЛАЕМ
 * 6. Если в при запросе произошла ошибка(status 403) чистим storage и пробуем еще раз init
 */

describe('kyc backend test', function () {
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/5bcf72f220eb41c78cc814db2252f507')
  )

  describe('kyc user test', function () {
    let user_wallets = []
    let user_test_quantity = 1
    let auth_token = null
    let signed_auth_token = null
    let auth_key = null

    it('create user wallets', function (done) {
      for (let i = 0; user_test_quantity > i; i++) {
        user_wallets.push(Object.assign({}, web3.eth.accounts.create()))
      }
      done()
    })

    it('init users account', function (done) {
      this.timeout(15000000)
      let promise_requests = []
      for (let index in user_wallets) {
        promise_requests[index] = new Promise((resolve, reject) => {
          request.post('/api/v0/auth/init/')
            .send({ 'address': user_wallets[index].address })
            .expect(200)
            .end((error, resp) => {
              console.log(resp.body)
              user_wallets[index].auth_token = resp.body.token
              user_wallets[index].auth_key = resp.body.key
              user_wallets[index].signed_auth_token = web3.eth.accounts.sign(
                resp.body.token, user_wallets[index].privateKey
              ).signature
              resolve()
            })
        })
      }
      Promise.all(promise_requests).then(() => {
        done()
      })
    })

    it('get status must be return None', function (done) {
      this.timeout(15000000)
      let promise_requests = []
      for (let index in user_wallets) {
        promise_requests[index] = new Promise((resolve, reject) => {
          request.get('/api/v0/passport/status/')
            .set({
              'Authorization': user_wallets[index].signed_auth_token,
              'Key': user_wallets[index].auth_key
            })
            .expect(200)
            .end((error, resp) => {
              if (resp.body.count === 0) resolve()
              else reject()
            })
        })
      }
      Promise.all(promise_requests).then(() => {
        done()
      })
    })

    it('upload users documents', function (done) {
      this.timeout(15000000)
      let promise_requests = []
      for (let index in user_wallets) {
        console.log(__dirname)
        promise_requests[index] = new Promise((resolve, reject) => {
          console.log(user_wallets[index].address)
          request.post('/api/v0/passport/users/')
            .set({
              'Authorization': user_wallets[index].signed_auth_token,
              'Key': user_wallets[index].auth_key
            })
            .field('email', Math.random().toString(36).substring(7) + '@gmail.com')
            .field('first_name', 'Nature')
            .field('last_name', 'nature')
            .field('gender', 'male')
            .field('phone', '+380999999999')
            .field('date_of_birth', '1991-03-02')
            .field('address', user_wallets[index].address)
            .attach('selfie_photo', __dirname + '/passport.jpg')
            .attach('front_photo', __dirname + '/passport.jpg')
            .expect(200)
            .end((error, resp) => {
              console.log(resp.body)
              resolve()
            })
        })
      }
      Promise.all(promise_requests).then(() => {
        done()
      })
    })

    it('get status must be return status WAIT', function (done) {
      this.timeout(15000000)
      let promise_requests = []
      for (let index in user_wallets) {
        promise_requests[index] = new Promise((resolve, reject) => {
          request.get('/api/v0/passport/status/')
            .set({
              'Authorization': user_wallets[index].signed_auth_token,
              'Key': user_wallets[index].auth_key
            })
            .expect(200)
            .end((error, resp) => {
              expect(resp.body.results[0]).to.have.property('status', 'WAIT')
              console.log(resp.body.results[0].status, resp.body.results[0].address)
              resolve()
            })
        })
      }
      Promise.all(promise_requests).then(() => {
        done()
      })
    })
  })

  describe('kyc provider test', function () {
    let provider_wallet = null
    let auth_token = null
    let signed_auth_token = null
    let address_change = [{
      'address': null,
      'status': null
    }]
    let auth_key = null
    const provider_mnemonic = 'shoe brave stool real omit spot goddess alter unfair slim scan agent'

    it('get wallet provider from mnemonic', function (done) {
      provider_wallet = ethers.Wallet.fromMnemonic(provider_mnemonic)
      expect(provider_wallet.signingKey).to.contain.keys('privateKey', 'address', 'publicKey')
      done()
    })

    it('init authorization', function (done) {
      this.timeout(15000)
      request.post('/api/v0/auth/init/')
        .send({ 'address': provider_wallet.address })
        .expect(200)
        .end((error, resp) => {
          auth_token = resp.body.token
          auth_key = resp.body.key
          done()
        })
    })

    it('sign token', function (done) {
      signed_auth_token = web3.eth.accounts.sign(auth_token, provider_wallet.privateKey).signature
      done()
    })

    it('list users from owner account', function (done) {
      this.timeout(15000)
      request.get('/api/v0/passport/users')
        .set({ 'Authorization': signed_auth_token, 'Key': auth_key })
        .expect(200)
        .end((error, resp) => {
          address_change = []
          let status = [
            'APPROVED',
            'REJECT',
            'WAIT'
          ]
          let max = 3
          let min = 0
          let x = Math.floor(Math.random() * (max - min) + min)
          address_change.push({
            'status': status[x],
            'address': resp.body.results[0].address
          })
          done()
        })
    })

    it('change user status', function (done) {
      this.timeout(15000)
      request.post('/api/v0/passport/change_status')
        .set({ 'Authorization': signed_auth_token, 'Key': auth_key })
        .send(address_change[0])
        .expect(200)
        .end((error, resp) => {
          done()
        })
    })
  })
})
