import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0a78ea72 = () => interopDefault(import('../pages/category.vue' /* webpackChunkName: "pages/category" */))
const _716290f0 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _e8d3b2c8 = () => interopDefault(import('../pages/news.vue' /* webpackChunkName: "pages/news" */))
const _1664db38 = () => interopDefault(import('../pages/console/login.vue' /* webpackChunkName: "pages/console/login" */))
const _5644616b = () => interopDefault(import('../pages/console/writing.vue' /* webpackChunkName: "pages/console/writing" */))
const _b08a244e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/category",
    component: _0a78ea72,
    name: "category"
  }, {
    path: "/login",
    component: _716290f0,
    name: "login"
  }, {
    path: "/news",
    component: _e8d3b2c8,
    name: "news"
  }, {
    path: "/console/login",
    component: _1664db38,
    name: "console-login"
  }, {
    path: "/console/writing",
    component: _5644616b,
    name: "console-writing"
  }, {
    path: "/",
    component: _b08a244e,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
