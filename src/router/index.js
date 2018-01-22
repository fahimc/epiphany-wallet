import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'

Vue.use(Router)
let authenticated = true; 
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


router.beforeEach ((to, from,next) => {
  console.log(to)
    if (!authenticated && to.name !== 'Login') {
        next(false);
    } else {
        next()
    }
})

export default router;