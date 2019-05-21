<template>
    <div class="mobile-menu" v-if="!isProvider">
        <div class="mobile-menu-items">
            <ul>
                <router-link
                    :class="['menu-link', { 'side-bar-menu-open': route.name === item.name }]"
                    v-for="item in menu"
                    tag="li"
                    :key="item.name"
                    :to="{
                        name: item.name
                    }" exact>
                    <a :title="item.title"><i :class="item.icon"></i></a>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { MENU } from '@/constant/menus'

export default {
  name: 'Menu',
  data: function () {
    return {
      menu: MENU
    }
  },
  computed: {
    ...mapState(['route']),
    ...mapState({
      isProvider: state => state.passport.isProvider
    })
  }
}
</script>

<style lang="scss" scoped>
    .mobile-menu {
        display: none;
        background: #ffffff;
        border-top: 1px solid #E5E5E5;
        padding: 5px 20px;
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 1;
    }
    .side-bar-menu-open > a {
        color: $--color-primary !important;
        .icon {
            color: $--color-primary !important
        }
    }
    .menu-link a {
        line-height: 2.3;
        font-weight: bold;
        color: #565656;
        &:hover {
            color: $--color-primary !important
        }
    }
    .mobile-menu-items {
        line-height: 1.3;
        & ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & li {
                text-align: center;
                display: inline-block;
            }
        }
        i {
            vertical-align: middle
        }
        .menu-link {
            .icon {
                width: 30px;
                font-size: 18px !important;
                display: inline-block;
            }
        }
    }

</style>
