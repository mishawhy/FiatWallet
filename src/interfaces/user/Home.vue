<template>
  <div>
    <div class="tokens-actions">
      <div class="fiat-balance">
          <VFiatBalance />
      </div>

      <el-row class="flex-row" type="flex" :gutter="15">
        <el-col>
          <VUserTransactions />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import VFiatBalance from '@/modules/FiatBalance'
import VUserTransactions from '@/modules/Transactions/UserTransactions'

export default {
  name: 'Home',
  components: {
    VFiatBalance,
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
