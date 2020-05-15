import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Closet from '../views/Closet.vue'
import Looks from '../views/Looks.vue'
import NewLook from '../views/NewLook.vue'
import Profile from '../views/Profile.vue'
import AddCloth from '../views/AddCloth.vue'
import EditLook from '../views/EditLook.vue'
import Calendary from '../views/Calendary.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { layout: 'simple' },
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    meta: { layout: 'simple' },
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    meta: { layout: 'simple' },
    component: Home,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/closet',
    name: 'Closet',
    component: Closet,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/looks',
    name: 'Looks',
    component: Looks,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/newlook',
    name: 'NewLook',
    component: NewLook,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/editlook/:id',
    name: 'EditLook',
    component: EditLook,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/addcloth',
    name: 'AddCloth',
    component: AddCloth,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/calendary',
    name: 'Calendary',
    component: Calendary,
    beforeEnter (to, from, next) {
      if (!localStorage.getItem("token")) {//eslint-disable-line
        next({
          name: 'Login'
        })
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
