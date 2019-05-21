<template>
    <div>
        <VUserTransactions :address="detail.address"/>
    </div>
</template>

<script>
    import VUserTransactions from './../../Transactions/UserTransactions';

    export default {
        name: 'UserTransactions',
        props: {
            detail: {
                type: Object,
                required: true
            }
        },
        components: {
            VUserTransactions
        }
    }
</script>

<style scoped>

</style>
