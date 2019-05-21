<template>
    <div class="content passport-detail" style="margin-top: 10px; padding-top:10px; border-top: 1px solid #e9e9e9;">
        <el-row :gutter="15" class="passport-data" type="flex" wrap>
            <el-col :xs="24" :sm="12">
                <label>Legal entry name</label>
                <h4>{{ corp.legal_entry_name}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Legal entry organizations form</label>
                <h4>{{ corp.legal_entry_organizations_form}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Place of business</label>
                <h4>{{ corp.place_of_business}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Registered address</label>
                <h4>{{ corp.registered_address}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Registrations no</label>
                <h4>{{ corp.registrations_no}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Date of registrations</label>
                <h4>{{ corp.date_of_registrations}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Expected annual turnover</label>
                <h4>{{ corp.annual_turnover}}</h4>
            </el-col>


            <el-col :xs="24" :sm="12">
                <label>Directors</label>
                <h4>{{ corp.directors}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Phone</label>
                <h4>{{ corp.phone}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Email</label>
                <h4>{{ corp.email}}</h4>
            </el-col>


            <el-col :xs="24" :sm="12">
                <label>Legal entity registered</label>
                <h4>{{ corp.legal_entity_registered}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Legal entity credit institution</label>
                <h4>{{ corp.legal_entity_credit_institution}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Related legal entity</label>
                <h4>{{ corp.related_legal_entity}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Descriptions of business</label>
                <h4>{{ corp.descriptions_of_business}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Economic activity</label>
                <h4>{{ corp.economic_activity}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Source of fund</label>
                <h4>{{ corp.source_of_fund}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Main partners</label>
                <h4>{{ corp.main_partners}}</h4>
            </el-col>


            <el-col :xs="24" :sm="12">
                <label>Usual payment methods</label>
                <h4>{{ corp.usual_payment_methods}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Existing client account</label>
                <h4>{{ corp.existing_client_account}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Purpose of accounts opening</label>
                <h4>{{ corp.purpose_of_accounts_opening}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Beneficiaries</label>
                <h4>{{ corp.beneficiaries}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Applicant status</label>
                <h4>{{ corp.applicant_status}}</h4>
            </el-col>

            <el-button plain icon="el-icon-document" @click="open_doc(corp.documents_confirm)">
                Documents
            </el-button>
            <el-button plain icon="el-icon-document" @click="open_doc(corp.documents_confirm_applicant)">
                Confirm applicant
            </el-button>

            <el-button plain icon="el-icon-document" @click="open_doc(corp.corporate_registrations)">
                Corporate registrations
            </el-button>
        </el-row>

    </div>
</template>

<script>
    export default {
        props: {
            corp: {
                type: Object,
                required: true
            }
        },
        name: "Corp",
        methods: {
            open_doc: function (url) {
                window.open(url, "_blank");
            }
        }
    }
</script>


<!--"beneficiaries",-->
<!--"applicant_status",-->
<!--"corporate_registrations",-->
<!--"documents_confirm_applicant"-->

<style scoped>

</style><!--"documents_confirm",-->