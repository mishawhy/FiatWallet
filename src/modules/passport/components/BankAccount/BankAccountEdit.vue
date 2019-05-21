<template>
    <div>
        <VBody title="Edit bank account">
            <div slot="content">
                <el-form
                    :show-message="false"
                    @submit.prevent.native
                    ref="editBankAccount"
                    :model="form">
                    <el-row type="flex" :gutter="10" justify="space-between" align="middle" wrap>
                        <el-col :xs="24" :sm="12">
                            <el-form-item
                                    :rules="[
                                    { required: true, message: 'Beneficiary bank is required', trigger: ['blur', 'change'] },
                                ]"
                                    label="Beneficiary bank" prop="ben_bank">
                                <el-input placeholder="Aval Bank" v-model="form.ben_bank"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12">
                            <el-form-item label="Currency" prop="currency">
                                <el-select v-model="form.currency">
                                    <el-option
                                            label="EURO"
                                            value="EURO">
                                    </el-option>
                                    <el-option
                                            label="USD"
                                            value="USD">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :xs="24">
                          <el-form-item
                              :rules="[
                                  { required: true, message: 'Beneficiary bank address is required', trigger: ['blur', 'change'] },
                              ]"
                              label="Beneficiary Bank address" prop="ben_bank_address">
                              <el-input placeholder="France, Paris" v-model="form.ben_bank_address"></el-input>
                          </el-form-item>
                          <el-form-item
                              :rules="[
                                  { required: true, message: 'Beneficiary Bank Swift is required', trigger: ['blur', 'change'] },
                              ]"
                              label="Beneficiary Bank Swift" prop="ben_bank_swift">
                              <el-input placeholder="SF3244234" v-model="form.ben_bank_swift"></el-input>
                          </el-form-item>
                            <el-form-item
                                    :rules="[
                                    { required: true, message: 'Beneficiary name is required', trigger: ['blur', 'change'] },
                                ]"
                                    label="Beneficiary name" prop="ben_name">
                                <el-input placeholder="Skaylark inc." v-model="form.ben_name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item
                        :rules="[
                            { required: true, message: 'Beneficiary address is required', trigger: ['blur', 'change'] },
                        ]"
                        label="Beneficiary address" prop="ben_address">
                        <el-input placeholder="France, Paris" v-model="form.ben_address"></el-input>
                    </el-form-item>
                    <el-form-item
                        :rules="[
                            { required: true, message: 'Beneficiary account is required', trigger: ['blur', 'change'] },
                        ]"
                        label="Beneficiary account" prop="ben_account">
                        <el-input placeholder="SF3244234" v-model="form.ben_account"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="form-info">
                            <div>
                                <span class="bold">Activate Bank account as main for withdraw</span>
                            </div>
                            <div class="text-right">
                                <el-switch
                                        v-model="form.active"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </div>
                        </div>
                    </el-form-item>
                    <el-button
                        :loading="loading"
                        class="button" type="primary"
                        @click="submit('editBankAccount')">
                        Save changes
                    </el-button>
                </el-form>
                <div class="status-box" v-if="error">
                    <el-alert
                        show-icon
                        :closable="false"
                        title="Something goes wrong"
                        type="error">
                    </el-alert>
                </div>
            </div>
        </VBody>
    </div>
</template>

<script>
import VBody from '@/components/Body'
import { prepareValidateErrors } from '@/utils/errors'
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('passport')

export default {
  name: 'BankAccountEdit',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      error: false,
      loading: false,
      form: {
        ben_account: '',
        ben_bank_swift: '',
        ben_bank_address: '',
        ben_bank: '',
        ben_name: '',
        ben_address: '',
        currency: 'EURO',
        active: true
      }
    }
  },
  mounted () {
    const { ben_account, ben_bank, ben_name,ben_bank_address, ben_bank_swift, ben_address, currency, active } = this.data
    this.form = { ben_account, ben_bank, ben_name,ben_bank_address, ben_bank_swift, ben_address, currency, active }
  },
  methods: {
    ...mapActions(['editBankAccount']),
    submit: function (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.editBankAccount({
            id: this.data.id,
            params: this.form
          }).then(() => {
            this.$emit('close')
          }).catch(() => {
            this.error = true
          }).finally(() => {
            this.loading = false
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
    VBody
  }
}
</script>

<style lang="scss">
</style>
