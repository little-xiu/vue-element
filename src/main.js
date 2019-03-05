// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 按需引入element
import './element';
import '@/scss/reset.css';
import store from './store';

Vue.config.productionTip = false
Vue.prototype.$center = new Vue();
// 通过document.getElementsByTagName这种方法获取的这一组dom元素，不是数组（Array），而是NodeList，NodeList不是数组。
// nodelist 不能使用foreach的解决办法
/* eslint-disable */
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
  };
}
/* eslint-enable */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
