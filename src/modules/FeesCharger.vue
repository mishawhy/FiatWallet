<template>
  <div>
    <VBody
      class="send-form"
      :title="$options.name"
      :hideTitle="true"
      :loading="loading"
    >
      <div slot="content" class="address-info">
        <el-form
          :show-message="false"
          @submit.prevent.native
          ref="sendTokenForm"
          :model="form"
        >
          <div class="passport-data">
            <div>
              <div class="currency">
                <el-radio
                  v-model="currency"
                  label="USD"
                  border
                  class="change-btn"
                  >USD</el-radio
                >
                <el-radio
                  v-model="currency"
                  label="EURO"
                  border
                  class="change-btn"
                  >EURO</el-radio
                >
              </div>
            </div>
            <div>
              <h5 class="title-block">Transfer fees</h5>
              <el-row type="flex" :gutter="20" justify="space-between" align="middle" wrap>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                    label="Fixed fee"
                    class="input-with-button"
                    prop="transferFix"
                  >
                    <el-input
                      placeholder="Fix fee"
                      type="text"
                      v-model="form[currency].transfer.fix"
                    >
                      <span class="bold" slot="append">{{ currency }}</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                    label="Flexible fee"
                    class="input-with-button"
                    prop="transferFlex"
                  >
                    <el-input
                      placeholder="Flex fee"
                      type="text"
                      v-model="form[currency].transfer.flex"
                    >
                      <span class="bold" slot="append">%</span>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <h5 class="title-block">Deposit fees</h5>
              <el-row type="flex" :gutter="20" justify="space-between" align="middle" wrap>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                    label="Fixed fee"
                    class="input-with-button"
                    prop="depositFix"
                  >
                    <el-input
                      placeholder="Fix fee"
                      type="text"
                      v-model="form[currency].deposit.fix"
                    >
                      <span class="bold" slot="append">{{ currency }}</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                    label="Flexible fee"
                    class="input-with-button"
                    prop="depositFlex"
                  >
                    <el-input
                      placeholder="Flex fee"
                      type="text"
                      v-model="form[currency].deposit.flex"
                    >
                      <span class="bold" slot="append">%</span>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div>
              <h5 class="title-block">Withdraw fees</h5>
              <el-row type="flex" :gutter="20" justify="space-between" align="middle" wrap>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                    label="Fixed fee"
                    class="input-with-button"
                    prop="withdrawFix"
                  >
                    <el-input
                      placeholder="Fix fee"
                      type="text"
                      v-model="form[currency].withdraw.fix"
                    >
                      <span class="bold" slot="append">{{ currency }}</span>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <el-form-item
                    label="Flexible fee"
                    class="input-with-button"
                    prop="withdrawFlex"
                  >
                    <el-input
                      placeholder="Flex fee"
                      type="text"
                      v-model="form[currency].withdraw.flex"
                    >
                      <span class="bold" slot="append">%</span>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>

          <el-button
            class="button"
            type="primary"
            :loading="loadingBtn"
            @click="saveChanges()"
          >
            Save changes
          </el-button>
        </el-form>
      </div>
    </VBody>
  </div>
</template>

<script>
import VProcessBox from '@/components/ProcessBox'
import VBody from '@/components/Body'
import { Message } from 'element-ui'
import TextMixin from '@/mixins/text'
import { getFeesByAddress, setFeesToAddress } from '@/utils/web3'
import { mapState } from 'vuex'

export default {
  name: 'issue',
  props: {
    address: {
      type: String
    },
    passportId: {
      type: Number
    }
  },
  watch: {
    pass: async function () {
      await this.getFees()
    }
  },
  data: function () {
    return {
      form: {
        USD: {
          transfer: {
            fix: '',
            flex: ''
          },
          deposit: {
            fix: '',
            flex: ''
          },
          withdraw: {
            fix: '',
            flex: ''
          }
        },
        EURO: {
          transfer: {
            fix: '',
            flex: ''
          },
          deposit: {
            fix: '',
            flex: ''
          },
          withdraw: {
            fix: '',
            flex: ''
          }
        },
        address: ''
      },
      currency: 'USD',
      loading: false,
      loadingBtn: false,
      hide: true
    }
  },
  async mounted () {
    await this.getFees()
  },
  methods: {
    getFees: async function () {
      this.loading = true
      try {
        const feesUSD = await getFeesByAddress({
          currency: 'USD',
          address: this.address
        })
        const feesEURO = await getFeesByAddress({
          currency: 'EURO',
          address: this.address
        })

        this.form = {
          USD: feesUSD,
          EURO: feesEURO
        }
        this.loading = false
      } catch (error) {
        Message.error({
          message: error
        })
      }
    },
    saveChanges: async function () {
      this.loadingBtn = true
      try {
        await setFeesToAddress({
          currency: this.currency,
          fees: this.form[this.currency],
          pass: this.passportId,
          from: this.from
        })
        Message.success({
          message: `Fees successfully changed`
        })
        await this.getFees()
        this.loadingBtn = false
      } catch (error) {
        Message.error({
          message: error
        })
      }
    }
  },
  mixins: [TextMixin],
  computed: {
    ...mapState({
      from: state => state.enter.address
    })
  },
  components: {
    VBody,
    VProcessBox
  }
}
</script>

<style lang="scss">
.address-info {
  .currency {
    display: flex;
    .change-btn {
      flex: 1;
    }
  }
}
.change-btn {
  width: 45%;
}
.title-block {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0px;
  margin-left: 5px;
  margin-top: 15px;
}
</style>
