<template>
    <div>
        <el-form @submit.prevent.native :model="form" ref="generalForm">
            <el-row :gutter="15">

                <el-col :xs="24">
                    <el-form-item
                        prop="account_type">
                        <slot name="label">
                            <div class="uppercase label">Choose account type</div>
                        </slot>
                        <template>
                          <el-radio v-model="form.account_type" border label="PRIVATE">Personal</el-radio>
                          <el-radio v-model="form.account_type" border label="CORPORATE">Corporate</el-radio>
                        </template>

                    </el-form-item>
                </el-col>

                <!--<el-col :xs="24" :sm="12">-->
                    <!--<el-form-item prop="address" :rules="[-->
                            <!--{ required: true, message: 'Please enter email', trigger: ['blur', 'change'] },-->
                        <!--]">-->
                        <!--<slot name="label">-->
                            <!--<div class="uppercase label">Address</div>-->
                        <!--</slot>-->
                        <!--<el-input placeholder="Enter the address" v-model="form.address"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
              <el-col :xs="24" :sm="12">
                  <h2 class="title-sm">Personal details</h2>

                <el-col>
                    <el-form-item prop="first_name" :rules="[
                            { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                        ]">
                        <slot name="label">
                            <div class="uppercase label">First name</div>
                        </slot>
                        <el-input placeholder="Enter first name" v-model="form.first_name">
                          <el-select v-model="form.title" slot="prepend" placeholder="Select" style="width:100px">
                              <el-option label="Mr." value="Mr">Mr.</el-option>
                              <el-option label="Mrs." value="Mrs">Mrs.</el-option>

                            </el-select>
                        </el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item prop="middle_name">
                        <slot name="label">
                            <div class="uppercase label">Middle name</div>
                        </slot>
                        <el-input placeholder="Enter middle name" v-model="form.middle_name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item prop="last_name" :rules="[
                        { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Last name</div>
                        </slot>
                        <el-input placeholder="Enter last name" v-model="form.last_name"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item
                        class="email"
                        prop="email"
                        :rules="[
                            { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                            { type: 'email', message: 'Please enter valid email', trigger: ['blur', 'change'] },
                        ]">
                        <slot name="label">
                            <div class="uppercase label">Email</div>
                        </slot>
                        <el-input placeholder="Enter email address" type="email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item
                        :rules="[
                            { required: true, message: 'Phone number is required', trigger: ['blur', 'change'] },
                        ]" prop="phone">
                        <slot name="label">
                            <div class="uppercase label">Phone number</div>
                        </slot>
                        <el-input placeholder="Please enter phone number" v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item prop="date_of_birth" :rules="[
                            { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                        ]">
                        <slot name="label">
                            <div class="uppercase label">Date of birth</div>
                        </slot>
                        <el-date-picker placeholder="Please enter date of birth" v-model="form.date_of_birth"></el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item prop="place_of_birth" :rules="[
                            { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                        ]">
                        <slot name="label">
                            <div class="uppercase label">Place of birth</div>
                        </slot>
                        <el-input placeholder="Enter birth place" v-model="form.place_of_birth"></el-input>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item prop="current_address" :rules="[
                            { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                        ]">
                        <slot name="label">
                            <div class="uppercase label">Current address</div>
                        </slot>
                        <el-input placeholder="Enter current address" v-model="form.current_address"></el-input>
                    </el-form-item>
                </el-col>

                </el-col>
      <el-col :xs="24" :sm="12">
  <h2 class="title-sm">Identity details</h2>


                        <el-col>
                            <el-form-item
                                prop="country_of_residence"
                                :rules="[
                                    { required: true, message: 'Please select country', trigger: ['blur', 'change'] },
                                ]">
                                <slot name="label">
                                    <div class="uppercase label">Country of residence</div>
                                </slot>
                                <el-select placeholder="Select country" v-model="form.country_of_residence" filterable>
                                    <el-option
                                        v-for="country in countryList"
                                        :label="country.name"
                                        :key="country.code"
                                        :value="country.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-form-item prop="identification_number" :rules="[
                                    { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                                ]">
                                <slot name="label">
                                    <div class="uppercase label">Identification number</div>
                                </slot>
                                <el-input placeholder="Enter identification number" v-model="form.identification_number"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-form-item prop="passport_number" :rules="[
                                    { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                                ]">
                                <slot name="label">
                                    <div class="uppercase label">Passport number</div>
                                </slot>
                                <el-input placeholder="Enter passport number" v-model="form.passport_number"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-form-item prop="passport_expiry_date" :rules="[
                                    { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                                ]">
                                <slot name="label">
                                    <div class="uppercase label">Passport expiry date</div>
                                </slot>
                                <el-date-picker placeholder="Please enter passport expiry date" v-model="form.passport_expiry_date"></el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-form-item
                                prop="passport_issuing_country"
                                :rules="[
                                    { required: true, message: 'Please select passport issuing country', trigger: ['blur', 'change'] },
                                ]">
                                <slot name="label">
                                    <div class="uppercase label">Passport issuing country</div>
                                </slot>
                                <el-select placeholder="Select country" v-model="form.passport_issuing_country" filterable>
                                    <el-option
                                        v-for="country in countryList"
                                        :label="country.name"
                                        :key="country.code"
                                        :value="country.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col>
                            <el-form-item prop="passport_issuing_authority" :rules="[
                                    { required: true, message: 'Please enter email', trigger: ['blur', 'change'] },
                                ]">
                                <slot name="label">
                                    <div class="uppercase label">Passport issuing authority</div>
                                </slot>
                                <el-input placeholder="Enter passport issuing authority" v-model="form.passport_issuing_authority"></el-input>
                            </el-form-item>
                        </el-col>
      </el-col>
            </el-row>

            <div class="text-right">
                <el-button
                        :loading="loading"
                        class="button"
                        type="primary"
                        @click="submit('generalForm')">
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
  name: 'Corporate',
  data: function () {
    return {
      loading: false,
      countryList: require('@/constant/country-list.json'),
      form: {
        account_type: 'PRIVATE',
        // address: '',

      }
    }
  },
  methods: {
    ...mapActions(['submitGeneral']),
    submit (ref) {
      let self = this
      this.$refs[ref].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.submitGeneral(this.form).finally(() => {
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
  }
}
</script>

<style lang="scss">
.title-sm {
     margin:10px;
     margin-bottom: 20px;
     font-weight: 600;
    }
</style>
