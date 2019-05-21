<template>
    <div>
        <h4 v-if="title && !hideTitle" class="title bold">{{ title }}</h4>
        <div :class="['root', { 'shadow': shadow }, customStyle]">
            <div class="body">
                <div v-loading="loading" class="body-content" :style="{background: contentBg}">
                    <slot name="content"></slot>
                </div>
            </div>
            <div class="custom-slot">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Body',
  props: {
    contentBg: {
      type: String,
      default: '#fff'
    },
    shadow: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean
    },
    title: {
      type: String
    },
    customStyle: {
      type: String
    }
  },
  data: function () {
    return {
      /* eslint-disable-next-line */
      loaderColor: VUE_APP_MAIN_COLOR
    }
  }
}
</script>

<style lang="scss" scoped>
    .root {
        background: #fff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        overflow: hidden;
        height: 100%;
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .body {
        height: 100%;
        display: flex;
        flex-direction: column;
        .body-content {
            flex-grow: 2;
            padding: 30px 15px 15px;
            box-sizing: border-box;
        }
    }

    h4.title {
        font-size: 22px;
        color: inherit
    }

    h2.title {
        font-size: 16px;
        color: #888;
        margin-bottom: 20px
    }
</style>
