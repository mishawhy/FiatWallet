<template>
  <div>
    <VProcessBox :status="process" v-if="process !== null" :title="`Issue ${currency} process`" v-on:resetProcess="resetProcess($options.name)" isModal="true"/>
    <VBody class="send-form" :title="$options.name" :hideTitle="!!isPassportDetails" v-if="process == null">
        <div slot="content" class="address-info">
            <slot />
            <el-form
                :show-message="false"
                @submit.prevent.native
                ref="sendTokenForm"
                :rules="rulesSendToken"
                :model="form">
                <el-form-item label="Recipient" prop="address" v-if="!isPassportDetails">
                    <el-input placeholder="Recipient Ethereum address" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="Amount" class="input-with-button" prop="amount">
                    <el-input placeholder="Amount to issue" type="number" v-model="form.amount" @input="changeAmount">
                        <span class="bold" slot="append">{{ currency }}</span>
                    </el-input>
                    <el-row type="flex" class="form-info" :gutter="10" justify="space-between" align="middle">
                        <el-col :xs="24" :sm="24">
                            <span>Deposit fee: </span><span class="bold">{{ fee | money }} {{ currency }}</span>
                        </el-col>

                    </el-row>
                </el-form-item>

                <el-button
                    class="button" type="primary"
                    @click="submit('sendTokenForm')">
                    Issue {{ form.amount | money }} {{ currency }} {{ form.address.length > 0 ? 'to '+ form.address : null | shortAddress }}
                </el-button>
            </el-form>
        </div>
    </VBody>
  </div>
</template>

<script>
import VProcessBox from '@/components/ProcessBox'
import { isAddress } from 'ethereum-address'
import VBody from '@/components/Body'
import { prepareValidateErrors } from '@/utils/errors'
import TextMixin from '@/mixins/text'
import { createNamespacedHelpers } from 'vuex'
import { RESET_PROCESS_STATE } from '@/constant/mutations'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('transactions')

export default {
  name: 'issue',
  props: {
    currency: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    isPassportDetails: {
      type: Boolean
    }
  },
  watch: {
    address: function () {
      this.form.address = this.address
    }
  },
  data: function () {
    return {
      form: {
        amount: '',
        reference: '',
        address: ''
      },
      fee: 0
    }
  },
  mounted () {
    this.form.address = this.address
    this.resetProcess(this.$options.name)
  },
  methods: {
    ...mapActions(['issueToken', 'calculatePassportFee']),
    ...mapMutations({
      resetProcess: RESET_PROCESS_STATE
    }),
    sendEntire: function () {

      this.form.amount = this.$store.state.balance.balance[this.currency.toLowerCase()]
      this.changeAmount(this.form.amount)
    },
    changeAmount: async function (e) {
      if (e > 0) {
        this.fee = await this.calculatePassportFee({
          type: 'deposit',
          amount: this.form.amount,
          currency: this.currency,
          address: this.address
        })
        console.log('FEE', this.fee)
      } else {
        this.fee = 0
      }
    },
    submit: function (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.issueToken({
            to: this.form.address,
            amount: this.form.amount,
            currency: this.currency
          })
        } else {
          let message = prepareValidateErrors(error)
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: message
          })
          return false
        }
      })
    }
  },
  computed: {
    ...mapState({
      process (state) {
        return state.process[this.$options.name]
      }
    }),
    rulesSendToken: function () {
      let checkZero = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Amount is required'))
        } else if (value < 1) {
          callback(new Error(`Amount can not be less then ${1}`))
        } else {
          callback()
        }
      }
      let checkEthereum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Ethereum address required'))
        } else if (!isAddress(value)) {
          callback(new Error('Please enter valid ethereum address'))
        } else {
          callback()
        }
      }
      return {
        amount: [
          {
            validator: checkZero,
            trigger: ['submit', 'blur']
          }
        ],
        address: [
          {
            validator: checkEthereum,
            trigger: ['submit', 'blur']
          }
        ]
      }
    }
  },
  mixins: [TextMixin],
  components: {
    VBody,
    VProcessBox
  }
}
</script>

<style lang="scss">
</style>
