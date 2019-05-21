<template>
    <div>
        <VOverviewTransactions />
        <div>
            <VTransactions />
        </div>
    </div>
</template>

<script>
import VBody from '@/components/Body'
import VOverviewTransactions from '@/modules/analytics/OverviewTransactions'
import VTransactions from '@/modules/crowdsale/Transactions'

export default {
  name: 'Users',
  components: {
    VBody,
    VTransactions,
    VOverviewTransactions
  }
}
</script>

<style lang="sass">

</style>
