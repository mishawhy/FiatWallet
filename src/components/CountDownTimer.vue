<template>
    <div class="timer-container">
        <el-progress :width="120" :stroke-width="5" :show-text="false" type="circle" :percentage="getPercent"></el-progress>
        <div class="timer">{{counter | prettify}}</div>
    </div>
</template>

<script>
import '@/plugins/vue-rx'
import { interval } from 'rxjs'
import { startWith, scan, take, map } from 'rxjs/operators'
import { SET_GENERAL_DATA } from '../store/modules/general/mutation-types'
import { SET_AIRPAY_DATA } from '../store/modules/airpay/mutation-types'

export default {
  props: {
    minute: {
      type: Number,
      required: true
    }
  },
  subscriptions () {
    let self = this
    let minute = this.minute
    return {
      counter: interval(1000).pipe(
        take(minute * 60),
        startWith(minute * 60),
        scan((total, change) => total - 1),
        map(val => {
          if (val === 0) {
            self.$store.commit(SET_GENERAL_DATA, 'ByTokens')
            self.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
              settings: this.$store.state.airpay.settings
            })
          }
          return val
        })
      )
    }
  },
  computed: {
    getPercent: function () {
      return (this.counter / (this.minute * 60)) * 100
    }
  },
  filters: {
    prettify: function (value) {
      let minutes = parseInt(value / 60)
      let secondes = value % 60
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (secondes < 10) {
        secondes = '0' + secondes
      }
      return minutes + ':' + secondes
    }
  },
  name: 'CountDownTimer'
}
</script>

<style lang="sass" scoped>
    .timer-container
        position: relative
        .timer
            position: absolute
            top: 40px
            left: 0
            color: #000
            font-weight: bold
            font-size: 26px
            right: 0
            margin: auto
</style>
