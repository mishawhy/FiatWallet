<template>
  <el-row type="flex" justify="space-between" align="left" class="board-header">
      <el-col class="side-bar-block">
 <el-button type="text" @click="refresh" icon="el-icon-refresh">Reload</el-button>
          <!-- <VNotificationButton /> -->
      </el-col>
      <el-col class="logo-container">
          <VUserAccount :userData="user" />
          <el-button class="logout" type="text" @click="logout"><i class="fas fa-sign-out-alt"></i></el-button>
      </el-col>
  </el-row>
</template>

<script>
import TextMixin from '@/mixins/text'
import { mapState, createNamespacedHelpers } from 'vuex'
import VUserAccount from '@/components/UserAccount'
import VNotificationButton from '@/components/NotificationButton'
import * as Routes from '@/constant/routes'

const { mapActions } = createNamespacedHelpers('enter')

export default {
  name: 'Header',
  data: function () {
    return {
      ROUTES: Routes,
      user: {
        address: null,
        isProvider: null,
        isVerified: null,
        isOwner: null,
        name: null
      }
    }
  },
  computed: {
    ...mapState({
      address: state => state.enter.address,
      isProvider: state => state.enter.isProvider,
      isVerified: state => state.enter.isVerified,
      isOwner: state => state.enter.isOwner,
      balance: state => state.enter.balance,
      businessName: state => state.enter.passport
    })
  },

  mounted () {
    this.user = {
      isProvider: this.isProvider,
      isVerified: true,
      isOwner: this.isOwner,
      balance: this.balance,
      address: this.address,
      name: this.businessName
    }
  },
  methods: {
    ...mapActions(['logout']),
    refresh(){
      this.$router.go()
    }
  },
  mixins: [TextMixin],
  components: {
    VNotificationButton,
    VUserAccount
  }
}
</script>

<style lang="scss">
.board-header {
    .side-bar-block {
        flex-basis: 400px;
        flex-shrink: 0
    }
    .logo-container {
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .logout {
        margin-left: 15px;
        font-size: 22px;
    }
}
</style>
