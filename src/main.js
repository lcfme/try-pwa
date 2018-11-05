// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VuePlyr from 'vue-plyr';
import '@/assets/base.scss';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VuePlyr);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
