<template>
    <div>


        <div class="el-dropdown-link investor">
            <div ref="headerlogo" class="logo"></div>
            <div class="user-name bold" v-if="userData.name && userData.name.business_name">
                <span>{{userData.name &&  userData.name.business_name }}</span>
                <div class="uppercase address" v-clipboard:copy="$R.prop('address', userData) || ''"
                     v-clipboard:success="copySuccess">{{$R.propOr('', 'address', userData) | shortAddress }}</div>
            </div>
            <div class="user-name bold" v-if="!userData.name" v-clipboard:copy="$R.prop('address', userData) || ''"
                 v-clipboard:success="copySuccess"><span>{{ userData.address | shortAddress }}</span>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { find, propEq } from 'ramda'
import TextMixin from '@/mixins/text'
import TimeMixin from '@/mixins/time'
import { generateBlockies } from '@/utils/blockies'

export default {
  name: 'User',
  props: {
    userData: {
      type: Object,
      required: true
    },
    passport: {
      type: Object
    }
  },
  data: function () {
    return {
      countryList: require('@/constant/country-list.json'),
      loading: false,
      isProvider: false,
      grantLoader: false
    }
  },
  watch: {
    userData: function () {
      const icon = generateBlockies(this.userData.address, {
        active: this.userData.isVerified
      })
      this.$refs.headerlogo.appendChild(icon)
    }
  },
  computed: {
    ...mapState({
      network: state => state.enter.network,
      isOwner: state => state.enter.isOwner
    })
  },
  methods: {
    getBalance: (currency) => Math.random() * 1000,
    getCountry: function (code) {
      const country = find(propEq('code', code), this.countryList)
      return country.name
    },
    copySuccess: function () {
      this.$message({
        message: 'Successfully copied',
        type: 'success'
      })
    }
  },
  mixins: [TextMixin, TimeMixin]
}
</script>

<style lang="sass" scoped>
    .passport-data
        .eth-address-btn
            padding-left: 20px
            padding-right: 20px
            span
              margin-left: 15px !important
        .el-col
            line-height: 1.7
        h4
            font-weight: bold
            color: #222
            letter-spacing: 0.2px
        label
            letter-spacing: 0.8px
            font-size: 12px
            text-transform: uppercase
            display: block
    .owner
        font-size: 11px
        -webkit-border-radius: 10px
        -moz-border-radius: 10px
        border-radius: 2px
        background: #EDFEE3
        color: #777777
        letter-spacing: 0.5px
        padding: 3px 5px 3px 18px
        text-align: left
        margin-top: 5px
        display: inline-block
        float: left

    .non-verified
        background: #FD9739 !important
        color: #fff !important
        &:after
            color: #fff !important

    .logo
        width: 35px
        overflow: hidden
        height: 35px
        display: inline-block
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        box-shadow: 2px 2px 7px 0 rgba(220, 220, 220, 0.50)

    .investor

        .address
            font-size: 13px
            line-height: 2
            font-weight: 400
            margin-top: -5px
            text-transform: none
    .el-dropdown-link
        display: flex
        align-items: center
        cursor: pointer
        text-align: left
        .user-name
            margin-top: 0px
            font-size: 16px
            padding: 0 0 0 15px
            color: #555
            i
               font-size: 18px
               margin-left: 10px
               color: #35C13D
            span
                display: block
</style>
