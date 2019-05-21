<template>
    <div class="file-block">
        <el-upload
            action="#"
            :limit="1"
            ref="file"
            :show-file-list="false"
            :on-change="selectFile"
            :auto-upload="false">
            <el-button
                class="upload-button"
                v-if="!file"
                slot="trigger"
                type="primary"
                size="small" round>
                <span class="icon"><i class="el-icon-plus"></i></span> <span>Upload file</span>
            </el-button>
            <el-button
                class="clear-file"
                type="primary"
                @click.prevent="clearFile"
                v-else slot="tip"
                size="small" round>
                <span>{{ $R.prop('name', file) | shortText(10, 10) }}</span>
                <span class="icon"><i class="el-icon-close"></i></span>
            </el-button>
        </el-upload>
    </div>
</template>

<script>
import { prop } from 'ramda'

import TextMixin from '@/mixins/text'

export default {
  name: 'UploadFile',
  props: ['value'],
  data: function () {
    return {
      file: null
    }
  },
  methods: {
    clearFile: function () {
      this.file = null
      this.$emit('input', null)
      this.$refs.file.clearFiles()
    },
    selectFile: function (file) {
      const raw = prop('raw', file)
      this.file = raw
      this.$emit('input', raw)
    }
  },
  watch: {
    value (val) {
      if (!val) return
      this.file = val
    }
  },
  mixins: [TextMixin]
}
</script>

<style lang="scss" scoped>
    .file-block {
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
            text-align: left
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
