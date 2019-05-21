<template>
  <el-button :class="['verification-button', $R.prop('style', data)]" v-if="data !== null" @click="redirectTo(data.route)">
      <span class="bold">{{$R.prop('text', data)}}</span>
  </el-button>
</template>

<script>
import * as routes from '@/routes'
import { NOTIFICATION } from '@/constant/notifications'
import { mapState } from 'vuex'
export default {
  name: 'NotificationButton',
  data: function () {
    return {
      data: null
    }
  },
  computed: {
    ...mapState({
      notification: state => state.notification
    })
  },
  mounted () {
    // if (this.isVerified == false) {
    //   this.data = NOTIFICATION.verify;
    // }
    // if (this.isVerified && this.balance == 0) {
    this.data = NOTIFICATION.deposit
    // }
    // if (this.isVerified && this.balance > 0) {
    //   this.data = NOTIFICATION.buyTokens
    // }
  },
  methods: {
    redirectTo: function (route) {
      console.log(route)
      this.$router.push({
        name: routes[route]
      })
    }
  }
}
</script>

<style lang="sass">
.verification-button.active
    &:before
       color: #59ED72 !important
.verification-button.process
    &:before
       color: #FD9739 !important
.verification-button
    position: relative
    background: #FFFFFF
    white-space: normal
    max-width: 100%
    line-height: 18px
    text-align: left
    font-weight: 500 !important
    font-size: 14px !important
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.03)
    border: 0
    padding: 12px 50px 12px 35px
    &:hover
        &:after
            color: inherit
    &:after
        color: #C5C5C5
        content: '\2192'
        position: absolute
        right: 10px
        top: 47%
        transform: translateY(-52%)
        font-size: 25px
    &:before
        color: #FD9739
        content: '\2022'
        position: absolute
        left: 12px
        font-size: 30px
        top: 47%
        transform: translateY(-52%)
</style>
