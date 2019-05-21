<template>
    <div class="bank-accounts">
        <div v-if="$R.propOr([], 'bank_list', detail).length === 0">No bank accounts</div>
        <VBankList v-else :list="detail.bank_list" />
    </div>
</template>

<script>
import VBankList from '@/modules/BankList'

export default {
  name: 'BankAccounts',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  components: {
    VBankList
  }
}
</script>

<style lang="scss" scoped>
    .bank-accounts {
        background: #fff;
    }
</style>
