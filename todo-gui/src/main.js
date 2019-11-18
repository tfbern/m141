import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store/store';
import Axios from 'axios';

Vue.config.productionTip = false

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
