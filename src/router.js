import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import PickUp from './views/PickUp.vue'
import DropOff from './views/DropOff.vue'
import Account from './views/Account.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/pickup',
      name: 'PickUp',
      component: PickUp
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/dropoff',
      name: 'DropOff',
      component: DropOff
    },
  ]
})