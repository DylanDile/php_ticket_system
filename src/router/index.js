import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView";
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requireAuth: true},
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guest: true},
  },
  {
    path: '/tickets',
    name: 'tickets',
    meta: {requireAuth: true},
    component: function () {
      return import(/* webpackChunkName: "tickets" */ '../views/ticket/IndexView.vue')
    }
  },
  {
    path: '/ticket/create',
    name: 'createTicket',
    meta: {requireAuth: true},
    component: function () {
      return import(/* webpackChunkName: "tickets" */ '../views/ticket/CreateView.vue')
    }
  },
  {
    path: '/ticket/:id/view',
    name: 'showTicket',meta: {requireAuth: true},
    component: function () {
      return import(/* webpackChunkName: "tickets" */ '../views/ticket/ShowView.vue')
    }
  },
  {
    path: '/ticket/:id/edit',
    name: 'editTicket',
    meta: { requireAuth: true},
    component: function () {
      return import(/* webpackChunkName: "tickets" */ '../views/ticket/EditView.vue')
    }
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/home");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
