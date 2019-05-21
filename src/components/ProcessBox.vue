<template>
    <VBody :title="title">
        <div slot="content">
            <div :class="['process-box', status.type]">
                <div class="process-box-header">

                    <div class="title bold">{{ status.title }}</div>
                    <!-- <a :href="getEtherscanTx(status.txHash)" target="_blank" class="row-value linkToTx">Etherscan<i class="fas fa-external-link-alt"></i></a> -->
                </div>
                <div class="process-box-content">
                    {{ status.description }}
                </div>
            </div>

            <div class="center loader" v-loading="status.type == 'wait'">
                <el-button
                        v-if="(status.type == 'done' || status.type == 'failed') && status.invoice && status.invoice.type"
                        class="button" type="primary"
                        @click="generateInvoice(status.invoice)"
                >
                    Download invoice
                </el-button>
                <el-button v-if="status.type == 'done' || status.type == 'failed'" @click="$emit('resetProcess')"
                           class="goto-main bold" type="text"><i class="el-icon-refresh"></i> Return to main
                </el-button>
            </div>
        </div>
    </VBody>
</template>

<script>
    import VBody from '@/components/Body'
    import {STATUS_TX} from '@/constant/status'
    import {ETHERSCAN} from '@/constant/ethereum'
    import { createNamespacedHelpers } from 'vuex'

    const { mapState, mapActions } = createNamespacedHelpers('transactions')

    // import {get_invoice} from "../utils/invoices";
    //generateInvoice
    export default {
        name: 'ProcessBox',
        data: function () {
            return {
                statusTx: STATUS_TX
            }
        },
        props: {
            status: {
                type: Object
            },
            title: {
                type: String
            }
        },

        methods: {
            ...mapActions(['generateInvoice']),
            getEtherscanTx: function (tx) {
                return ETHERSCAN[this.network] + tx
            }
        },
        components: {
            VBody
        }
    }
</script>
<style lang="scss">
    .loader {
        height: 70px;
        padding-top: 10px;
        padding-bottom: 20px;

        .goto-main {
            font-size: 17px;

            & i {
                vertical-align: middle;
                font-size: 28px
            }
        }
    }

    .linkToTx {
        color: $--color-primary;

        i {
            margin-left: 10px;
            color: #000;
            opacity: 0.4
        }
    }

</style>
