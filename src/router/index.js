import Vue from 'vue'
import Router from 'vue-router'
//@ 指的是src文件夹
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      nmae:'login',
      path: '/login',
      component:Login

    }
  ]
})
