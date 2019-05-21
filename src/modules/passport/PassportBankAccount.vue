<template>
    <div class="passport-edit">
        <div class="header">
            <div class="title">
                <h5>Bank accounts</h5>
                <span>Edit general settings in your passport</span>
            </div>
            <div class="action">
                <el-button @click="create" type="primary" class="add">Add bank account</el-button>
            </div>
        </div>
        <div v-loading="loading" class="account-list">
            <div v-for="bank in data" :key="bank.id" class="content">
                <div class="title">
                    <h5>{{ bank.currency }} - {{ bank.ben_name }}</h5>
                    <span>Account: {{ bank.ben_account }}</span>
                </div>
                <div v-if="bank.active" class="default">
                    <el-tag>Withdraw</el-tag>
                </div>
                <div class="action">
                    <el-button @click="edit(bank)" plain>Edit bank account</el-button>
                </div>
            </div>

        </div>
        <el-dialog
            class="module-dialog"
            v-if="editDialog.visible"
              :close-on-click-modal="false"
            :visible.sync="editDialog.visible">
            <VBankAccountEdit v-on:close="closeEdit" :data="editDialog.data" />
        </el-dialog>
        <el-dialog
            class="module-dialog"
            v-if="createDialog.visible"
              :close-on-click-modal="false"
            :visible.sync="createDialog.visible">
            <VBankAccountCreate v-on:close="closeCreate" />
        </el-dialog>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import VBankAccountEdit from './components/BankAccount/BankAccountEdit'
import VBankAccountCreate from './components/BankAccount/BankAccountCreate'

const { mapActions, mapState } = createNamespacedHelpers('passport')

export default {
  name: 'PassportBankAccount',
  data: function () {
    return {
      loading: false,
      editDialog: {
        visible: false,
        data: null
      },
      createDialog: {
        visible: false
      }
    }
  },
  computed: {
    ...mapState(['data'])
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    ...mapActions(['getBankAccounts']),
    async loadData () {
      this.loading = true
      await this.getBankAccounts()
      this.loading = false
    },
    async closeCreate () {
      this.createDialog.visible = false
      this.loadData()
    },
    async closeEdit () {
      this.editDialog.visible = false
      this.loadData()
    },
    create () {
      this.createDialog.visible = true
    },
    edit (data) {
      this.editDialog.visible = true
      this.editDialog.data = data
    }
  },
  components: {
    VBankAccountEdit,
    VBankAccountCreate
  }
}
</script>

<style lang="scss">

</style>
