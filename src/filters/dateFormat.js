import moment from 'moment';

/**
 * @param {*} dateStr 时间字符串
 * @param {*} format 格式
 * @description 日期格式化
 * @returns {String} 格式化之后日期文本
 */
export default function (dateStr, format = 'YYYYMMDDHHmmss', targetFormat = 'YYYY-MM-DD HH:mm:ss') {
  const _date = moment(dateStr, format);
  return _date._isValid ? _date.format(targetFormat) : dateStr;
}