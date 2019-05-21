<template>
    <div>
        <div class="process-box wait" v-if="$R.prop('WAIT', status)">
            <div class="process-box-header">
                <div class="title bold">Wait</div>
            </div>
            <div class="process-box-content">
                Verification process usually takes 5 min but can take up to 24 hours.
                We will notify your results by email.
                Thank you for your participation!
            </div>
        </div>
        <div class="process-box done" v-if="$R.prop('APPROVED', status)">
            <div class="process-box-header">
                <div class="title bold">Receipt</div>
            </div>
            <div class="process-box-content">
                Please log in to wallet to continue your participation. Thank you!
            </div>
        </div>
        <div class="process-box failed" v-if="$R.prop('REJECT', status)">
            <div class="process-box-header">
                <div class="title bold">Error</div>
            </div>
            <div class="process-box-content">
                We sorry but we can’t verify your application this time.
                Please submit your application again.
                Don’t forget to upload quality photos and enter all information correctly.
                Thank you for your participation!
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'VerificationStatus',
  props: {
    status: {
      type: Object
    }
  }
}
</script>
<style lang="sass">

</style>
