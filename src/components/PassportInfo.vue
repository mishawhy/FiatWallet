<template>
    <div>
        <div class="el-dropdown-link" v-if="!userData.name && !passport" v-clipboard:copy="$R.prop('address', userData) || ''"
             v-clipboard:success="copySuccess">
            <div ref="headerlogo" class="logo"></div>
            <div class="user-name bold">
                <span>{{$R.propOr('', 'address', userData) | shortAddress }}</span>
            </div>
        </div>
        <el-popover
                placement="right"
                width="440"
                @after-enter="showInfo(userData.address)"
                trigger="click">
            <el-tabs v-loading="loading" value="balances" @tab-click="showLastTransactions">
                <el-tab-pane label="Balances" name="balances">
                    <div class="minBalance">
                        <div class="balance-list">
                            <div class="accounts">
                                <div class="account">
                                    <div class="account-header">
                                        <div class="account-header-title">
                                            Ethereum
                                        </div>
                                        <div class="account-header-icon"><i class="fab fa-ethereum"></i></div>
                                    </div>
                                    <div class="balance-value">
                                        <span class="value">{{ ethBalance | money }}</span>
                                        <span class="currency uppercase">ETH</span>
                                    </div>
                                </div>
                                <div class="account">
                                    <div class="account-header">
                                        <div class="account-header-title">
                                            {{ tokenSymbol }} tokens
                                        </div>
                                        <div class="account-header-icon"><i class="fas fa-database"></i></div>
                                    </div>
                                    <div class="balance-value">
                                        <span class="value">{{ tokenBalance | money }}</span>
                                        <span class="currency uppercase">{{ tokenSymbol }}</span>
                                    </div>
                                </div>
                                <div class="account">
                                    <div class="account-header">
                                        <div class="account-header-title">
                                            {{ tokenSymbol }} locked
                                        </div>
                                        <div class="account-header-icon"><i class="fas fa-lock"></i></div>
                                    </div>
                                    <div class="balance-value">
                                        <span class="value">{{ tokenLockedBalance | money }}</span>
                                        <span class="currency uppercase">{{ tokenSymbol }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Passport"  name="passport">
                    <div v-if="passportData">
                        <el-row :gutter="15" class="passport-data">
                            <el-col :xs="24" :sm="12">
                                <label>Full name</label>
                                <h4>{{ passportData.first_name + ' ' + passportData.last_name }}</h4>
                            </el-col>
                            <el-col :xs="24"  :sm="12">
                                <label>Date of registration: </label>
                                <h4>{{ getDate(passportData.created) }}</h4>
                            </el-col>

                            <el-col :xs="24" :sm="12">
                                <label>Status</label>
                                <el-tag type="success" v-if="passportData.status === 'APPROVED'"> {{ passportData.status  }}
                                </el-tag>
                                <el-tag v-if="passportData.status === 'WAIT'"> {{ passportData.status  }}</el-tag>
                                <el-tag type="danger" v-if="passportData.status === 'REJECT'"> {{ passportData.status  }}</el-tag>

                            </el-col>
                            <el-col :xs="24" :sm="12">
                                <label>Gender</label>

                                <el-tag type="info" style="text-transform: uppercase"> {{ passportData.gender  }}
                                </el-tag>

                            </el-col>
                            <el-col :xs="24"  :sm="12">
                                <label>Country</label>
                                <h4>{{ getCountry(passportData.nationality) }}</h4>
                            </el-col>
                            <el-col :xs="24"  :sm="12">
                                <label>Date of Birth</label>
                                <h4>{{ passportData.date_of_birth }}</h4>
                            </el-col>
                            <el-col :xs="24" :sm="12">
                                <label>Email</label>
                                <el-button plain icon="el-icon-message" v-clipboard:copy="passportData.email || ''"
                                           v-clipboard:success="copySuccess">{{ passportData.email }}
                                </el-button>
                            </el-col>
                            <el-col :xs="24" :sm="12">
                                <label>Phone</label>
                                <el-button plain icon="el-icon-phone" v-clipboard:copy="passportData.phone || ''"
                                           v-clipboard:success="copySuccess">{{ passportData.phone }}
                                </el-button>
                            </el-col>
                            <el-col :xs="24">
                                <label>ethereum Address</label>
                                <el-button plain class="eth-address-btn" icon="fab fa-ethereum" v-clipboard:copy="passportData.email || ''"
                                           v-clipboard:success="copySuccess"> {{ passportData.address }}
                                </el-button>
                            </el-col>
                            <el-col :xs="24"  v-if="isOwner">
                                <label>grant provider status</label>
                                <el-button plain class="eth-address-btn" v-if="!userData.isProvider && !isProvider" icon="el-icon-star-on" @click="grantProvider(userData.address)" :loading="grantLoader"> Grant user as provider
                                </el-button>
                                <el-button plain   type="danger" class="eth-address-btn" v-if="userData.isProvider || isProvider" icon="el-icon-remove-outline" @click="rejectProvider(userData.address)" :loading="grantLoader"> Reject user as provider
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="TransfersParser" name="transactions">
                    <div v-if="lastTransactions.length == 0">No transactions</div>
                    <div class="transactions-list" v-if="lastTransactions.length > 0">
                        <div v-for="transaction in lastTransactions" :key="transaction.id" class="transaction-row">
                            <div class="transactions-list-row" style="display: flex;">
                                <div>
                                    <div class="row-title">Receive</div>
                                    <div class="row-value bold"><span>{{ transaction.returnValues.amount | crypto }}</span>
                                        &nbsp;<span class="uppercase">{{ tokenSymbol }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="transactions-list-row" style="display: flex;">
                                <div>
                                    <div class="row-title">Send</div>
                                    <div class="row-value bold"><span>{{ transaction.returnValues.value | crypto }}</span>
                                        &nbsp;<span class="uppercase">ETH</span>
                                    </div>
                                </div>
                            </div>
                            <div class="transactions-list-row">
                                <div class="row-value">{{ transaction.dateTx * 1000 | time('DD MMMM YYYY hh:mm')  }}</div>
                                <a :href="getEtherscanTx(transaction.transactionHash)" target="_blank" class="row-value tx-hash">{{ transaction.transactionHash | slice(20)}}<i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <div class="el-dropdown-link investor" slot="reference"  v-if="userData.name || passport" >
                <div ref="headerlogo" class="logo"></div>
                <div class="user-name bold" v-if="userData.name">
                    <span>{{ userData.name }}</span>
                    <div class="uppercase address" v-if="!passport" v-clipboard:copy="$R.prop('address', userData) || ''"
                         v-clipboard:success="copySuccess">{{$R.propOr('', 'address', userData) | shortAddress }}</div>
                </div>
                <div class="user-name bold" v-if="passport"><span>{{ userData.address | shortAddress }}</span>
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { find, propEq } from 'ramda'
import TextMixin from '@/mixins/text'
import TimeMixin from '@/mixins/time'
import { generateBlockies } from '@/utils/blockies'
import { ETHERSCAN } from '@/constant/ethereum'
import moment from 'moment'

export default {
  name: 'User',
  props: {
    userData: {
      type: Object,
      required: true
    },

    passportData: {
      type: Object
    },
    passport: {
      type: Boolean
    }
  },
  data: function () {
    return {
      countryList: require('@/constant/country-list.json'),
      loading: true,
      lastTransactions: [],
      ethBalance: 0,
      tokenLockedBalance: 0,
      tokenBalance: 0,
      tokenSymbol: 'USD',
      isProvider: false,
      grantLoader: false
    }
  },
  watch: {
    userData: function () {
      const icon = generateBlockies(this.userData.address, {
        active: this.userData.isVerified
      })
      this.$refs.headerlogo.appendChild(icon)
    }
  },
  mounted () {
    const icon = generateBlockies(this.userData.address, {
      active: this.userData.isVerified
    })

    this.$refs.headerlogo.appendChild(icon)
  },
  computed: {
    ...mapState({
      network: state => state.enter.network,
      isOwner: state => state.enter.isOwner
    })
  },
  methods: {
    grantProvider: function (address) {
      this.grantLoader = true
      this.$store.dispatch('passport/setProvider', {
        address
      })
    },
    rejectProvider: function (address) {
      this.grantLoader = true
      this.$store.dispatch('passport/rejectProvider', {
        address
      })
    },
    getDate: function (date) {
      return moment(date).format('L')
    },
    getEtherscanTx: function (tx) {
      return ETHERSCAN[this.network] + tx
    },
    getCountry: function (code) {
      const country = find(propEq('code', code), this.countryList)
      return country.name
    },
    showInfo: async function (address) {
      this.ethBalance = await this.$store.dispatch('auth/getBalance', {
        address
      })
      this.tokenLockedBalance = await this.$store.dispatch(
        'crowdsale/getLockedTokenBalance',
        {
          address
        }
      )
      this.tokenBalance = await this.$store.dispatch('token/getBalance', {
        address
      })
      this.loading = false
    },
    showLastTransactions: async function (target) {
      const address = this.userData.address
      if (target.name === 'transactions') {
        console.log(target)
        this.loading = true
        this.lastTransactions = await this.$store.dispatch(
          'crowdsale/getLastTransactions',
          {
            address
          }
        )
        this.loading = false
      }
      if (target.name === 'passport') {
        this.loading = true
        this.isProvider = await this.$store.dispatch('passport/isProvider', {
          address
        })
        if (this.passport) {
          this.$http
            .get(`passport/users?address=${address}`)
            .then(response => {
              this.passportData = response.body.results[0]
              this.loading = false
            })
            .catch(error => {
              this.$message.error({
                message: error
              })
            })
        } else if (this.passportData) {
          this.loading = false
        }
      }
    },
    copySuccess: function () {
      this.$message({
        message: 'Successfully copied',
        type: 'success'
      })
    }
  },
  mixins: [TextMixin, TimeMixin]
}
</script>

<style lang="sass" scoped>
    .passport-data
        .eth-address-btn
            padding-left: 20px
            padding-right: 20px
            span
              margin-left: 15px !important
        .el-col
            line-height: 1.7
        h4
            font-weight: bold
            color: #222
            letter-spacing: 0.2px
        label
            letter-spacing: 0.8px
            font-size: 12px
            text-transform: uppercase
            display: block
    .owner
        font-size: 11px
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 2px
        background: #EDFEE3
        color: #777777
        letter-spacing: 0.5px
        padding: 3px 5px 3px 18px
        text-align: left
        margin-top: 5px
        display: inline-block
        float: left

    .non-verified
        background: #FD9739 !important
        color: #fff !important
        &:after
            color: #fff !important

    .logo
        width: 35px
        overflow: hidden
        height: 35px
        display: inline-block
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        box-shadow: 2px 2px 7px 0 rgba(220, 220, 220, 0.50)

    .investor

        .address
            font-size: 13px
            line-height: 2
            font-weight: 400
            margin-top: -5px
            text-transform: none
    .devider
        margin: 10px 0
        border-bottom: 1px solid #F3F5F4
    .el-dropdown-link
        display: flex
        align-items: center
        cursor: pointer
        .user-name
            margin-top: 0px
            font-size: 16px
            padding: 0 0 0 15px
            color: #555
            i
               font-size: 18px
               margin-left: 10px
               color: #35C13D
            span
                display: block
</style>
