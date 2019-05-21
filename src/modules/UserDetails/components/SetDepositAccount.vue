<template>
    <VSetDepositBankAccount :passportData="detail" />
</template>

<script>
import VSetDepositBankAccount from '@/modules/SetDepositBankAccount'

export default {
  name: 'IssueTokens',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  components: {
    VSetDepositBankAccount
  }
}
</script>

<style lang="scss" scoped>
</style>
