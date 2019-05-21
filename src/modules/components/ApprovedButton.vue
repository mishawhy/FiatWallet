<template>
  <el-popover
  placement="left"
  width="160"
  v-model="visible2">
  <p>Are you sure to issue passport?</p>
  <div style="text-align: right; margin: 0; margin-top: 10px">

    <el-button type="primary" size="middle"  @click="approve()">Issue passport</el-button>
  </div>
  <el-button :loading="loading"
  :style="{
    marginRight: `10px`,
    marginBottom: `5px`
    }" type="primary" slot="reference" icon="el-icon-check" circle></el-button>
</el-popover>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('users')

export default {
  name: 'ApprovedButton',
  props: {
    address: {
      required: true,
      type: String
    },
    pass: {
      required: true
    },
    passtype: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      loading: false,
      visible2: false
    }
  },
  methods: {
    ...mapActions(['issuePass'])
    ,
    approve: async function () {
      console.log({
        address: this.address,
        pass: this.pass,
        type: this.passtype
      })
      this.visible2 = false
      this.loading = true
      const tx = await this.issuePass({
        to: this.address,
        pass: this.pass,
        type: this.passtype
      })
      console.log(tx)
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
