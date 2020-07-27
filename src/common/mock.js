import axios from 'axios';
const Mock = require('mockjs');

Mock.mock(/\.do/, (options) => {
  console.log(`MockJS拦截请求：${options.url}`);
  const path = '/mock' + options.url.substring(0, options.url.lastIndexOf('.')) + '.json';
  axios.get(path).then(({data}) => {
    return data;
  });
});