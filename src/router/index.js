import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login';
import Home from '@/components/home/home';
import MakePayment from '@/components/make-payment/make-payment';
import RequestPayment from '@/components/request-payment/request-payment';
import Store from '../model/model.js';

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/make-payment',
      name: 'MakePayment',
      component: MakePayment
    },
    {
      path: '/request-payment',
      name: 'RequestPayment',
      component: RequestPayment
    }
  ]
});

if(Store.IS_DEVELOPMENT_MODE)return;

router.beforeEach((to, from,next) => {
    if (!Store.address && to.name !== 'Login') {
        next('/');
    } else {
        next()
    }
});
/**/

export default router;
