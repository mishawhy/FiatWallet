<template>
    <VBody v-loading="loading">
        <div slot="content" class="set-deposit-bank">
            <el-form
                :show-message="false"
                @submit.prevent.native
                ref="sendTokenForm"
                :model="form">
                <h4 class="currency bold">EURO</h4>
                <el-form-item>
                    <el-select v-model="form.euro" filterable>
                        <el-option
                            v-for="bank in euroBankAccounts"
                            :label="`${bank.ben_bank}: ${bank.ben_account}`"
                            :key="bank.id"
                            :value="bank.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <hr class="divider" />
                <h4 class="currency bold">USD</h4>
                <el-form-item>
                    <el-select v-model="form.usd" filterable>
                        <el-option
                            v-for="bank in usdBankAccounts"
                            :label="`${bank.ben_bank}: ${bank.ben_account}`"
                            :key="bank.id"
                            :value="bank.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button
                    :disabled="loading"
                    class="button"
                    type="primary"
                    @click="saveChange">
                    Save change
                </el-button>
            </el-form>
        </div>
    </VBody>
</template>

<script>
import { pathOr, filter, compose, prop, defaultTo, propEq, find } from 'ramda'
import VBody from '@/components/Body'

const getId = (currency) => compose(
  prop('id'),
  defaultTo({}),
  find(propEq('currency', currency))
)

export default {
  name: 'SetDepositBankAccount',
  props: {
    passportData: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      loading: false,
      banks: [],
      form: {
        usd: '',
        euro: ''
      }
    }
  },
  mounted () {
    this.getDeposits()
  },
  methods: {
    getDeposits: async function () {
      this.loading = true
      try {
        const banks = await this.$http.get('bank/deposit')
        this.banks = pathOr([], ['body', 'results'], banks)
        const userDeposit = await this.$http.get('bank/user_deposit', {
          params: {
            id: this.passportData.id
          }
        })
        const list = pathOr([], ['body', 'results'], userDeposit)
        this.form = {
          usd: getId('USD')(list),
          euro: getId('EURO')(list)
        }
      } catch (e) {}
      this.loading = false
    },
    async saveChange () {
      let error = false
      const userId = this.passportData.id
      const usd = this.form.usd
      const euro = this.form.euro
      this.loading = true
      try {
        await this.$http.post('bank/deposit_set', {
          deposit_id: usd,
          user_id: userId
        })
        await this.$http.post('bank/deposit_set', {
          deposit_id: euro,
          user_id: userId
        })
      } catch (e) {
        error = true
      } finally {
        if (error) {
          this.$message({
            message: 'Something goes wrong',
            type: 'error'
          })
        } else {
          this.$message({
            message: 'Successfully changed',
            type: 'success'
          })
        }
      }
      this.loading = false
    }
  },
  computed: {
    euroBankAccounts: function () {
      return filter(item => item.currency === 'EURO', this.banks)
    },
    usdBankAccounts: function () {
      return filter(item => item.currency === 'USD', this.banks)
    }
  },
  components: {
    VBody
  }
}
</script>

<style lang="scss" scoped>
    .set-deposit-bank {
        .currency {
            font-size: 17px;
            margin-bottom: 10px;
        }
        .divider {
            margin: 32px 0 25px;
            display: block;
            height: 1px;
            background: #ddd;
            border: none;
        }
    }
</style>
