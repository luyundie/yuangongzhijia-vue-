import Vue from 'vue'
import App from './App'
import store from './store'
// main.js
import uView from "uview-ui";
Vue.prototype.$store = store
Vue.use(uView);
Vue.prototype.$store = store
Vue.config.productionTip = false
// Vue.forceUpdate();

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
