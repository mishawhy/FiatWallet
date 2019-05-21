<template>
  <div>
    <h4 class="title bold">Balances</h4>
    <el-row class="flex-row" type="flex" :gutter="15">
      <el-col :xs="24" :sm="12">
        <div :class="['root', 'shadow']">
          <div class="body">
            <div class="content" :style="{ background: '#fff' }">
              <div class="account-header">
                <div class="account-header-title">
                  US Dollars
                </div>
              </div>
              <div class="balance-value">
                <span class="value">{{ balance.usd | money }}</span>
                <span class="currency uppercase">USD</span>
              </div>
              <el-row
                class="flex-row"
                type="flex"
                :gutter="15"
                style="margin-top:30px"
              >
                <el-col :xs="12" :sm="12">
                  <el-button
                    class="button"
                    icon="el-icon-upload2"
                    type="primary"
                    @click="sendAction('USD')"
                  >
                    Send
                  </el-button>
                </el-col>
                <el-col :xs="12" :sm="12">
                  <el-button
                    icon="el-icon-download"
                    size="small"
                    class="button"
                    type="primary"
                    @click="receiveAction('USD')"
                  >
                    Receive
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12">
        <div :class="['root', 'shadow']">
          <div class="body">
            <div class="content" :style="{ background: '#fff' }">
              <div class="account-header">
                <div class="account-header-title">
                  Euro
                </div>
              </div>
              <div class="balance-value">
                <span class="value">{{ balance.euro | money }}</span>
                <span class="currency uppercase">EURO</span>
              </div>
              <el-row
                class="flex-row"
                type="flex"
                :gutter="15"
                style="margin-top:30px"
              >
                <el-col :xs="12" :sm="12">
                  <el-button
                    class="button"
                    icon="el-icon-upload2"
                    type="primary"
                    @click="sendAction('EURO')"
                  >
                    Send
                  </el-button>
                </el-col>
                <el-col :xs="12" :sm="12">
                  <el-button
                    icon="el-icon-download"
                    size="small"
                    class="button"
                    type="primary"
                    @click="receiveAction('EURO')"
                  >
                    Receive
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
      <el-dialog
          class="module-dialog"
          :visible.sync="send.visible"
          fullscreen="true">
          <VSend :currency="send.currency" />
      </el-dialog>
      <el-dialog
          class="module-dialog"
          :visible.sync="receive.visible"
          fullscreen="true">
          <VReceipt :currency="receive.currency" />
      </el-dialog>
  </div>
</template>
<script>
import TextMixin from '@/mixins/text'
import VSend from '@/modules/Send'
import VReceipt from '@/modules/Receipt'
import VueElementLoading from 'vue-element-loading'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('balance')

export default {
  name: 'VBalance',
  data: function () {
    return {
      loading: false,
      data: [],
      send: {
        visible: false,
        currency: null
      },
      receive: {
        currency: null,
        visible: false
      },
      /* eslint-disable-next-line */
      loaderColor: VUE_APP_MAIN_COLOR,
      usdBalance: 110000,
      euroBalance: 2003033
    }
  },
  computed: {
    ...mapState(['balance'])
  },
  methods: {
    ...mapActions(['getBalance']),
    receiveAction (currency) {
      this.receive.currency = currency
      this.receive.visible = true
    },
    sendAction (currency) {
      this.send.currency = currency
      this.send.visible = true
    }
  },
  async mounted () {
    await this.getBalance()
  },
  components: {
    VueElementLoading,
    VSend,
    VReceipt
  },
  mixins: [TextMixin]
}
</script>

<style lang="scss" scoped>
.root {
    background: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
    height: 100%;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0
    }
}
.body {
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
        flex-grow: 2;
        padding: 20px 20px 20px;
        box-sizing: border-box;
    }
}

h4.title {
    font-size: 22px;
    color: inherit;
    margin-bottom: 40px !important
}

h2.title {
    font-size: 16px;
    color: #888;
    margin-bottom: 20px
}
.make-deposit {
    border: 0 !important
}
.header-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px
}
.refresh {
    padding: 0 !important;
    color: white !important;
    font-size: 17px;
    opacity: 0.6;
    &:hover {
        opacity: 1
    }
    & i {
        vertical-align: top;
        font-size: 28px
    }
    a {
        color: #fff
    }
}
</style>
