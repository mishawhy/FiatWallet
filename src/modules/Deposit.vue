<template>
    <VProcessBox :status="process" v-if="process !== null" title="Deposit process" v-on:resetProcess="resetProcess($options.name)" isModal="true"/>
    <VBody v-else :title="$options.name">
        <div slot="content">
          <el-form
              :show-message="false"
              @submit.prevent.native
              ref="depositForm"
              :model="form">
              <el-form-item :rules="[
                { required: true, message: 'Amount is required', trigger: ['blur', 'change'] },
                ]" label="Amount" class="input-with-button" prop="amount">
                  <el-input placeholder="Amount to deposit" type="number" v-model="form.amount" @input="changeAmount">
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
                  @click="submit('depositForm')">
                  Deposit
              </el-button>
          </el-form>
        </div>
    </VBody>
</template>

<script>
import VProcessBox from '@/components/ProcessBox'
import TimeMixin from '@/mixins/time'
import TextMixin from '@/mixins/text'
import VBody from '@/components/Body'
import { RESET_PROCESS_STATE } from '@/constant/mutations'
import { createNamespacedHelpers } from 'vuex'
import { prepareValidateErrors } from '@/utils/errors'

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('transactions')

export default {
  name: 'deposit',
  props: {
    currency: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      form: {
        amount: ''
      },
      fee: 0
    }
  },
  mounted () {
    this.resetProcess(this.$options.name)
  },
  computed: {
    ...mapState({
      process (state) {
        return state.process[this.$options.name]
      }
    }),
    address () {
      return this.$store.state.enter.address
    }
  },
  methods: {
    ...mapActions(['depositToken', 'calculateFee']),
    ...mapMutations({
      resetProcess: RESET_PROCESS_STATE
    }),
    changeAmount: async function (e) {
      if (e > 0) {
        this.fee = await this.calculateFee({
          type: 'deposit',
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
          this.depositToken({
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
  components: {
    VBody,
    VProcessBox
  },
  mixins: [TimeMixin, TextMixin]
}
</script>

<style lang="scss" scoped>
</style>
