<template>
    <VProcessBox :status="process" v-if="process !== null" title="Receipt process" v-on:resetProcess="resetProcess($options.name)" isModal="true"/>
    <VBody v-else :title="$options.name">
        <div slot="content" class="address-info">
          <el-form
              :show-message="false"
              @submit.prevent.native
              ref="receiptForm"
              :model="form">
              <el-form-item label="Your account address" class="input-with-button">
                  <div class="address-block">
                      <div class="address">
                          <el-input :readonly="true" v-model="address">
                              <a slot="append" href="#"
                                 class="bold copy-button"
                                 @click.prevent
                                 v-clipboard:copy="address"
                                 v-clipboard:success="copySuccess">
                                  <i class="far fa-copy"></i>
                              </a>
                          </el-input>
                      </div>
                      <div class="shadow qr-code" @click="qrDialog = true">
                          <qriously :value="address" :size="48" />
                      </div>
                  </div>
              </el-form-item>
              <div class="divider"></div>
              <el-form-item :rules="[
                    { required: true, message: 'Amount is required', trigger: ['blur', 'change'] },
                ]" label="Amount" class="input-with-button" prop="amount">
                  <el-input placeholder="Amount to send" type="number" v-model="form.amount">
                      <span class="bold" slot="append">{{ currency }}</span>
                  </el-input>
                
              </el-form-item>
              <el-form-item label="Reference" prop="reference">
                  <el-input placeholder="Reference" v-model="form.reference"></el-input>
              </el-form-item>
              <el-button
                  class="button" type="primary"
                  @click="submit('receiptForm')">
                  Create invoice
              </el-button>
          </el-form>
        </div>
        <el-dialog
            class="module-dialog"
            :visible.sync="qrDialog"
            width="300px"
            append-to-body>
            <qriously :value="address" :size="250" />
        </el-dialog>
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
  name: 'receipt',
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
        reference: ''
      },
      qrDialog: false,
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
    ...mapActions(['receiveToken']),
    ...mapMutations({
      resetProcess: RESET_PROCESS_STATE
    }),
    submit: function (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.receiveToken({
            address: this.address,
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
    },
    sendEntire: function () {
      this.form.amount = this.stableUsd
      console.log(this.form.amount)
    },
    copySuccess: function () {
      this.$message({
        message: 'Successfully copied',
        type: 'success'
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
    .copy-button {
        font-size: 18px;
    }
    .address-block {
        width: 100%;
        display: flex;
        .address {
            flex: 1;
        }
        .qr-code {
            cursor: pointer;
            margin-left: 20px;
            width: 48px;
            height: 48px;
            text-align: center;
        }
    }
</style>
