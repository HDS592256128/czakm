import '@/common/common.js';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import VCharts from 'v-charts';
import framespr from '@/directives/framespr';
import crumb from './components/crumb';
import echarts from 'echarts';

import ListEmpty from "@comp/list-empty";
import $ from 'jquery';
// 全局注册面包屑组件
Vue.component('crumb', crumb);
Vue.prototype.$echarts = echarts;

// 全局注册 列表为空组件
Vue.component('ListEmpty', ListEmpty);

// 加载指令
Vue.use(framespr);
Vue.use(VCharts);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


// 跨页共享store数据
window.getState = function (key) {
  return store.state[key];
};