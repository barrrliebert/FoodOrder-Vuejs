import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'

Vue.use(VueToast); // Menggunakan plugin VueToast untuk notifikasi
Vue.use(BootstrapVue) // Menggunakan BootstrapVue untuk komponen Bootstrap
Vue.use(BootstrapVueIcons) // Menggunakan BootstrapVueIcons untuk ikon Bootstrap

Vue.config.productionTip = false // Mengatur mode produksi menjadi false

new Vue({
  router,
  render: h => h(App) // Merender komponen App menggunakan router
}).$mount('#app') // Memasang aplikasi ke elemen dengan ID "app" di HTML
