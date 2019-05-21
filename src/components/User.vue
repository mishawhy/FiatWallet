<template>
    <div>
        <div class="el-dropdown-link" v-if="!userData.name && !passport"
             v-clipboard:copy="$R.prop('address', userData) || ''"
             v-clipboard:success="copySuccess">
            <div ref="headerlogo" class="logo"></div>
            <div class="user-name bold">
                <span>{{$R.propOr('', 'address', userData) | shortAddress }}</span>
            </div>
        </div>

        <el-popover
                placement="right"
                width="440"
                trigger="click">
            <el-tabs v-loading="loading" v-model="tab">
                <el-tab-pane label="Passport" name="passport">
                    <VBody :hideTitle="true">
                        <div slot="content" class="address-info">
                            <div v-if="passportData">
                                <el-row :gutter="15" class="passport-data" type="flex" wrap>
                                    <el-col :xs="24"  :sm="12">
                                        <label>Passport ID</label>
                                        <el-button plain class="eth-address-btn" v-clipboard:copy="passportData.uq || ''"
                                                   v-clipboard:success="copySuccess"> {{ passportData.uq }}
                                        </el-button>
                                    </el-col>

                                    <el-col :xs="24"  :sm="12">
                                        <label>Name: </label>
                                        <h4>{{ passportData.first_name }} {{passportData.last_name}}</h4>
                                    </el-col>
                                    <el-col :xs="24">
                                        <label>Full name</label>
                                        <h4>{{ passportData.first_name + ' ' + passportData.last_name }}</h4>
                                    </el-col>
                                    <el-col :xs="24" :sm="12">
                                        <label>Status</label>
                                        <el-tag type="success" v-if="passportData.status === 'APPROVED'"> {{ passportData.status  }}
                                        </el-tag>
                                        <el-tag v-if="passportData.status === 'WAIT'"> {{ passportData.status  }}</el-tag>
                                        <el-tag type="danger" v-if="passportData.status === 'REJECT'"> {{ passportData.status  }}</el-tag>
                                    </el-col>
                                    <el-col :xs="24"  :sm="12">
                                        <label>Country</label>
                                        <h4>{{ getCountry(passportData.residence_country) }}</h4>
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
                                        <el-button plain class="eth-address-btn" icon="fab fa-ethereum" v-clipboard:copy="passportData.address || ''"
                                                   v-clipboard:success="copySuccess"> {{ passportData.address }}
                                        </el-button>
                                    </el-col>
                                    <el-col :xs="24" v-if="isOwner">
                                        <label>grant provider status</label>
                                        <el-button plain class="eth-address-btn" v-if="!userData.isProvider && !isProvider" icon="el-icon-star-on" @click="grantProvider(userData.address)" :loading="grantLoader"> Grant user as provider
                                        </el-button>
                                        <el-button plain   type="danger" class="eth-address-btn" v-if="userData.isProvider || isProvider" icon="el-icon-remove-outline" @click="rejectProvider(userData.address)" :loading="grantLoader"> Reject user as provider
                                        </el-button>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </VBody>
                </el-tab-pane>
                <el-tab-pane label="Issue tokens" name="issueTokens">
                  <VIssue :currency="issueCurrency" :address="passportData.address" :isPassportDetails="true">
                      <div class="currency">
                          <el-radio v-model="issueCurrency" label="USD" border class="change-btn">USD</el-radio>
                          <el-radio v-model="issueCurrency" label="EURO" border class="change-btn">EURO</el-radio>
                      </div>
                  </VIssue>
                </el-tab-pane>

                <el-tab-pane label="Fees charger" name="feesCharger">
                    <VFeesCharger :address="passportData.address" :passportId="passportData.uq"/>
                </el-tab-pane>
                <el-tab-pane label="Bank accounts" name="bankAccount">
                    <VBody :hideTitle="true">
                        <div slot="content" class="address-info">
                            <div v-if="$R.propOr([], 'bank_list', passportData).length === 0">No bank accounts</div>
                            <VBankList v-else :list="passportData.bank_list" />
                        </div>
                    </VBody>
                </el-tab-pane>
                <el-tab-pane label="Set deposit bank account" name="depositBankAccount">
                    <VSetDepositBankAccount v-if="tab === 'depositBankAccount'" :passportData="passportData" />
                </el-tab-pane>
            </el-tabs>
            <div class="el-dropdown-link investor" slot="reference" v-if="userData.name || passport" >
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
import VIssue from '@/modules/Issue'
import VBody from '@/components/Body'
import VFeesCharger from '@/modules/FeesCharger'
import VSetDepositBankAccount from '@/modules/SetDepositBankAccount'
import VBankList from '@/modules/BankList'
import TextMixin from '@/mixins/text'
import TimeMixin from '@/mixins/time'
import { generateBlockies } from '@/utils/blockies'

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
      tab: 'passport',
      countryList: require('@/constant/country-list.json'),
      loading: false,
      isProvider: false,
      grantLoader: false,
      issueCurrency: 'USD'
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
    getBalance: (currency) => Math.random() * 1000,
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
    getCountry: function (code) {
      const country = find(propEq('code', code), this.countryList)
      return country.name
    },
    copySuccess: function () {
      this.$message({
        message: 'Successfully copied',
        type: 'success'
      })
    }
  },
  components: {
    VIssue,
    VBody,
    VFeesCharger,
    VSetDepositBankAccount,
    VBankList
  },
  mixins: [TextMixin, TimeMixin]
}
</script>

<style lang="scss" scoped>
    .logo {
        width: 35px;
        overflow: hidden;
        height: 35px;
        display: inline-block;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        box-shadow: 2px 2px 7px 0 rgba(220, 220, 220, 0.50);
    }

    .investor {
        .address {
            font-size: 13px;
            line-height: 2;
            font-weight: 400;
            margin-top: -5px;
            text-transform: none
        }
    }
    .el-dropdown-link {
        display: flex;
        align-items: center;
        cursor: pointer;
        .user-name {
            margin-top: 0;
            font-size: 16px;
            padding: 0 0 0 15px;
            color: #555;
            i {
                font-size: 18px;
                margin-left: 10px;
                color: #35C13D;
            }
            span {
                display: block
            }
        }
    }

</style>
