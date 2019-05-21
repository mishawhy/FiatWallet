<template>
    <vue-element-loading :active="active" spinner="ring" :color="color" />
</template>

<script>
import VueElementLoading from 'vue-element-loading'

export default {
  name: 'Loader',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      /* eslint-disable-next-line */
      default: VUE_APP_MAIN_COLOR
    }
  },
  components: {
    VueElementLoading
  }
}
</script>

<style scoped>
</style>
