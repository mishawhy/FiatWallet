<template>
    <div>
        <el-form @submit.prevent.native :model="form" ref="confirmEmailForm">
            <el-row :gutter="15">
                <el-col :xs="24">
                    <el-form-item
                        :rules="[
                            { required: true, message: 'Confirmation code is required', trigger: ['blur', 'change'] },
                        ]" prop="token">
                        <slot name="label">
                            <div class="uppercase label">Confirmation code we send you to email</div>
                        </slot>
                        <el-input placeholder="Enter confirmation code" v-model="form.token"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <div class="text-right">
                <el-button
                    :loading="loading"
                    type="primary"
                    @click="submit('confirmEmailForm')">
                    Next step
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { prepareValidateErrors } from '@/utils/errors'

const { mapActions } = createNamespacedHelpers('verification')

export default {
  name: 'EmailConfirm',
  data: function () {
    return {
      loading: false,
      form: {
        token: ''
      }
    }
  },
  methods: {
    ...mapActions(['submitEmailConfirm']),
    async submit (ref) {
      this.$refs[ref].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.submitEmailConfirm(this.form).finally(() => {
            this.loading = false
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
  }
}
</script>

<style scoped>

</style>
