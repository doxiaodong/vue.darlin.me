import Vue from 'vue'
import App from './app/app.vue'
import VueRouter from 'vue-router'
import { Dhttp } from './base/http/http.service'

import IndexComponent from './index/index.vue'
Vue.use(VueRouter)

// const ArticleListComponent = (resolve) => require(['./article/list.vue'], resolve)
const ArticleListComponent = (resolve) => System.import('./article/list.vue').then(resolve)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'index', component: IndexComponent },
    { path: '/article', name: 'article', component: ArticleListComponent },

    { path: '*', redirect: '/' }
  ]
})

new Vue(Vue.util.extend({ router }, App)).$mount('#darlin')
Dhttp.get('https://darlin.me/index.html')
