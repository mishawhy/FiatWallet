<template>
  <div>
    <h4 class="title bold">Transactions</h4>
    <div class="filter">
        <div class="date-range">
          <el-date-picker
              v-model="filter"
              type="daterange"
              range-separator="-"
              start-placeholder="Start date"
              end-placeholder="End date">
          </el-date-picker>
        </div>
        <VExportCSV :type="type" :filter="filter" />
    </div>
    <el-row class="flex-row" type="flex" :gutter="15">
      <el-col>
        <div class="root shadow">
          <div class="body">
            <div class="content" :style="{ background: '#fff' }">
                <div v-loading="firstLoading" :class="[{'loading-panel': firstLoading}]">
                    <el-table :show-header="false" style="width: 100%;" :data="$R.propOr([], 'transactions', data)">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <div class="more">
                                    <div class="li-c">
                                        <small>Reference:</small>
                                        <p>{{ props.row.ref  }}</p>
                                    </div>
                                    <div class="li-c">
                                        <small>To:</small>
                                        <p>{{props.row.to_full}}</p>
                                    </div>
                                    <div class="li-c">
                                        <small>From:</small>
                                        <p>{{props.row.from_full}}</p>
                                    </div>
                                    <div class="li-c">
                                        <small>TxHash:</small><br/>
                                        <a target="_blank" :href=props.row.hashUrl>{{ props.row.transactionHash }}</a>
                                    </div>
                                </div>
                            </template>


                        </el-table-column>
                        <el-table-column :min-width="32">
                            <template slot-scope="props" >
                                <el-row class="hot-fix-align">
                                <el-col :span="8" aling="center">
                                <el-button
                                        v-if="equals(props.row.type, ['received', 'deposit'])"
                                        type="success"
                                        icon="el-icon-download"
                                        circle
                                        plain
                                ></el-button>
                                <el-button
                                        v-else
                                        type="danger"
                                        icon="el-icon-upload2"
                                        circle
                                        plain
                                ></el-button>
                                    </el-col>
                                    <el-col :span="16" aling="center">
                                <div>
                                    <span class="action">{{ props.row.type }}</span>
                                    <span class="time">{{ props.row.date | time("DD MMM YYYY, hh:mm")}}</span>
                                </div>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column :min-width="43"  prop="type">
                            <template slot-scope="props" >
                            <el-row>
                                <el-col :span="10" >
                                    <p class="tx-txt">{{props.row.from}}</p>
                                </el-col>
                                <el-col :span="4" class="tx-icon">
                                    <i class="el-icon-back"></i>
                                </el-col>
                                <el-col :span="10" >
                                    <p class="tx-txt">{{props.row.to}}</p>
                                </el-col>
                            </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column :min-width="25"  prop="type">
                            <template slot-scope="props" >
                                <el-row>
                            <el-col :span="24" align="right">
                            <span v-if="equals( props.row.type, ['received', 'deposit'])" class="amount success">
                                + {{ props.row.value | money }} {{  props.row.currency }}
                            </span>
                                <span v-else class="amount error">- {{ props.row.value | money }} {{ props.row.currency }}</span>
                                <span class="fee">Fees: {{ props.row.fee | money }} {{ props.row.currency }}</span>
                            </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div
                    v-if="!loading &&
                        !firstLoading &&
                        !$R.length($R.propOr([], 'transactions', data))>0"
                    class="load-more">
                    No transactions
                </div>
                <div v-if="!firstLoading && $R.prop('more', data)" class="load-more">
                    <el-button @click="loadMore" :loading="loading">Load more</el-button>
                </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
import { equals, any, nth } from 'ramda'
import VExportCSV from '@/components/ExportCSV'
import VUser from '@/components/User'
import TextMixin from '@/mixins/text'
import TimeMixin from '@/mixins/time'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('transactions')

export default {
  name: 'IssuerTransactions',
  props: {
    type: String
  },
  data: function () {
    return {
      loading: false,
      firstLoading: false,
      filter: ['2019-01-01', moment().format('YYYY-MM-DD')]
    }

  },
  computed: {
    ...mapState(['data'])
  },
  mounted () {
    this.initialLoading()
  },
  methods: {
    ...mapActions(['getIssuerTransactions', 'getBalance']),
    equals (action, statuses) {
      return any(equals(action), statuses)
    },
    initialLoading: async function () {
      this.firstLoading = true
      await this.getIssuerTransactions({
        filter: {
          type: this.type
        }
      })
      this.firstLoading = false
    },
    loadMore: async function (filter) {
      this.loading = true
      await this.getIssuerTransactions({
        more: true,
        filter: {
          ...filter,
          type: this.type
        }
      })
      this.loading = false
    }
  },
  watch: {
    filter: async function (date) {
      let filter = {
        type: this.type
      }
      this.firstLoading = true
      if (date) {
        filter = {
          ...filter,
          fromDate: moment(nth(0, date)).utc().format('YYYY-MM-DD'),
          toDate: moment(nth(1, date)).utc().format('YYYY-MM-DD'),
        }
      }
      await this.getIssuerTransactions({
        more: false,
        filter
      })
      this.firstLoading = false
    }
  },
  mixins: [TextMixin, TimeMixin],
  components: {
    VUser,
    VExportCSV
  }
}
</script>

<style lang="scss">
    .tx-row {
        border-bottom: 1px solid #e9e9e9;
        padding: 20px 15px;
        span {
            line-height: 1.4;
        }
        &:last-child {
            border-bottom: 0;
        }
    }
    .amount {
        margin-top: 3px;
        font-weight: 500;
        display: block;
        font-size: 16px;
        color: #333;
    }
    .action {
        margin-top: 3px;
        font-weight: 600;
        color: #303133;
        display: block;
        font-size: 14px;
        &:first-letter {
            text-transform: uppercase;
        }
    }
    .time {
        margin-top: 2px;
        font-weight: 400;
        color: #666;
        display: block;
        font-size: 14px;
    }
    .root {
        background: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        overflow: hidden;
        height: 100%;
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .body {
        display: flex;
        flex-direction: column;
        .content {
            flex-grow: 2;
            padding: 0;
        }
    }

    .tx-txt {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }

    .tx-icon {
        text-align: center;
        color: #666;
        transform: rotate(180deg);
    }
    .hot-fix-align {
        display: flex;
        align-items: center;
    }

    .li-c {
        margin-top: 10px;
        padding: 10px 4px;
        border-bottom: 1px solid #ddd;
        small{
            font-size: 14px;

            font-weight: bold;
            color: #303133;
        }
        p, a {
            font-size: 14px;
            display: block;
            margin-top: 10px;
        }
    }
    .li-c:last-child {
        border-bottom: none;
    }
</style>
