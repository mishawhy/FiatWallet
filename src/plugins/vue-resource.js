/* ============
 * Vuex Resource
 * ============
 *
 * The plugin for Vue.js provides services for making web requests and handle responses using a XMLHttpRequest or JSONP
 *
 * https://github.com/pagekit/vue-resource
 */

import VueResource from 'vue-resource'
import Vue from 'vue'
import { API_URL } from '@/constant/api'
import Store from '@/store'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  let accessToken = Store.getters['enter/signIn']
  request.headers.set('Authorization', accessToken)
  next()
})

Vue.http.options.root = API_URL
