/*
 * @Author: chongxuan
 * @Date: 2019-07-29 21:25:45
 * @Description: 获取字典项
 */
export default {
  methods: {
    getDicts () {
      const lxjpStr = Object.keys(this.dictList).join(',');
      this.$api
        .common
        .getDicts({
          lxjp: lxjpStr
        })
        .then(res => {
          if (res.flag) {
            const data = res.data;

            // 循环赋值
            for (const key in this.dictList) {
              this.dictList[key] = data[key];
            }
            if (this.dictHook) {
              this.dictHook();
            }
          } else {
            this.$message.error('获取字典项失败');
          }
        })
        .catch(err => {
          this.$message.error('获取字典项失败');
        });
    }
  },
  mounted () {
    this.getDicts();
  }
};