import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login';
import Home from '@/components/home/home';
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
    }
  ]
});


router.beforeEach((to, from,next) => {
  console.log(from)
    if (!Store.address && to.name !== 'Login') {
        next(false);
    } else {
        next()
    }
});
/**/

export default router;