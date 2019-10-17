// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//公共样式
import '@/assets/css/reset.css'
import MyServerHttp from '@/plugins/http.js'

import router from './router'
import moment from 'moment';

Vue.config.productionTip = false

//使用element插件
Vue.use(ElementUI);
//使用自己插件
Vue.use(MyServerHttp);

//全局过滤器 - 处理日期
Vue.filter('fmtdate',(v) =>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //simple版本 render:(h)=>h(App)
  components: { App },
  template: '<App/>'
})
