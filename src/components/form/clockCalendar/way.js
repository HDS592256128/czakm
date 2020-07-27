const funs = {
  //上一个月 yy-mm
  beforeMonthFun: ((nowDate) => {
    if (nowDate) {
      var currentYear = nowDate.getFullYear();
      var currentMonth = nowDate.getMonth();
      var date = currentYear + '-' + currentMonth;
      if (currentMonth == 0) {
        currentYear = currentYear - 1;
        date = currentYear + '-' + 12;
      }
      return new Date(date);
    }
  }),
  //上一个月事件 yy-mm-dd
  beforeTimeFun: ((nowDate) => {
    if (nowDate) {
      let allDate = new Date(nowDate)
      var currentYear = allDate.getFullYear();
      var currentMonth = allDate.getMonth();
      var currentDate = allDate.getDate();
      var date = currentYear + '-' + currentMonth;
      if (currentMonth == 0) {
        currentYear = currentYear - 1;
        date = currentYear + '-' + 12;
      }
      if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;
      }
      if (currentDate < 10) {
        currentDate = '0' + currentDate;
      }
      date = date + '-' + currentDate;
      return date;
    }
  }),
  //下一个月事件 yy-mm-dd
  nextTimeFun: ((nowDate) => {
    if (nowDate) {
      let allDate = new Date(nowDate)
      var currentYear = allDate.getFullYear();
      var currentMonth = allDate.getMonth() + 2;
      var currentDate = allDate.getDate();
      var date = currentYear + '-' + currentMonth;
      if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;
      }
      if (currentDate < 10) {
        currentDate = '0' + currentDate;
      }
      var date = currentYear + '-' + currentMonth + '-' + currentDate;
      return date;
    }
  }),
  // 获取上一月的开始和结束时间
  getBeforeMonth: (() => {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth();
    if (month === 0) {
      month = 12;
      year = year - 1;
    } else if (month < 10) {
      month = '0' + month;
    }
    let monthDate = new Date(year, month, 0);
    let beginTime = year + '-' + month + '-01';
    let endTime = year + '-' + month + '-' + monthDate.getDate();
    return {
      beginTime: beginTime,
      endTime: endTime
    }
  }),
  // 获取当月的开始，当前和结束时间  yy-mm-dd
  getNowMonth: (() => {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let date = myDate.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (date < 10) {
      date = '0' + date;
    }
    let monthDate = new Date(year, month, 0);
    let beginTime = year + '-' + month + '-01';
    let nowDate = year + '-' + month + '-' + date;
    let endTime = year + '-' + month + '-' + monthDate.getDate();
    return {
      beginTime: beginTime,
      nowDate: nowDate,
      endTime: endTime
    }
  }),
  //获取前几个月
  getPreMonthDay: ((date1, monthNum1) => {
    let monthNum = monthNum1 || 3;
    let date = date1 || funs.getNowMonth().nowDate;
    let dateArr = date.split('-');
    let year = dateArr[0]; //获取当前日期的年份
    let month = dateArr[1]; //获取当前日期的月份
    let day = dateArr[2]; //获取当前日期的日
    let days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    let year2 = year;
    let month2 = parseInt(month) - monthNum;
    if (month2 <= 0) {
      year2 = parseInt(year2) - parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
      month2 = 12 - (Math.abs(month2) % 12);
    }
    let day2 = day;
    let days2 = new Date(year2, month2, 1);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    // let t2 = year2 + '-' + month2 + '-' + days2;
    let t2 = year2 + '-' + month2 + '-' + '01';
    return t2;
  }),
  //格式化日期
  dateInit: ((val) => {
    if (val) {
      let tit = '';
      let arry = [];
      let str = "";
      tit = val.replace(/\s*/g, "");
      tit = tit.replace('年', '-');
      tit = tit.replace('月', '-');
      tit = tit + '01';
      arry = tit.split('-');
      if (arry[1] < 10) {
        arry[1] = '0' + arry[1];
      }
      if (arry[2] < 10) {
        arry[2] = '0' + arry[2];
      }
      str = arry.join('-')
      return str;
    }
  }),
  //格式化字符串
  strSub: ((str) => {
    let newStr = '';
    if (str) {
      newStr = str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2);
    }
    return newStr;
  }),
  //获取当前星期几
  getDay: ((date) => {
    let day = 1,
      txt = '';
    if (date) {
      day = new Date(date).getDay();
    }
    switch (day) {
      case 0:
        txt = '星期日';
        break;
      case 1:
        txt = '星期一';
        break;
      case 2:
        txt = '星期二';
        break;
      case 3:
        txt = '星期三';
        break;
      case 4:
        txt = '星期四';
        break;
      case 5:
        txt = '星期五';
        break;
      case 6:
        txt = '星期六';
        break;
    }
    return txt;
  })
}
export {
  funs
};