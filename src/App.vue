<template>
    <div id="app">
        <div v-if="loading" v-loading="loading" class="box-loading">
        </div>
        <router-view/>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState({
      loading: state => state.enter.loading
    })
  }
}
</script>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
}

.box-loading {
  width: 100%;
  position: fixed;
  height: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.6);
}

</style>
