export default {
  method: 'post',

  // 基础url前缀
  baseURL: process.env.BASE_URL,

  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },

  // 参数
  data: {},

  // 设置超时时间
  timeout: 15000,

  // 携带凭证
  withCredentials: false,

  // 返回数据类型
  responseType: 'json'
};