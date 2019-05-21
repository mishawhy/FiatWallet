/* ============
 * Vue-lazy-images
 * ============
 *
 * A plugin of lazy-load images for Vue2.x.
 *
 * https://github.com/yyh1102/vue-lazyload-images
 */

import Vue from 'vue'
import VueLazyImage from 'vue-lazy-images'
Vue.use(VueLazyImage, {
  throttle: 1000,
  debounce: 1000,
  offset: 10
})
