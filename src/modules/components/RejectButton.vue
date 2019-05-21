<template>
  <el-popover
  placement="left"
  width="160"
  v-model="visible2">
  <p>Are you sure to reject user application?</p>
  <div style="text-align: right; margin: 0; margin-top: 10px">

    <el-button type="danger" size="middle"  @click="reject(address)">Reject application</el-button>
  </div>
  <el-button :loading="loading" type="danger" slot="reference" icon="el-icon-close" circle plain></el-button>
</el-popover>

</template>

<script>
export default {
  name: 'RejectButton',
  props: {
    address: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      visible2: false,
      loading: false
    }
  },
  methods: {
    reject: async function (address) {
      this.loading = true
      await this.$store.dispatch(`users/rejectPass`, {
        address
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
