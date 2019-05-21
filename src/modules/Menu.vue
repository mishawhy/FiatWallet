<template>
    <el-menu default-active="2" class="sidebar-menu">
        <VSidebarHeader />
        <router-link
            :class="['menu-link', { 'side-bar-menu-open': route.name === item.name }]"
            v-for="(item, index) in menu"
            v-if="(item.onlyNonVerified && !isVerified) || !item.onlyNonVerified"
            :key="item.name"
            :to="{
              name: item.name
            }"
            exact
            >
            <el-menu-item :index="`${index+1}-1`">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </router-link>
    </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import { MENU, ISSUER_MENU } from '@/constant/menus'

import VSidebarHeader from '@/components/SidebarHeader'
export default {
  name: 'Menu',
  data: function () {
    return {
      publicMenu: MENU,
      issuerMenu: ISSUER_MENU
    }
  },
  components: {
    VSidebarHeader
  },
  computed: {
    ...mapState({
      route: state => state.route,
      isProvider: state => state.enter.isProvider,
      isIssuer: state => state.enter.isIssuer,
      isVerified: state => state.enter.isVerified
    }),
    menu: function () {
      if (this.isProvider) return this.issuerMenu
      if (this.isIssuer) return this.issuerMenu
      return this.publicMenu
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
    position: fixed;
    width: 250px;
    border-right: 0;
    height: 100%;
    .menu-sub-title {
        text-transform: uppercase;
        margin: 30px;
        display: block;
        color: black;
        font-weight: 700;
        letter-spacing: 2px;
        font-size: 12px;
    }
    .side-bar-menu-open {
        background-color: #f9f9f9;
        color: black !important;
        font-weight: 700 !important;
        i {
            color: $--color-primary !important
        }
    }
    .menu-link {
        margin: 20px;
        line-height: 48px;
        font-size: 14px;
        display: block;
        color: #777;
        font-weight: 600;
        &:hover {
            background-color: #f9f9f9;
            color: black
        }
        i {
            margin-right: 15px
        }
    }
}
</style>
