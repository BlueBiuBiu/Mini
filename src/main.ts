import Vue from 'vue'
import App from './App.vue'
import Notify from './wxcomponents/vant/notify/notify'
import api from "./api/index.js"

Vue.config.productionTip = false
Vue.prototype.$Message = Notify 
Vue.prototype.$api = api

new App().$mount()
