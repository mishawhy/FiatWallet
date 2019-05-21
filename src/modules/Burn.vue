<template>
  <div>
    <VProcessBox :status="process" v-if="process !== null" :title="`Burn ${currency} process`" v-on:resetProcess="resetProcess($options.name)" isModal="true"/>
    <VBody class="send-form" :title="$options.name" v-if="process == null">
        <div slot="content" class="address-info">
            <el-form
                :show-message="false"
                @submit.prevent.native
                ref="sendTokenForm"
                :rules="rulesSendToken"
                :model="form">
                <el-form-item label="Account" prop="address">
                    <el-input placeholder="Ethereum address" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="Amount" class="input-with-button" prop="amount">
                    <el-input placeholder="Amount to burn" type="number" v-model="form.amount" @input="changeAmount">
                        <span class="bold" slot="append">{{ currency }}</span>
                    </el-input>
                    <el-row type="flex" class="form-info" :gutter="10" justify="space-between" align="middle">
                        <el-col :xs="12" :sm="12">
                            <span>Withdraw fee: </span><span class="bold">{{ fee }} {{ currency }}</span>
                        </el-col>

                    </el-row>
                </el-form-item>

                <el-button
                    class="button" type="primary"
                    @click="submit('sendTokenForm')">
                    Burn {{ form.amount | money }} {{ currency }} {{ form.address.length > 0 ? 'to '+ form.address : null | shortAddress }}
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
  name: 'burn',
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
    ...mapActions(['burnToken', 'calculateFee']),
    ...mapMutations({
      resetProcess: RESET_PROCESS_STATE
    }),
    changeAmount: async function (e) {
      if (e > 0) {
        this.fee = await this.calculateFee({
          type: 'withdraw',
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
          this.burnToken({
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
