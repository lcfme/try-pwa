import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index/Index';

// import HelloWorld from '@/components/HelloWorld';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
  ],
});
