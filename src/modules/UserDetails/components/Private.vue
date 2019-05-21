<template>
    <div class="content passport-detail" style="margin-top: 10px; padding-top:10px; border-top: 1px solid #e9e9e9;">
        <el-row :gutter="15" class="passport-data" type="flex" wrap>
            <el-col :xs="24" :sm="12">
                <label>Expected annual turnover</label>
                <h4>{{ private.annual_turnover}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Applicant's status</label>
                <h4>{{ private.applicant_status}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Description of business</label>
                <h4>{{ private.description_of_business}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Type of economic activity</label>
                <h4>{{ private.economic_activity}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Existing Client accounts</label>
                <h4>{{ private.existing_client_accounts}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Main partners (incl. countries)</label>
                <h4>{{ private.main_partners}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Politically exposed person (PEP) or affiliated to PEP</label>
                <h4>{{ private.politically_exposed}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Purpose of account opening</label>
                <h4>{{ private.purpose_account_opening}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Source of funds</label>
                <h4>{{ private.source_of_funds}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Usual payment methods</label>
                <h4>{{ private.usual_payment_methods}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <el-button plain icon="el-icon-document" @click="open_doc()"
                           >Document
                </el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        props: {
            private: {
                type: Object,
                required: true
            }
        },
        name: "Private",
        methods: {
            open_doc: function () {
                window.open(this.private.documents, "_blank");
            }
        }
    }
</script>

<style scoped>

</style>