<template>
    <div class="passport-edit">
        <div class="header">
            <div class="title">
                <h5>General</h5>
                <span>Edit general settings in your passport</span>
            </div>
        </div>
        <div class="account-list">
            <el-form
                :show-message="false"
                @submit.prevent.native
                ref="editPassportForm"
                :model="form">
                <div class="content">
                    <div class="title">
                        <h5>Email</h5>
                        <span>Edit email in your passport</span>
                    </div>
                    <div class="action">
                        <el-form-item :rules="[
                            { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                            { type: 'email', message: 'Please enter valid email', trigger: ['blur', 'change'] }
                        ]" prop="email">
                            <el-input placeholder="Email" v-model="form.email"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="content">
                    <div class="title">
                        <h5>Phone number</h5>
                        <span>Edit phone number in your passport</span>
                    </div>
                    <div class="action">
                        <el-form-item :rules="[
                            { required: true, message: 'Please enter phone number', trigger: ['blur', 'change'] },

                        ]" prop="phone">
                            <el-input placeholder="Phone" v-model="form.phone"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="submit-action">
            <el-button
                :loading="loading"
                class="button" type="primary"
                @click="submit('editPassportForm')">
                Save changes
            </el-button>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers, mapState } from 'vuex'
import { prepareValidateErrors } from '@/utils/errors'

const { mapActions } = createNamespacedHelpers('passport')

export default {
  name: 'PassportGeneral',
  data: function () {
    return {
      loading: false,
      form: {
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapState({
      passport: state => state.enter.passport
    })
  },
  mounted () {
    this.form.email = this.passport.email
    this.form.phone = this.passport.phone
  },
  methods: {
    ...mapActions(['updateGeneralData']),
    submit (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.updateGeneralData(this.form).then(() => {
            this.$message({
              type: 'success',
              message: 'Successfully updated'
            })
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
  }
}
</script>

<style lang="scss" scoped>

</style>
