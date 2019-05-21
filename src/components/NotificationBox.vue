<template>
    <div class="verification-status">
        <VBody :custom-style="status" :title="title">
            <div slot="content">
                <el-row>
                    <el-col :xs="24" :sm="18">
                        <div class="info-tooltip" v-if="msg.att">
                            <div class="attention-content"><span class="bold uppercase">Attention</span>
                                {{ msg.att}}
                            </div>
                        </div>
                        <div class="bold">{{ msg.body}}</div>
                    </el-col>
                </el-row>
            </div>
        </VBody>

    </div>
</template>

<script>
import VBody from './Body'

export default {
  name: 'VerificationStatus',
  components: {
    VBody
  },
  props: {
    status: {
      type: String,
      default: 'PENDING'
    },
    title: {
      type: String
    },
    msg: {
      type: Object
    }
  }
}
</script>

<style lang="sass">
    .verification-status
        .root
            padding: 0 40px 20px
            .content
                line-height: 1.4
            .header
                position: relative
                &:before
                    content: '\2022'
                    position: absolute
                    left: -20px
                    top: 7px
                    font-size: 60px
            .content
                color: #7F7F7F
        .process
            .info-tooltip
                margin-bottom: 30px
                color: #7F7F7F
            .header
                &:before
                    color: #FD9739
        .success
            .header
                &:before
                    color: #59ED72
        .failed
            .header
                &:before
                    color: #FE2121
</style>
