<template>
    <div class="export-csv">
        <el-button
            v-if="loadingCsvStep === 0"
            @click="loadCSV()"
            class="filter-button">Export CSV
        </el-button>
        <div
            v-else-if="loadingCsvStep === 1"
            v-loading="true"
            element-loading-background="rgba(0, 0, 0, 0)"
            class="csv-block-loader">
        </div>
        <el-progress
            v-else-if="loadingCsvStep === 2"
            type="circle" class="circle-progress" :percentage="percentageCsv" :width="48" :stroke-width="3"
        ></el-progress>
    </div>
</template>

<script>
import { exportCsv } from '@/utils/web3'
import moment from 'moment'

export default {
  name: 'ExportCSV',
  props: ['address', 'filter', 'type'],
  data: function () {
    return {
      loadingCsvStep: 0,
      percentageCsv: 0
    }
  },
  methods: {
    loadCSV: async function () {
      let { address, filter, type } = this
      console.warn(address, filter, type)
      if (filter && filter.length !== 2) {
        filter = {
          fromDate: '2019-01-01',
          toDate: moment().format('YYYY-MM-DD'),
          type
        }
      } else {
        filter = {
          fromDate: filter[0],
          toDate: filter[1],
          type
        }
      }
      this.loadingCsvStep = 1
      await exportCsv({
        address,
        filter,
        progress: percentage => {
          this.loadingCsvStep = 2
          this.percentageCsv = percentage
        }
      })
      this.percentageCsv = 100
      setTimeout(() => {
        this.loadingCsvStep = 0
      }, 2500)
    }
  }
}
</script>

<style lang="scss" scoped>
    .export-csv {
        text-align: center;
        display: inline-block;
    }
    .circle-progress {
        font-size: 14px !important;
        margin-left: auto;
    }
    .csv-block-loader {
        background: transparent;
        width: 60px !important;
        margin-left: auto;
        box-shadow: none !important;
        border: none !important;
    }
</style>
