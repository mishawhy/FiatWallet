<template>
  <div>
    <el-container style="height:100%">
      <VMobile />
      <el-container>
        <el-aside class="side-bar" width="250px">
          <VMenu />
        </el-aside>

        <el-container class="dashboard-content">

          <el-header>
            <VHeader />
          </el-header>

          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import VHeader from '@/modules/Header'
import VMenu from '@/modules/Menu'
import VMobile from '@/modules/MobileMenu'

export default {
  name: 'Dashboard',
  components: {
    VHeader,
    VMenu,
    VMobile
  }
}
</script>

<style lang="sass"></style>
