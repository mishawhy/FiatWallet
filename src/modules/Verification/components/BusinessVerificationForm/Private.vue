<template>
    <div>
        <el-form @submit.prevent.native :model="form" ref="corporateForm">
            <el-row :gutter="15">

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="description_of_business" :rules="[
                        { required: true, message: 'Please enter description of business', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Description of business</div>
                        </slot>
                        <el-input placeholder="Enter description_of_business" v-model="form.description_of_business"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="economic_activity" :rules="[
                        { required: true, message: 'Please enter type of economic activity', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Type of economic activity</div>
                        </slot>
                        <el-input placeholder="Enter economic_activity" v-model="form.economic_activity"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="source_of_funds" :rules="[
                        { required: true, message: 'Please enter source of funds', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Source of funds</div>
                        </slot>
                        <el-input placeholder="Enter source_of_funds" v-model="form.source_of_funds"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="main_partners" :rules="[
                        { required: true, message: 'Please enter main partners (incl. countries)', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Main partners (incl. countries)</div>
                        </slot>
                        <el-input placeholder="Enter main_partners" v-model="form.main_partners"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="usual_payment_methods" :rules="[
                        { required: true, message: 'Please enter usual payment methods', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Usual payment methods</div>
                        </slot>
                        <el-input placeholder="Enter usual_payment_methods" v-model="form.usual_payment_methods"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="politically_exposed" :rules="[
                        { required: true, message: 'Please enter politically exposed person (PEP) or affiliated to PEP', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Politically exposed person (PEP) or affiliated to PEP</div>
                        </slot>
                        <el-switch v-model="form.politically_exposed"></el-switch>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="existing_client_accounts" :rules="[
                        { required: true, message: 'Please enter existing Client accounts', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Existing Client accounts</div>
                        </slot>
                        <el-input placeholder="Enter existing_client_accounts" v-model="form.existing_client_accounts"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="purpose_account_opening" :rules="[
                        { required: true,
                        message: 'Please enter purpose of account opening, description of expected transactions',
                         trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Purpose of account opening, description of expected transactions</div>
                        </slot>
                        <el-input placeholder="Enter purpose of account opening..." v-model="form.purpose_account_opening"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="annual_turnover" :rules="[
                        { required: true, message: 'Please enter expected annual turnover', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Expected annual turnover</div>
                        </slot>
                        <el-input placeholder="Enter annual_turnover" v-model="form.annual_turnover"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item prop="applicant_status" :rules="[
                        { required: true, message: 'Please enter Applicant\'s status', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Applicant's status</div>
                        </slot>
                        <el-input placeholder="Enter applicant status" v-model="form.applicant_status"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item
                            prop="documents"
                            :rules="[
                            { required: true, message: 'Please select documents', trigger: ['change', 'blur'] },
                        ]">
                        <slot name="label">
                            <div class="uppercase label">
                                Passport and documents confirming full name, identification number,
                                date and place of birth, current address,
                                source of funds in English or Estonian languages</div>
                        </slot>
                        <VUploadFile v-model="form.documents" />
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="text-right">
                <el-button
                        :loading="loading"
                        class="button"
                        type="primary"
                        @click="submit('corporateForm')">
                    Next step
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import VUploadFile from '@/components/UploadFile'
import { prepareValidateErrors } from '@/utils/errors'

const { mapState, mapActions } = createNamespacedHelpers('verification')

export default {
  name: 'Corporate',
  data: function () {
    return {
      loading: false,
      form: {
        description_of_business: '',
        economic_activity: '',
        source_of_funds: '',
        main_partners: '',
        usual_payment_methods: '',
        politically_exposed: false,
        existing_client_accounts: '',
        purpose_account_opening: '',
        annual_turnover: '',
        documents: '',
        applicant_status: '',
          documents_confirm:""
      }
    }
  },
  computed: {
    ...mapState({
      businessData: state => state.data
    })
  },
  methods: {
    ...mapActions(['submitPrivateVerification']),
    submit (ref) {
      let self = this
      this.$refs[ref].validate((valid, error) => {
        if (valid) {
          const formData = new FormData()
          for (let key in this.form) {
            formData.append(key, this.form[key])
          }
          this.loading = true
          this.submitPrivateVerification(formData).finally(() => {
            self.loading = false
          })
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: prepareValidateErrors(error)
          })
        }
      })
    }
  },
  components: {
    VUploadFile
  }
}
</script>

<style lang="scss" scoped>
</style>
