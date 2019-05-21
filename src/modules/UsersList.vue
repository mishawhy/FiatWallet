<template>
    <div>
        <div>
            <h4 class="bold title">Passports</h4>
        </div>
        <div class="content">
            <el-table
                    :data="users"
                    v-loading="loading"
                    class="users"
                    style="width: 100%">
                <el-table-column
                    width="250"
                    label="Name">

                    <template slot-scope="scope">
                        <div class="table-recipient">
                            {{ scope.row.first_name }} {{ scope.row.last_name }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                    label="Status"
                    prop="status"
                    width="150"
                    :filters="STATUS_FILTER"
                    :filter-method="statusChange"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <div class="table-recipient">
                            <el-tag type="success" v-if="scope.row.status === 'APPROVED'">Approved</el-tag>
                            <el-tag v-if="scope.row.status === 'WAIT'">Wait</el-tag>
                            <el-tag type="danger" v-if="scope.row.status === 'REJECT'">Reject</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Country"
                        width="120">
                    <template slot-scope="scope">
                        <div class="table-recipient">
                            <el-tooltip :content="getCountry(scope.row.country_of_residence)" placement="top">
                                <el-tag type="info">{{ scope.row.country_of_residence }}</el-tag>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column
                        label="Email"
                        width="240">
                    <template slot-scope="scope">
                        <div class="table-recipient">
                            <el-button plain icon="el-icon-message" v-clipboard:copy="scope.row.email || ''"
                                       v-clipboard:success="copySuccess">{{ scope.row.email }}
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                            class="search-input"
                            placeholder="Type to search"
                            prefix-icon="el-icon-search"
                            v-model="filter.search">
                        </el-input>
                    </template>
                    <template slot-scope="scope">
                        <div class="table-recipient">
                            <el-button class="detail" @click="detail(scope.row.id)" type="primary">Detail</el-button>
                            <VApprovedButton
                                :address="scope.row.address"
                                passtype="3"
                                :pass="scope.row.uq"
                                v-if="scope.row.status !== 'APPROVED'" />
                            <VRejectButton :address="scope.row.address" v-if="scope.row.status === 'WAIT'"  />
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-pagination">
                <el-pagination
                        v-if="total"
                        background
                        prev-text="Previous page"
                        next-text="Next page"
                        popper-class="table-pagination-inner"
                        layout="prev, pager, next"
                        :current-page.sync="page"
                        @current-change="pageChange"
                        :page-size="pagination.perPage"
                        :total="total">
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
import { prop, pathOr, propEq, find, propOr } from 'ramda'
import '@/plugins/vue-rx'
import { debounceTime } from 'rxjs/operators'
import { createNamespacedHelpers } from 'vuex'
import TextMixin from '@/mixins/text'
import HelperMixin from '@/mixins/helpers'
import VBody from '@/components/Body'
import InjectDom from '@/components/InjectDom'
import VApprovedButton from './components/ApprovedButton'
import VRejectButton from './components/RejectButton'
import VUser from '@/components/User'
import * as ROUTES from '@/constant/routes'

const { mapState, mapActions } = createNamespacedHelpers('users')

const STATUS_FILTER = [
  {
    text: 'Approved',
    value: 'APPROVED'
  },
  {
    text: 'Wait',
    value: 'WAIT'
  },
  {
    text: 'Reject',
    value: 'REJECT'
  }
]

export default {
  name: 'UsersList',
  data: function () {
    return {
      STATUS_FILTER,
      loading: false,
      countryList: require('@/constant/country-list.json'),
      pagination: {
        perPage: 30
      },
      filter: {
        status: pathOr('', ['query', 'status'], this.$route),
        address: pathOr('', ['query', 'address'], this.$route),
        search: pathOr('', ['query', 'search'], this.$route)
      }
    }
  },
  mixins: [TextMixin, HelperMixin],
  mounted () {
    this.getUsers()
    this.watchFilter()
  },
  methods: {
    ...mapActions(['getUsersList']),
    watchFilter () {
      this.$watchAsObservable('filter', { deep: true }).pipe(debounceTime(500)).subscribe(
        () => {
          let filter = this.omitEmpty(this.filter)
          this.$router.push({
            query: filter
          })
        }
      )
    },
    copySuccess: function () {
      this.$message({
        message: 'Email successfully copied',
        type: 'success'
      })
    },
    detail (id) {
      this.$router.push({
        name: ROUTES.USER_DETAIL,
        params: {
          id
        }
      })
    },
    statusChange: function (status, row, column) {
      this.filter.status = status
      const property = column['property']
      return row[property] === status
    },
    getUserData: function (user) {
      return {
        address: user.address,
        isVerified: user.status === 'APPROVED',
        name: user.business_name,
        isProvider: false
      }
    },
    getCountry: function (code) {
      if (!code) return 'None'
      const country = find(propEq('code', code), this.countryList)
      return propOr('None', 'name', country)
    },
    pageChange: function (page) {
      let oldQuery = this.$route.query
      this.$router.push({
        query: {
          ...oldQuery,
          page
        }
      })
    },
    getUsers: async function () {
      this.loading = true
      let filter = this.omitEmpty({
        status: prop('status', this.$route.query),
        address: prop('address', this.$route.query),
        search: prop('search', this.$route.query),
        page: prop('page', this.$route.query)
      })
      await this.getUsersList(filter)
      this.loading = false
    }
  },
  computed: {
    ...mapState(['usersList']),
    total () {
      return pathOr(0, ['body', 'count'], this.usersList)
    },
    users () {
      return pathOr([], ['body', 'results'], this.usersList)
    },
    page: {
      get () {
        return parseInt(pathOr(1, ['query', 'page'], this.$route))
      },
      set (value) {}
    }
  },
  watch: {
    $route (to, from) {
      this.getUsers()
    }
  },
  components: {
    VBody,
    VUser,
    VApprovedButton,
    VRejectButton,
    InjectDom
  }
}
</script>

<style lang="scss">
    .content {
        width: 100%;
    }
    .search-input  {
        margin-top: 5px;
        .el-input__inner {
            font-size: 14px;
            padding: 18px 15px 18px 40px
        }
        .el-input__prefix {
            font-size: 19px;
            padding-left: 13px;
        }
    }
    .detail {
        margin: 0 10px
    }
    .document {
        max-width: 100%;
        max-height: 300px;
        overflow: hidden;
        margin-bottom: 7px;
        .users {
            color: #000;
            line-height: 1.7;
            .icon-type {
                font-size: 30px;
                color: $--color-primary
            }
            .table-amount {
                font-size: 28px;
                font-weight: bold;
                .amount {
                    margin-right: 5px
                }
            }
            .table-fees {
                font-size: 15px;
                .fees {
                    margin-right: 5px
                }
            }
            .table-recipient {
                .name {
                    font-weight: bold;
                    font-size: 18px;
                }
            }
            .table-reference {
                .text {
                    font-size: 15px;
                    color: #000;
                }
            }
            .table-transaction-id {
                .date {
                    font-size: 23px;
                    color: #000
                }
                .id {
                    font-size: 17px;
                    font-weight: bold;
                    span {
                        margin-right: 5px
                    }
                }
            }
            .transactions-list {
                min-height: 200px
            }
            .user-status.approved {
                background-color: rgba(132, 255, 200, 0.13);
                &:after {
                    color: #69E695;
                }
            }
            .user-status.reject {
                background-color: rgba(255, 140, 116, 0.24);
                &:after {
                    color: #d27171
                }
            }
            .user-status.wait {
                background-color: rgba(253, 151, 57, 0.31);
                &:after {
                    color: #FD9739
                }
            }
            .user-status {
                margin-left: 10px;
                font-size: 8px;
                padding: 3px 3px 3px 10px;
                position: relative;
                color: #79826D;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                display: inline-block;
                &:after {
                    position: absolute;
                    content: '\2022';
                    left: 4px;
                    font-size: 12px;
                    top: 48%;
                    transform: translateY(-52%);
                }
            }
        }
    }

</style>
