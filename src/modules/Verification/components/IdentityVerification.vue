<template>
    <el-form @submit.prevent.native :model="form" ref="identityForm" class="identity-verification">
        <el-form-item class="document-type" prop="document_type">
            <slot name="label">
                <div class="uppercase form-item-title">
                  PLEASE CHOOSE DOCUMENT TYPE WHICH YOU PREFER TO USE FOR VERIFICATION PROCESS:
                </div>
            </slot>
            <el-select class="document-type" v-model="form.document_type">
              <el-option
                  label="International passport (recommended)"
                  value="INTERNATIONAL_PASSPORT">
              </el-option>
                <el-option
                    label="ID Card"
                    value="ID_CARD">
                </el-option>
                <el-option
                    label="Driver license"
                    value="DRIVER_LICENSE">
                </el-option>
            </el-select>
        </el-form-item>

        <div class="photos">
            <el-row class="file-block" :gutter="15">
                <el-col class="id-card" :xs="24" :sm="12">
                    <el-form-item
                        prop="selfie"
                        :rules="[
                            { required: true, message: 'Please select selfie file', trigger: ['change', 'blur'] },
                        ]">
                        <div class="form-detail">
                            <h3 class="big-title bold">Selfie</h3>
                            <p>Make an selfie with your document front page and upload it</p>
                        </div>
                        <el-upload
                            action="#"
                            ref="selfie"
                            :limit="1"
                            :show-file-list="false"
                            :on-change="(file, fileList) => selectFile(file, fileList, 'selfie')"
                            :auto-upload="false">
                            <el-button
                                class="upload-button"
                                type="primary"
                                v-if="!form.selfie"
                                slot="trigger"
                                size="small" round>
                                <span class="icon"><i class="el-icon-plus"></i></span> <span>Upload selfie</span>
                            </el-button>
                            <el-button
                                class="clear-file"
                                type="primary"
                                @click.prevent="clearFile('selfie')"
                                v-else slot="tip"
                                size="small" round>
                                <span>{{ $R.prop('name', form.selfie) | shortText(10, 10) }}</span>
                                <span class="icon"><i class="el-icon-close"></i></span>
                            </el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <div class="upload" :style="{
                        backgroundImage: 'url(images/selfie.jpg)'
                    }"></div>
                </el-col>
            </el-row>
            <el-row class="file-block" :gutter="15">
                <el-col class="id-card-detail" :xs="24" :sm="12">
                    <el-form-item
                            prop="front"
                            :rules="[
                            { required: true, message: 'Please select front file', trigger: ['change', 'blur'] },
                        ]">
                        <div class="form-detail">
                            <h3 class="big-title bold">Front</h3>
                            <p>Make an detail photo front page your document and upload it</p>
                        </div>
                        <el-upload
                            action="#"
                            ref="front"
                            :limit="1"
                            :show-file-list="false"
                            :on-change="(file, fileList) => selectFile(file, fileList, 'front')"
                            :auto-upload="false">
                            <el-button
                                class="upload-button"
                                v-if="!form.front"
                                slot="trigger"
                                type="primary"
                                size="small" round>
                                <span class="icon"><i class="el-icon-plus"></i></span> <span>Upload front</span>
                            </el-button>
                            <el-button
                                class="clear-file"
                                type="primary"
                                @click.prevent="clearFile('front')"
                                v-else slot="tip"
                                size="small" round>
                                <span>{{ $R.prop('name', form.front) | shortText(10, 10) }}</span>
                                <span class="icon"><i class="el-icon-close"></i></span>
                            </el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col class="id-card" :xs="24" :sm="12">
                    <div class="upload" :style="{
                        backgroundImage: 'url(images/front.jpg)'
                    }"></div>
                </el-col>
            </el-row>
            <div class="text-right">
                <el-button
                    :loading="loading"
                    type="primary"
                    @click="submit('identityForm')">
                    Next step
                </el-button>
            </div>
        </div>
    </el-form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { prop } from 'ramda'

import TextMixin from '@/mixins/text'
import { prepareValidateErrors } from '@/utils/errors'

const { mapActions } = createNamespacedHelpers('verification')

export default {
  name: 'VerificationForm',
  data: function () {
    return {
      loading: false,
      form: {
        document_type: 'INTERNATIONAL_PASSPORT',
        selfie: null,
        front: null
      }
    }
  },
  methods: {
    ...mapActions(['submitIdentityVerification']),
    async submit () {
      this.$refs['identityForm'].validate((valid, error) => {
        if (valid) {
          const formData = new FormData()
          for (let key in this.form) {
            formData.append(key, this.form[key])
          }
          this.loading = true
          this.submitIdentityVerification(formData).finally(() => {
            this.loading = false
          })
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: prepareValidateErrors(error)
          })
        }
      })
    },
    clearFile: function (ref) {
      this.form[ref] = null
      this.$refs[ref].clearFiles()
    },
    selectFile: function (file, fileList, key) {
      this.form[key] = prop('raw', file)
    }
  },
  mixins: [TextMixin]
}
</script>

<style lang="scss">
    .label {
        font-size: 14px;
        margin-bottom: 10px;
        letter-spacing: 0.6px;
        color: black
    }
    .form-item-title {
        letter-spacing: 0.6px
    }
    .form-detail {
        & p {
            line-height: 1.4
        }
        & .big-title {
            font-size: 27px
        }
    }

    .photos {
        .file-block {
            margin-bottom: 32px
        }
        .upload {
            -webkit-background-size: 100% auto;
            background-size: 100% auto;
            background-position: center top;
            background-repeat: no-repeat;
            height: 250px;
            padding: 10px;
            border-radius: 5px;
            overflow: hidden
        }
        .upload-button {
            border: 1px solid;
            padding: 10px 15px;
            color: #fff;
            font-size: 15px
        }
        .icon {
            font-size: 17px;
            i {
                margin-right: 10px;
                vertical-align: middle
            }
        }
        .el-upload {
            height: 45px;
            text-align: left;
            width: 100%
        }
        button {
            text-align: left;
            margin: 15px auto
        }
        .clear-file {
            & > span {
                display: flex;
                justify-content: space-between;
                align-items: center
            }
            width: 100%;
            font-size: 13px;
            color: $--color-primary;
            background: #fff;
            position: absolute;
            left: 0;
            .icon {
                vertical-align: middle
            }
            .icon:first-child {
                margin-right: 10px;
                float: left
            }
            .icon:last-child {
                margin-left: 10px;
                float: right
            }
        }
    }

</style>
