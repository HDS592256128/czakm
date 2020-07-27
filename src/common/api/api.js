import axios from 'axios';
import config from './config.js';
import qs from 'qs';
import store from '@index/store/store';
import Vue from 'vue';


export default function $axios(options) {
  if (!options.noLoading) {
    Vue.prototype.showLoading();
  }
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
        'token': store.state.token
      }
    });
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        // Tip: 3
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method.toLocaleLowerCase() === 'post' ||
                    config.method.toLocaleLowerCase() === 'put' ||
                    config.method.toLocaleLowerCase() === 'delete') {
          if (config.headers['Content-Type'] && config.headers['Content-Type'] === 'application/json;charset=UTF-8') {
            // 不需要序列化
          } else {
            config.data = qs.stringify(config.data);
          }
        }

        if (config.method.toLocaleLowerCase() === 'get') {
          config.url = `${config.url}?t=${new Date().getTime()}`;
        }

        store.commit('sendAjaxSetNum', 'send');
        return config;
      },
      error => {
        store.commit('sendAjaxSetNum', 'error');
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;

        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (typeof response.data === 'undefined') {
          data = response.request.responseText;
        } else {
          data = response.data;
        }
        store.commit('sendAjaxSetNum', 'done');
        return data;
      },
      err => {
        store.commit('sendAjaxSetNum', 'error');
        return Promise.reject(err);
      }
    );

    instance(options)
      .then((res) => {
        if (!options.noLoading) {
          Vue.prototype.hideLoading();
        }
        if (res && typeof res === 'object') {
          resolve(res);

        } else {
          Vue.prototype.$message.error('返回结果不完整，请刷新页面重试！');
        }
      })
      .catch((error) => {
        if (!options.noLoading) {
          Vue.prototype.hideLoading();
        }
        if (!error.response) {
          Vue.prototype.$message.error('响应数据无法解析，请刷新重试！');
        }
        if (error.response && (error.response.status === 403 || error.response.status === '403')) {
          if (window.isOverdueDialog) {
            return false;
          }
          window.isOverdueDialog = true;
          Vue.prototype.$confirm('登录已过期，是否重新登录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.location.href = process.env.BASE_URL;
          }).catch(() => {
            window.isOverdueDialog = false;
          });
        } else {
          reject(error);
        }
      });
  });
}
