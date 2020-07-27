import empty from './empty';

const Plugin = {
  install(Vue, option = {}) {
    Vue.component('data-empty', empty);
  }
};
export default Plugin;