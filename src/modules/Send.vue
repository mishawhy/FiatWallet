<template>
  <div>
    <VProcessBox :status="process" v-if="process !== null" :title="`Send ${currency} process`" v-on:resetProcess="resetProcess($options.name)" isModal="true"/>
    <VBody class="send-form" :title="$options.name" v-if="process == null">
        <div slot="content" class="address-info">
            <el-form
                :show-message="false"
                @submit.prevent.native
                ref="sendTokenForm"
                :rules="rulesSendToken"
                :model="form">
                <el-form-item label="Recipient" prop="address">
                    <el-input placeholder="Recipient Ethereum address" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="Amount" class="input-with-button" prop="amount">
                    <el-input placeholder="Amount to send" type="number" v-model="form.amount" @input="changeAmount">
                        <span class="bold" slot="append">{{ currency }}</span>
                    </el-input>
                    <el-row type="flex" class="form-info" :gutter="10" justify="space-between" align="middle">
                        <el-col :xs="16" :sm="24">
                            <span>Transfer fee: </span><span class="bold">{{ fee | money }} {{ currency }}</span>
                        </el-col>
                        <el-col :xs="8" :sm="24" class="text-right">
                            <a href="#" title="Send entire" @click="sendEntire" class="bold">Send entire balance</a>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="Reference" prop="reference">
                    <el-input placeholder="Reference" v-model="form.reference"></el-input>
                </el-form-item>
                <el-button
                    class="button" type="primary"
                    @click="submit('sendTokenForm')">
                    Send {{ form.amount | money }} {{ currency }} {{ form.address.length > 0 ? 'to '+ form.address : null | shortAddress }}
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
  name: 'send',
  props: {
    currency: {
      type: String,
      required: true
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

    this.resetProcess(this.$options.name)
  },
  methods: {
    ...mapActions(['sendToken', 'calculateFee']),
    ...mapMutations({
      resetProcess: RESET_PROCESS_STATE
    }),
    sendEntire: function () {

      this.form.amount = this.$store.state.balance.balance[this.currency.toLowerCase()]
      this.changeAmount(this.form.amount)
    },
    changeAmount: async function (e) {
      if (e > 0) {
        this.fee = await this.calculateFee({
          type: 'transfer',
          amount: this.form.amount,
          currency: this.currency
        })
      } else {
        this.fee = 0
      }
    },
    submit: function (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.sendToken({
            to: this.form.address,
            amount: this.form.amount,
            reference: this.form.reference,
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
      let checkReference = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Reference is required'))
        }  else {
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
        ],
        reference: [
          {
            validator: checkReference,
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
