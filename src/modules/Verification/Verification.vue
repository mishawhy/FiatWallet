<template>
    <VBody :loading="loading" title="KYC / AML verification">
        <div slot="content">
            <el-steps :active="step" class="step">
                <el-step title="Identity"></el-step>
                <el-step title="Confirmation"></el-step>
                <el-step title="Verification"></el-step>
            </el-steps>
            <div class="verificationBox">
                <component :is="tab" :status="status"></component>
            </div>
        </div>
    </VBody>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import VBody from '@/components/Body'
// Tabs
import VGeneral from './components/General'
import VEmailConfirm from './components/EmailConfirm'
import VPhoneConfirm from './components/PhoneConfirm'
import VIdentityVerification from './components/IdentityVerification'
import VBusinessVerification from './components/BusinessVerification'
import VVerificationStatus from './components/VerificationStatus'
import VPrivate from "./components/BusinessVerificationForm/Private";
import VCorporate from "./components/BusinessVerificationForm/Corporate";

const { mapState, mapActions } = createNamespacedHelpers('verification')

export default {
  name: 'Index',
  computed: {
    ...mapState(['tab', 'step', 'status', 'loading'])
  },
  methods: {
    ...mapActions(['passportStatus'])
  },
  mounted () {
    this.passportStatus()
  },
  components: {
    VBody,
    // TABS
    VGeneral,
    VEmailConfirm,
    VPhoneConfirm,
    VIdentityVerification,
    VBusinessVerification,
    VVerificationStatus,
      VPrivate,
      VCorporate,
  }
}
</script>

<style lang="scss">
    .el-step__title.is-process {
        font-weight: normal
    }
    .verificationBox {
        .button {
            width: auto
        }
    }
    .step {
        margin-bottom: 30px
    }
    .step {
        .is-finish {
            .is-text {
                color: white;
                font-weight: normal;
                background-color: $--color-primary
            }
        }
    }
</style>
