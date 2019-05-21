<template>
    <div>
        <el-form @submit.prevent.native :model="form" ref="corporateForm">
            <el-row :gutter="15">

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="legal_entry_name" :rules="[
                        { required: true, message: 'Please enter Legal entity name', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Legal entity name </div>
                        </slot>
                        <el-input placeholder="Enter Legal entity name" v-model="form.legal_entry_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item prop="legal_entry_organizations_form" :rules="[
                        { required: true, message: 'Please enter legal entity organizational form', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Legal entity organizational form</div>
                        </slot>
                        <el-input placeholder="Enter registered_address" v-model="form.legal_entry_organizations_form"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="place_of_business" :rules="[
                        { required: true, message: 'Please enter place of business', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Place of business</div>
                        </slot>
                        <el-input placeholder="Enter place of business" v-model="form.place_of_business"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="registrations_no" :rules="[
                        { required: true, message: 'Please enter Registration No', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Registration No</div>
                        </slot>
                        <el-input placeholder="Enter registrations no" v-model="form.registrations_no"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="descriptions_of_business" :rules="[
                        { required: true, message: 'Please enter description of business', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Description of business</div>
                        </slot>
                        <el-input placeholder="Enter description of business" v-model="form.descriptions_of_business"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="registered_address" :rules="[
                        { required: true, message: 'Please enter registered address ', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Registered address</div>
                        </slot>
                        <el-input placeholder="Enter registered address" v-model="form.registered_address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <el-form-item prop="date_of_registrations" :rules="[
                        { required: true, message: 'Please enter registration date', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Date of registration</div>
                        </slot>
                        <el-date-picker
                                format="dd-MM-yyyy"
                                type="date"
                                placeholder="Enter Date of registration"
                                        v-model="form.date_of_registrations"></el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="directors" :rules="[
                        { required: true, message: 'Please enter directors', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Directors/Board Members/Management authority names</div>
                        </slot>
                        <el-input placeholder="Enter directors" v-model="form.directors"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="phone" :rules="[
                        { required: true, message: 'Please enter phone', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Phone number</div>
                        </slot>
                        <el-input placeholder="Enter phone number" v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
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
                        <el-input placeholder="Enter email" type="email" v-model="form.email"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="legal_entity_registered" :rules="[
                        { required: true, message: 'Please enter Legal entity registered ', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Legal entity registered on a regulated market with obligatory regular disclosure of information?</div>
                        </slot>
                        <el-input placeholder="Enter legal entity registered "
                                  v-model="form.legal_entity_registered"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="legal_entity_credit_institution" :rules="[
                        { required: true, message: 'Please enter legal_entity_credit_institution', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Legal entity is a credit institution?</div>
                        </slot>
                        <el-input placeholder="Enter legal_entity_credit_institution"
                                  v-model="form.legal_entity_credit_institution"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="related_legal_entity" :rules="[
                        { required: true, message: 'Please enter related_legal_entity', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Related to Legal entity Politically exposed persons (PEP) or affiliated to PEP </div>
                        </slot>
                        <el-input placeholder="Enter related_legal_entity"
                                  v-model="form.related_legal_entity"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item
                            prop="economic_activity"
                            :rules="[
                            { required: true, message: 'Please select economic activity', trigger: ['blur', 'change'] },
                        ]">
                        <slot name="label">
                            <div class="uppercase label">Type of economic activity</div>
                        </slot>
                        <el-select placeholder="Select business types" v-model="form.economic_activity" filterable>
                            <el-option
                                    v-for="type in ECONOMIC_ACTIVITY"
                                    :label="type.name"
                                    :key="type.code"
                                    :value="type.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="source_of_fund" :rules="[
                        { required: true, message: 'Please enter Source of funds', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Source of funds</div>
                        </slot>
                        <el-input placeholder="Enter Source of funds" v-model="form.source_of_fund"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="main_partners" :rules="[
                        { required: true, message: 'Please enter Main partners (incl. countries)', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Main partners (incl. countries)</div>
                        </slot>
                        <el-input placeholder="Enter Main partners (incl. countries)" v-model="form.main_partners"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="usual_payment_methods" :rules="[
                        { required: true, message: 'Please enter Usual payment methods', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Usual payment methods</div>
                        </slot>
                        <el-input placeholder="Enter usual payment methods"
                                  v-model="form.usual_payment_methods"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="existing_client_account" :rules="[
                        { required: true, message: 'Please enter Existing Client accounts', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Existing Client accounts</div>
                        </slot>
                        <el-input placeholder="Enter Existing Client accounts"
                                  v-model="form.existing_client_account"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="purpose_of_accounts_opening" :rules="[
                        { required: true, message: 'Please enter purpose of account opening, description of expected transactions', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Purpose of account opening, description of expected transactions</div>
                        </slot>
                        <el-input placeholder="Enter purpose of account opening"
                                  v-model="form.purpose_of_accounts_opening"></el-input>
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
                    <el-form-item prop="beneficiaries" :rules="[
                        { required: true, message: 'Please enter Beneficiaries of the Legal Entity (including their share in Legal entity)', trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Beneficiaries of the Legal Entity (including their share in Legal entity)</div>
                        </slot>
                        <el-input placeholder="Enter beneficiaries" v-model="form.beneficiaries"></el-input>
                    </el-form-item>
                </el-col>

                <!--<el-col :xs="24" :sm="12">-->
                    <!--<el-form-item prop="Applicant's status" :rules="[-->
                        <!--{ required: true, message: `Please enter Applicant\'s status`'`, trigger: ['blur', 'change'] },-->
                    <!--]">-->
                        <!--<slot name="label">-->
                            <!--<div class="uppercase label">Applicant's status</div>-->
                        <!--</slot>-->
                        <!--<el-input placeholder="Enter Applicant's status" v-model="form.applicant_status"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->

                <el-col :xs="24" :sm="12">
                    <el-form-item prop="applicant_status" :rules="[
                        { required: true, message:`Please enter Applicant's status`, trigger: ['blur', 'change'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Please enter Applicant's status</div>
                        </slot>
                        <el-input placeholder="Enter registered address" v-model="form.applicant_status"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="24">
                    <el-form-item
                            prop="corporate_registrations"
                            :rules="[
                            { required: true, message: 'Please select Corporate registration', trigger: ['change', 'blur'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Corporate registration documents confirming Legal entity’s name, organizational form, place and address, registration No, date of registration, names of Director/Board Members/Management authority, phone number and information on beneficiaries. Documents confirming source of funds. All documents should be presented in English or Estonian languages</div>
                        </slot>
                        <VUploadFile v-model="form.corporate_registrations"/>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                    <el-form-item
                            prop="documents_confirm"
                            :rules="[
                            { required: true, message: 'Please select documents file', trigger: ['change', 'blur'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Documents confirming representation authority</div>
                        </slot>
                        <VUploadFile v-model="form.documents_confirm"/>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                    <el-form-item
                            prop="documents_confirm_applicant"
                            :rules="[
                            { required: true, message: 'Please select Document confirming Applicant authority to open the accounts', trigger: ['change', 'blur'] },
                    ]">
                        <slot name="label">
                            <div class="uppercase label">Document confirming Applicant authority to open the accounts</div>
                        </slot>
                        <VUploadFile v-model="form.documents_confirm_applicant"/>
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
    import {createNamespacedHelpers} from 'vuex'
    import VUploadFile from '@/components/UploadFile'
    import {prepareValidateErrors} from '@/utils/errors'

    const {mapState, mapActions} = createNamespacedHelpers('verification')

    const ECONOMIC_ACTIVITY = [
        {name: 'Sole Proprietorship', code: 1},
        {name: 'Partnership', code: 2},
        {name: 'Limited Partnership', code: 3},
        {name: 'Corporation', code: 4},
        {name: 'Limited Liability Company (LLC)', code: 5},
        {name: 'Nonprofit Organization', code: 6},
        {name: 'Cooperative (Co-op)', code: 7}
    ]

    export default {
        name: 'Private',
        data: function () {
            return {
                loading: false,
                ECONOMIC_ACTIVITY,
                form: {
                    registered_address: '',
                    registrations_no: '',
                    date_of_registrations: '',
                    directors: '',
                    documents_confirm: null,
                    phone: '',
                    email: '',
                    legal_entity_registered: '',
                    legal_entity_credit_institution: '',
                    legal_entry_name: '',
                    related_legal_entity: '',
                    descriptions_of_business: '',
                    economic_activity: '',
                    source_of_fund: '',
                    main_partners: '',
                    usual_payment_methods: '',
                    place_of_business: "",
                    legal_entry_organizations_form: '',
                    existing_client_account: '',
                    purpose_of_accounts_opening: '',
                    annual_turnover: '',
                    beneficiaries: '',
                    applicant_status: '',
                    corporate_registrations: null,
                    documents_confirm_applicant: null
                }
            }
        },
        computed: {
            ...mapState({
                businessData: state => state.data
            })
        },
        methods: {
            ...mapActions(['submitCorpVerification']),
            submit(ref) {
                let self = this
                this.$refs[ref].validate((valid, error) => {
                    if (valid) {
                        const formData = new FormData()
                        for (let key in this.form) {
                            formData.append(key, this.form[key])
                        }
                        this.loading = true
                        this.submitCorpVerification(formData).finally(() => {
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
