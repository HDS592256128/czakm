export default {
  install(Vue) {
    Vue.prototype.loadingCount = 0;
    Vue.prototype.showLoading = function () {
      if (Vue.prototype.loadingCount === 0) {
        this.__loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.8)',
          customClass: "zZindex"
        });
      }
      Vue.prototype.loadingCount++;
    }
    Vue.prototype.hideLoading = function () {
      Vue.prototype.loadingCount--;
      if (Vue.prototype.loadingCount === 0) {
        this.__loading.close();
      }
    }
  }
}
