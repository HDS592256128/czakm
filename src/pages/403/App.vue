<template>
  <div class="login-wrap">
    <!-- <h2>我是403页面</h2> -->
    <!-- <div class="tips">技术支持 科大讯飞－讯飞智元信息科技有限公司</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {
    logout() {
      const _this = this;
      _this.$confirm("无访问权限，请联系管理员！", "消息", {
        confirmButtonText: "确定",
        showClose: false,
        showCancelButton: false,
        closeOnClickModal: false
      }).then(() => {
        window.location.href = process.env.BASE_URL + "/logout";
      });
    }
  },
  mounted() {
    this.logout();
  }
};
</script>

<style lang="scss">
</style>