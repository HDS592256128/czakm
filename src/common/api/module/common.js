/*
 * @Author: chongxuan
 * @Date: 2019-07-31 08:48:00
 * @Description: 公共接口集
 */

import axios from '../api';

export default {

  /**
   * @description 获取字典项
   * @param {*} params 字典类型简拼，支持逗号分隔一次获取多个
   * @returns {Object}
   */
  getDicts: function (params) {
    return axios({
      url: '/dict/common/dictMap.do',
      method: 'post',
      data: params
    });
  },
  queryXzqhBySjdm: function (data) {
    return axios({
      url: '/xzqh/queryXzqhBySjdm',
      method: 'post',
      data,
      noLoading: true
    });
  },
  getXzqhByDm: function (data) {
    return axios({
      url: '/xzqh/getXzqhByDm',
      method: 'post',
      data,
      noLoading: true
    });
  },
  // 用户权限
  getCurrentXzqh: function (data) {
    return axios({
      url: '/user/getCurrentXzqh',
      method: 'post',
      data,
      noLoading: true
    });
  },
  queryUserAreaListByDm: function (data) {
    return axios({
      url: '/xzqh/queryUserAreaListByDm',
      method: 'post',
      data,
      noLoading: true
    });
  },
  login: function (data) {
    return axios({
      url: '/login/userLogin',
      method: 'post',
      data
    });
  },
  logOut: function () {
    return axios({
      url: '/crm/logout',
      method: 'post'
    });
  },
  modifyPass: function (data) {
    return axios({
      url: '/login/changePassword',
      method: 'post',
      data
    });
  },
  changeSite: function (data) {
    return axios({
      url: '/login/changeSite',
      method: 'post',
      data
    });
  }
};
