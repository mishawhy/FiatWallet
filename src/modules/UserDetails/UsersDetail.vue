<template>
    <div class="passport-detail" v-loading="loading">
        <div>
            <h4 class="bold title">Passport</h4>
        </div>
        <div class="content">
            <el-row type="flex" wrap>
                <el-col :xs="24" :sm="10">
                    <h5 class="title bold">Passport</h5>
                    <div class="user-address">
                        <div ref="blockie" class="logo"></div>
                        <div>
                            <h5 class="bold">
                                {{ $R.prop('first_name', detail) }}
                            </h5>
                            <span>
                                {{ $R.prop('address', detail) | shortAddress }}
                            </span>
                        </div>
                        <el-tag v-if="$R.prop('status', detail) === 'APPROVED'">Active</el-tag>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="14">
                    <h5 class="title bold">Balances</h5>
                    <el-row class="user-balance" type="flex" align="middle" wrap>
                        <el-col :xs="24" :sm="12">
                            <h5>US dollars</h5>
                            <span class="bold">{{ balance.usd | money }} USD</span>
                        </el-col>
                        <el-col :xs="24" :sm="12">
                            <h5>EURO</h5>
                            <span class="bold">{{ balance.euro | money }} EURO</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class="filter">
            <div>
                <router-link
                        v-for="item in MENU"
                        :key="item.name"
                        :to="{ name: item.name }"
                        exact>
                    <el-button
                            :class="['filter-button', 'transparent', { 'is-active': route.name === item.name }]"
                            type="text">
                        {{ item.title }}
                    </el-button>
                </router-link>
            </div>
        </div>
        <div>
            <router-view v-if="detail" :detail="detail" />
        </div>
    </div>
</template>

<script>
import { propOr } from 'ramda'
import { mapState, mapActions } from 'vuex'
import TextMixin from '@/mixins/text'
import HelperMixin from '@/mixins/helpers'
import VBody from '@/components/Body'
import VBankList from '@/modules/BankList'
import VIssue from '@/modules/Issue'
import { generateBlockies } from '@/utils/blockies'

import * as ROUTE from '@/constant/routes'

const MENU = [
  {
    title: 'Detail',
    name: ROUTE.USER_DETAIL
  },
  {
    title: 'Transactions',
    name: ROUTE.USER_TRANSACTIONS
  },
  {
    title: 'Issue tokens',
    name: ROUTE.USER_ISSUE_TOKENS
  },
  {
    title: 'Bank accounts',
    name: ROUTE.USER_BANK_ACCOUNTS
  },
  {
    title: 'Fees charger',
    name: ROUTE.USER_FEES_CHARGER
  },
  {
    title: 'Set deposit bank account',
    name: ROUTE.USER_DEPOSIT_ACCOUNT
  }
]

export default {
  name: 'UsersDetail',
  data: function () {
    return {
      MENU,
      loading: false,
      detail: null,
      balance: {
        usd: 0,
        euro: 0
      }
    }
  },
  mounted () {
    this.getDetail()
  },
  computed: {
    ...mapState({
      route: state => state.route
    })
  },
  methods: {
    async getDetail () {
      this.loading = true
      try {
        const id = this.$route.params.id
        const detail = await this.$http.get(`passport/user/${id}`)
        this.detail = propOr(null, 'body', detail)
        const icon = generateBlockies(this.detail.address, {
          active: this.detail.isVerified,
          size: 5
        })
        this.balance = await this.$store.dispatch('balance/getUserBalance', { address: this.detail.address })
        this.$refs.blockie.appendChild(icon)
      } catch (e) {
        // console.log(e)
      }
      this.loading = false
    }
  },
  mixins: [TextMixin, HelperMixin],
  components: {
    VBody,
    VBankList,
    VIssue
  }
}
</script>

<style lang="scss" scoped>
    .passport-detail {
        .content {
            padding: 20px;
            background: #fff;
            margin-bottom: 40px;
            box-sizing: border-box;
            &:last-child {
                margin-bottom: 0
            }
        }
        h5.title {
            margin-bottom: 15px
        }
        .user-balance {
            h5 {
                margin-bottom: 10px
            }
        }
        .user-address {
            display: flex;
            align-items: center;
            h5 {
                line-height: 1.9;
            }
            .el-tag {
                margin: 0 10px 10px
            }
        }
        .logo {
            margin-right: 15px;
            width: 45px;
            overflow: hidden;
            height: 45px;
            text-align: center;
            display: flex;
            align-items: center;
            align-content: center;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            box-shadow: 2px 2px 7px 0 rgba(220, 220, 220, 0.50);
            * {
                display: block;
                margin: 0 auto;
            }
        }
    }
</style>
