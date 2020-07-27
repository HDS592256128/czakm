import '@/common/common.js';
import Vue from 'vue';
import App from './App.vue';
import framespr from '@/directives/framespr';

// 加载指令
Vue.use(framespr);
new Vue({
  render: h => h(App)
}).$mount('#app');
