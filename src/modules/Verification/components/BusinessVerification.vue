<template>
    <component :is="form" />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { path } from 'ramda'
import VPrivate from './BusinessVerificationForm/Corporate'
import VCorporate from './BusinessVerificationForm/Private'

const { mapState } = createNamespacedHelpers('verification')

export default {
  name: 'BusinessVerification',
  computed: {
    ...mapState({
      businessData: state => state.data
    }),
    form () {
      const accountType = path(['businessData', 'account_type'], this)
      if (accountType === 'PRIVATE') return 'VPrivate'
      return 'VCorporate'
    }
  },
  components: {
    VPrivate,
    VCorporate
  }
}
</script>

<style scoped>

</style>
