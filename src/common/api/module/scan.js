import axios from '../api';

// 扫码登记模块
export default {
  loadCardDetail: function (params) {
    return axios({
      url: '/regis/getQrcodeInfo',
      method: 'post',
      data: params
    });
  }
};
