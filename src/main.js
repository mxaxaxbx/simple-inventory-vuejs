import Vue from 'vue'
import App from './App.vue'

//Firebase
import '@/firebase/firebaseConfig';

// Vuex Store
import store from './store/store';

// Vue Router
import router from './router';

// i18n
import i18n from './i18n/i18n';

// animejs
import VueAnime from 'vue-animejs';
Vue.use(VueAnime);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
