<template>
    <div>
        <VBalance />
        <div class="tokens-actions">
            <el-row class="flex-row" type="flex" :gutter="15">
                <el-col :xs="24" :sm="12">
                    <VSendTokens />
                </el-col>
                <el-col :xs="24" :sm="12">
                    <VUnlockTokens />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import VSendTokens from '@/modules/token/SendTokens'
import VUnlockTokens from '@/modules/token/UnlockTokens'
import VBalance from '@/modules/analytics/Balance'

export default {
  name: 'Send',
  components: {
    VBalance,
    VSendTokens,
    VUnlockTokens
  }
}
</script>

<style lang="scss">
    .tokens-actions {
        margin-bottom: 20px
    }
    .transactions-list {
        min-height: 400px
    }
</style>
