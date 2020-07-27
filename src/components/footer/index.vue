<template>
  <div class="footer">
    <!-- <p>技术支持：讯飞智元信息科技有限公司</p> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['systemConfig'])
  }
};
</script>
<style lang="scss" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 18px 0;
    background-color: #f5f5f5;
    p {
      text-align: center;
    }
  }
</style>