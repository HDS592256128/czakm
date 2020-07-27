/*
 * @Author: chongxuan
 * @Date: 2019-07-29 13:34:27
 * @Description: vue指令 - 设置元素高度，跟随window.resize
 */

const framespr = {
  install: function (Vue, options) {

    Vue.directive('framespr', {
      inserted: function (el, binding, vnode, oldVnode) {
        const h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - binding.value;
        el.style.height = h + 'px';

        binding.handler = function (e) {
          const h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - binding.value;
          el.style.height = h + 'px';
        };

        if (binding.modifiers.fix) {
          el.style.overflow = 'hidden';
          el.style.position = 'relative';
        } else {
          el.style.overflow = 'auto';
        }
        window.addEventListener('resize', binding.handler);
      },
      componentUpdated: function (el, binding, vnode, oldVnode) {},
      unbind: function (el, binding, vnode, oldVnode) {
        window.removeEventListener('resize', binding.handler);
      }
    });
  }
};

module.exports = framespr;