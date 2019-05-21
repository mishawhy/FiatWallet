<template>
    <div class="content passport-detail">
        <el-row :gutter="15" class="passport-data" type="flex" wrap>
          <el-col :xs="24" :sm="12">
              <label>Account type</label>
              <el-tag type="success"> {{ detail.account_type }}
              </el-tag>
          </el-col>
          <el-col :xs="24" :sm="12">
              <label>Status</label>
              <el-tag type="success" v-if="detail.status === 'APPROVED'"> {{ detail.status }}
              </el-tag>
              <el-tag v-if="detail.status === 'WAIT'"> {{ detail.status }}</el-tag>
              <el-tag type="danger" v-if="detail.status === 'REJECT'"> {{ detail.status }}</el-tag>
          </el-col>
            <el-col :xs="24" :sm="12">
                <label>Full name</label>
                <h4>{{ detail.title+' '+detail.name}}</h4>
            </el-col>

            <el-col :xs="24" :sm="12">
                <label>Country</label>
                <h4>{{ getCountry(detail.country_of_residence) }}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Email</label>
                <el-button plain icon="el-icon-message" v-clipboard:copy="detail.email || ''"
                           v-clipboard:success="copySuccess">{{ detail.email }}
                </el-button>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>Phone</label>
                <el-button plain icon="el-icon-phone" v-clipboard:copy="detail.phone || ''"
                           v-clipboard:success="copySuccess">{{ detail.phone }}
                </el-button>
            </el-col>

            <el-col :xs="24" :sm="24">
                <label>Ethereum Address</label>
                <el-button plain class="eth-address-btn" icon="fab fa-ethereum" v-clipboard:copy="detail.address || ''"
                           v-clipboard:success="copySuccess"> {{ detail.address }}
                </el-button>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>DATE OF BIRTH</label>
                <h4>{{ detail.date_of_birth}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>PLACE OF BIRTH</label>
                <h4>{{ detail.place_of_birth }}</h4>
            </el-col>
            <el-col :xs="24" :sm="24">
                <label>CURRENT ADDRESS</label>
                <h4>{{ detail.current_address}}</h4>
            </el-col>
            <h4 style="display:block; width: 100%; margin:10px">Identity details</h4>
            <el-col :xs="24" :sm="12">
                <label>COUNTRY OF RESIDENCE</label>
              <h4>{{ getCountry(detail.country_of_residence) }}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>IDENTIFICATION NUMBER</label>
                <h4>{{ detail.identification_number}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>PASSPORT NUMBER</label>
                <h4>{{ detail.passport_number}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>PASSPORT EXPIRY DATE</label>
                <h4>{{ detail.passport_expiry_date}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>PASSPORT ISSUING COUNTRY</label>
                <h4>{{ getCountry(detail.passport_issuing_country)}}</h4>
            </el-col>
            <el-col :xs="24" :sm="12">
                <label>PASSPORT ISSUING AUTHORITY</label>
                <h4>{{ detail.passport_issuing_authority}}</h4>
            </el-col>
        </el-row>

        <!-- <Private v-if="detail.account_type === 'PRIVATE'" :private="detail.passport_private[0]"></Private>
        <Corp v-if="detail.account_type === 'CORPORATE'" :corp="detail.passport_corp[0]"></Corp> -->

    </div>
</template>

<script>
import { propEq, find, propOr } from 'ramda'
import Private from "./Private";
import Corp from './Corp';
export default {
  name: 'PassportDetail',
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      countryList: require('@/constant/country-list.json')
    }
  },
    mounted: function() {
      console.info(this.detail)
    },
    components: {Private, Corp},
  methods: {
    getCountry: function (code) {
      if (!code) return 'None'
      const country = find(propEq('code', code), this.countryList)
      return propOr('None', 'name', country)
    },
    copySuccess: function () {
      this.$message({
        message: 'Successfully copied',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
