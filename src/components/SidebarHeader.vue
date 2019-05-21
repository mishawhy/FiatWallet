<template>
    <div class="sidebar-header">
      <div class="side-bar-logo" @click="redirectToHome">
        <div class="logo" :style="{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#fff'
        }"></div>
        <div class="title bold">
          <span>{{name}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import { LOGO, NAME } from '@/constant/general'
import * as routes from '@/constant/routes'
export default {
  name: 'SidebarHeader',
  data: function () {
    return {
      logo: LOGO,
      name: NAME
    }
  },
  methods: {
    redirectToHome: function () {
      this.$router.push({
        name: routes.ROOT
      })
    }
  }
}
</script>

<style lang="sass" scoped>
    .sidebar-header
        background-color: white
        margin-top: 15px
        margin-left: 15px
        .side-bar-logo
            display: flex
            cursor: pointer
    .title
        display: inline-block
        align-self: center
        color: #565656
        font-size: 20px
    .logo
        margin-right: 10px
        width: 40px
        height: 40px
        display: inline-block
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        border: 1px solid #f9f9f9
</style>
