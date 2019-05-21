<template>
    <div>
        <h4 class="title bold">Edit passport</h4>
        <div class="filter">
            <div>
                <router-link
                    v-for="item in menu"
                    :key="item.name"
                    :to="{ name: item.name }"
                    exact>
                    <el-button
                        :class="['filter-button', 'transparent', { 'is-active': route.name === item.name }]"
                        type="text">
                        {{ item.title }}
                    </el-button>
                </router-link>
            </div>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import * as ROUTE from '@/constant/routes'

const MENU = [
  {
    title: 'General',
    name: ROUTE.PASSPORT_GENERAL
  },
  {
    title: 'Bank accounts',
    name: ROUTE.PASSPORT_BANK_ACCOUNT
  }
]

export default {
  name: 'Index',
  data: function () {
    return {
      menu: MENU
    }
  },
  computed: {
    ...mapState({
      route: state => state.route
    })
  }
}
</script>

<style scoped>

</style>
