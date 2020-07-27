/*
 * @Author: chongxuan
 * @Date: 2019-07-29 21:25:45
 * @Description: 日期格式化
 */
import moment from 'moment';
export default {
  methods: {

    /**
         * @param {*} dateStr 时间字符串
         * @param {*} format 格式
         * @description 日期格式化
         * @returns {String} 格式化之后日期文本
         */
    dateFormat (dateStr, format = 'YYYYMMDDHHmmss', targetFormat = 'YYYY-MM-DD HH:mm:ss') {
      const _date = moment(dateStr, format);
      return _date._isValid ? _date.format(targetFormat) : dateStr;
    }
  }
};