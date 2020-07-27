/*
 * @Author: chongxuan
 * @Date: 2019-07-31 19:51:34
 * @Description: iview时间区间格式化
 */

import moment from 'moment';

/**
 * @param {Array} date 长度为2的数组，数据为Date
 * @returns {String,String} 日期字符串
 */
export default function (dateArr, format = 'YYYYMMDDHHmmss') {
    let date = dateArr || [];

    let beginTime = date[0] ?
        moment(date[0]).format(format) :
        "";
    let overTime = date[1] ?
        moment(date[1]).format(format) :
        "";

    return {
        beginTime,
        overTime
    }
}