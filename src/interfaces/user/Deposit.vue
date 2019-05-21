<template>
  <div>
    <div class="tokens-actions">
      <div class="fiat-balance">
          <VFiatDepositBalance />
      </div>

      <el-row class="flex-row" type="flex" :gutter="15">
        <el-col>
          <VUserTransactions type="deposit-withdraw"  />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import VFiatDepositBalance from '@/modules/FiatDepositBalance'
import VUserTransactions from '@/modules/Transactions/UserTransactions'

export default {
  name: 'Home',
  components: {
    VFiatDepositBalance,
    VUserTransactions
  }
}
</script>

<style lang="scss">
.tokens-actions {
    margin-bottom: 20px;
    .fiat-balance {
      margin-bottom: 40px
    }
}
</style>
