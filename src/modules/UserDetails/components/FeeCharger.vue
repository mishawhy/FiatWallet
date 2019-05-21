<template>
    <VFeesCharger :address="detail.address" :passportId="detail.uq"/>
</template>

<script>
import VFeesCharger from '@/modules/FeesCharger'

export default {
  name: 'IssueTokens',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
    mounted:function() {
      console.log(this.detail.uq, this.detail.address)
    },
  components: {
    VFeesCharger
  }
}
</script>

<style lang="scss" scoped>
</style>
