export default {
  install (Vue) {
    // 将yyyymmddhhmmss时间转化为 template标识的格式
    Vue.filter('bsdttimeStr', (value, template = 'yyyy-mm-dd hh:nn') => {
      if (!value) {
        return '-';
      }
      const y = value.substring(0, 4);
      const m = value.substring(4, 6);
      const d = value.substring(6, 8);
      const h = value.substring(8, 10);
      const n = value.substring(10, 12);
      const s = value.substring(12, 14);
      let t = template.replace('yyyy', y);
      t = t.replace('mm', m);
      t = t.replace('dd', d);
      t = t.replace('hh', h);
      t = t.replace('nn', n);
      t = t.replace('ss', s);
      return t;
    });

    // 手机号脱敏处理
    Vue.filter('encPhone', (value) => {
      if (!value) {
        return '暂无号码';
      }
      const pat = /(\d{3})\d*(\d{4})/;
      const encPhone = value.replace(pat, '$1****$2');
      return encPhone;
    });

    // 姓名脱敏处理
    Vue.filter('encName', (value) => {
      if (!value) {
        return '';
      }
      const l = value.length;
      return '*' + value.substring(1, l);
    });

    // 按长度截取字符串长度
    Vue.filter('maxstr', (value, l, sub = '') => {
      if (!l || !value) {
        return value;
      }
      return value.substring(0, l) + (value.length > l ? sub : '');
    });

    // 根据↵换行
    Vue.prototype.enter = function (value) {
      if (!value) {
        return value;
      }
      const reg = /\n/g;
      const html = value.replace(reg, '<br />');
      return html;
    };

    // 关键词高亮 使用v-html绑定
    Vue.prototype.highLight = function (value, str) {
      if (!value || !str) {
        return value;
      }
      const reg = new RegExp(str, 'g');
      const html = value.replace(reg, `<span style="color:red;">${str}</span>`);
      return html;
    };

    // 关键词高亮 使用v-html绑定
    Vue.prototype.highLight = function (value, str) {
      if (!value || !str) {
        return value;
      }
      const reg = new RegExp(str, 'g');
      const html = value.replace(reg, `<span style="color:red;">${str}</span>`);
      return html;
    };


    Vue.prototype.jgdateFormat = function (value, template) {
      if (!value) {
        return '';
      }
      const date = new Date(value);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const n = date.getMinutes();
      const s = date.getSeconds();
      let tem = template || 'yyyy-mm-dd hh:nn';
      tem = tem.replace('yyyy', y);
      tem = tem.replace('mm', m >= 10 ? m : '0' + m);
      tem = tem.replace('dd', d >= 10 ? d : '0' + d);
      tem = tem.replace('hh', h >= 10 ? h : '0' + h);
      tem = tem.replace('nn', n >= 10 ? n : '0' + n);
      tem = tem.replace('ss', s >= 10 ? s : '0' + s);
      return tem;
    };
  }
};