/*
 * post 方式进行文件下载
 */

function isJsonString(str) {
  try {
    if (typeof JSON.parse(str) == "object") {
      return true;
    }
  } catch (e) {}
  return false;
}

/**
 * @param {String} url 时间字符串
 * @param {Object} data 参数
 * @param {function} callback 下载失败的回调函数
 * @description 文件下载
 * @returns {Object} 错误消息
 */

export default function (url, data, callback) {

  let iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  let form = document.createElement('form');
  form.action = url;
  form.method = 'post';

  data.token = localStorage.getItem('csrf_token');

  for (const key in data) {
    if (!data[key]) continue;
    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.setAttribute('value', data[key]);
    form.appendChild(input);
  }

  document.body.appendChild(iframe);
  iframe.contentWindow.document.body.appendChild(form);

  if (iframe.attachEvent) {
    iframe.attachEvent("onreadystatechange", function () {
      if (iframe.readyState === "complete" || iframe.readyState == "loaded") {
        iframe.detachEvent("onreadystatechange", arguments.callee);
        try {
          var html = iframe.contentWindow.document.body.innerText;
          if (isJsonString(html)) {
            callback ? callback(JSON.parse(html)) : "";
          }

        } catch (error) {

        }
      }
    });
  } else {
    iframe.addEventListener("load", function () {
      this.removeEventListener("load", arguments.call, false);
      try {
        var html = iframe.contentWindow.document.body.innerText;
        if (isJsonString(html)) {
          callback ? callback(JSON.parse(html)) : "";
        }
      } catch (error) {

      }
    }, false);
  }

  form.submit();
};