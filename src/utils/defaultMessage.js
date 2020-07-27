export default {
  install(Vue) {
    const _message = {
      delete: {
        success: '删除成功',
        error: '删除失败'
      },
      query: {
        success: '查询成功',
        error: '查询失败'
      }
    };
    Vue.prototype._message = _message;
  }
}