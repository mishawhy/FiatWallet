<template>
  <div>
    <div class="tokens-actions">
      <div class="fiat-balance">
          <VFiatIssuerBalance />
      </div>

      <el-row class="flex-row" type="flex" :gutter="15">
        <el-col>
          <VIssuerTransactions type="withdraw" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import VFiatIssuerBalance from '@/modules/FiatIssuerBalance'
import VIssuerTransactions from '@/modules/Transactions/IssuerTransactions'

export default {
  name: 'Trahsactions',
  components: {
    VFiatIssuerBalance,
    VIssuerTransactions
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
