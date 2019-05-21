<template>
    <div ref="dom" class="logo"></div>
</template>

<script>
export default {
  name: 'InjectDom',
  props: ['dom'],
  mounted () {
    let dom = this.dom
    this.$refs.dom.appendChild(dom)
  }
}
</script>

<style scoped>
</style>
