import Vue from 'vue';
import App from './components/App.vue';
import store from "./store";

// Vue.use(Vuex);
Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app');