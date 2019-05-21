<template>
    <div class="issue-tokens">
        <VIssue :currency="issueCurrency" :address="detail.address" :isPassportDetails="true">
            <div class="currency">
                <el-radio v-model="issueCurrency" label="USD" border class="change-btn">USD</el-radio>
                <el-radio v-model="issueCurrency" label="EURO" border class="change-btn">EURO</el-radio>
            </div>
        </VIssue>
    </div>
</template>

<script>
import VIssue from '@/modules/Issue'

export default {
  name: 'IssueTokens',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      issueCurrency: 'USD'
    }
  },
  components: {
    VIssue
  }
}
</script>

<style lang="scss" scoped>
    .issue-tokens {
        background: #fff;
        .currency {
            padding: 0 0 20px;
            display: flex;
            .change-btn {
                flex: 1;
            }
        }
    }
</style>
