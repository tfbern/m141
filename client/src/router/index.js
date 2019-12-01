import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Tasks from "../views/Tasks.vue"
import Profile from "../views/Profile.vue"
import Users from "../views/Users.vue"
import Password from "../views/Password.vue"
import System from "../views/System.vue"
import store from "../store/store.js"

Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },{
      path: "/register",
      name: "register",
      component: Register
    },{
      path: "/login",
      name: "login",
      component: Login
    },{
      path: "/tasks",
      name: "tasks",
      component: Tasks,
      meta: {
        requiresAuth: true
      }
    },{
      path: "/users",
      name: "users",
      component: Users,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/passwd',
      name: 'passwd',
      component: Password,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/system',
      name: 'system',
      component: System,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // console.log("your token is: " + store.getters.isLoggedIn)
    if (!store.getters.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
