import Vue from 'vue';
import Router from 'vue-router';
import routerList from './routers';
import store from '@index/store/store';
Vue.use(Router);

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
const router = new Router(routerList);

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  let showCrumb = to.meta.showCrumb || false;
  let showNav = to.meta.showNav || false
  console.log(showNav)
  store.commit("updateCrumb", showCrumb);
  // if(showNav) store.commit('updateMateNav',showNav)
  // let url = to.path;
  // let targetMenu = _.find(store.state.subNav, ['url', url]);
  // if (targetMenu) {
  //   if (to.meta.title) {
  //     document.title = to.meta.title
  //   }
  // }
  next();
});

export default router;