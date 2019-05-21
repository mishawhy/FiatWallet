<template>
    <div class="date-container">
        <div>
            <el-input
                v-bind="$attrs"
                @change="handleChange"
                :min="1"
                :max="31"
                pattern="\d*"
                type="number"
                style="width:80px"
                placeholder="Day"
                v-model="date.day"></el-input>
        </div>
        <div>
            <el-select
                v-model="date.month"
                @change="handleChange"
                filterable>
                <el-option
                    v-for="(month, index) in months"
                    :label="month"
                    :key="month"
                    :value="index+1">
                </el-option>
            </el-select>
        </div>
        <div>
            <el-input
                @change="handleChange"
                v-model="date.year"
                min="1900"
                pattern="\d*"
                type="number"
                placeholder="Year"></el-input>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
export default {
  name: 'CustomDate',
  props: {
    value: {
      type: String
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  data: function () {
    return {
      date: {
        day: 1,
        month: 1,
        year: null
      },
      months: MONTHS
    }
  },
  methods: {
    handleChange () {
      const { day, month, year } = this.date
      const formated = moment(`${day}/${month}/${year}`, 'DD/MM/YYYY').format(
        this.format
      )
      if (day && month && year) {
        this.$emit('input', formated)
        return this.$emit('change', formated)
      }
      this.$emit('input', '')
      this.$emit('change', '')
    },
    setCurrentValue (date) {
      this.date = date
    }
  },
  watch: {
    value (val) {
      if (!val) return
      const initial = moment(val, this.format)
      const date = {
        day: parseInt(initial.format('D')),
        month: parseInt(initial.format('M')),
        year: parseInt(initial.format('YYYY'))
      }
      this.setCurrentValue(date)
    }
  }
}
</script>

<style lang="sass" scoped>
    .date-container
        display: flex
        margin: 0 -10px
        & > div
            margin: 5px 10px
</style>
