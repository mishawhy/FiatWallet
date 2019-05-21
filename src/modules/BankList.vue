<template>
    <VBody class="bank-list">
      <div slot="content" class="address-info">
        <el-row :gutter="15" class="passport-data" type="flex" wrap>
          <el-col :xs="24" class="currency">
              <el-radio v-model="currency" label="USD" border class="change-btn"
                >USD</el-radio
              >
              <el-radio
                v-model="currency"
                label="EURO"
                border
                class="change-btn"
                >EURO</el-radio
              >
          </el-col>

            <el-col :xs="24">
              <el-row :gutter="15" class="passport-data" type="flex" wrap>
                <el-col :xs="24" :sm="12">
                  <label>Beneficiary bank</label>
                  <el-button
                    plain
                    class="eth-address-btn"
                    v-clipboard:copy="banks[currency].ben_bank || ''"
                    v-clipboard:success="copySuccess"
                  >
                    {{ banks[currency].ben_bank }}
                  </el-button>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <label>Beneficiary bank address</label>
                  <el-button
                    plain
                    class="eth-address-btn"
                    v-clipboard:copy="banks[currency].ben_bank_address || ''"
                    v-clipboard:success="copySuccess"
                  >
                    {{ banks[currency].ben_bank_address }}
                  </el-button>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <label>Beneficiary bank SWIFT</label>
                  <el-button
                    plain
                    class="eth-address-btn"
                    v-clipboard:copy="banks[currency].ben_bank_swift || ''"
                    v-clipboard:success="copySuccess"
                  >
                    {{ banks[currency].ben_bank_swift }}
                  </el-button>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <label>Beneficiary name</label>
                  <el-button
                    plain
                    class="eth-address-btn"
                    v-clipboard:copy="banks[currency].ben_name || ''"
                    v-clipboard:success="copySuccess"
                  >
                    {{ banks[currency].ben_name }}
                  </el-button>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <label>Beneficiary account</label>
                  <el-button
                    plain
                    class="eth-address-btn"
                    v-clipboard:copy="banks[currency].ben_account || ''"
                    v-clipboard:success="copySuccess"
                  >
                    {{ banks[currency].ben_account }}
                  </el-button>
                </el-col>
                <el-col :xs="24" :sm="12">
                  <label>Beneficiary address</label>
                  <el-button
                    plain
                    class="eth-address-btn"
                    v-clipboard:copy="banks[currency].ben_address || ''"
                    v-clipboard:success="copySuccess"
                  >
                    {{ banks[currency].ben_address }}
                  </el-button>
                </el-col>
              </el-row>
            </el-col>
        </el-row>
      </div>
    </VBody>
</template>

<script>
import VProcessBox from '@/components/ProcessBox'
import VBody from '@/components/Body'
import TextMixin from '@/mixins/text'

export default {
  name: 'bank_list',
  props: {
    list: {
      type: Array
    }
  },
  watch: {
    list: async function () {
      await this.sortList()
    }
  },
  data: function () {
    return {
      currency: 'USD',
      banks: {
        USD: {},
        EURO: {}
      }
    }
  },
  async mounted () {
    await this.sortList()
  },
  methods: {
    copySuccess: function () {
      this.$message({
        message: 'Successfully copied',
        type: 'success'
      })
    },
    sortList: async function () {
      for (let bank of this.list) {
        if (bank.currency == 'USD') {
          console.log(bank)
          this.banks['USD'] = bank
        }
        if (bank.currency == 'EURO') {
          this.banks['EURO'] = bank
        }
      }
    }
  },
  mixins: [TextMixin],
  components: {
    VBody,
    VProcessBox
  }
}
</script>

<style lang="scss">
.bank-list  {
    .currency {
        display: flex;
        .change-btn {
            flex: 1;
        }
    }
    .title-block {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 0;
        margin-left: 5px;
        margin-top: 15px;
    }
    .el-col {
        margin-bottom: 15px;
    }
    .eth-address-btn {
      display: block;
      margin-top: 10px;
    }
}
</style>
