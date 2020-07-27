<template>
  <div class="toggle-user">
    <el-dropdown v-show="list.length"
                 @command="handleCommand">
      <span class="el-dropdown-link">
        切换账号
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="true">{{userInfo && (userInfo.siteName||userInfo.adminName)}}</el-dropdown-item>
        <el-dropdown-item v-for="(item,i) in list"
                          :key="i"
                          :divided="i == 0"
                          :command="item.account">{{item.siteName||item.adminName}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
      list: []
    };
  },
  computed: {
    ...mapState(["userInfo", "roleList"]),
    isStationRole () {
      // 是否为检查人员或者检查人员管理员
      return this.roleList.includes("1") || this.roleList.includes("2");
    }
  },
  methods: {
    handleCommand (command) {
      let that = this;
      this.$api.common
        .changeSite({
          account: command
        })
        .then(res => {
          if (res.flag) {
            this.$message.success("切换成功，即将刷新");
            setTimeout(() => {
              window.location.href = process.env.BASE_URL + "/index.html";
            }, 500);
          } else {
            this.$message.error("切换失败");
          }
        });
    },
    getList () {
      this.$api.common.queryMyOtherSites().then(res => {
        this.list = res.data;
      });
    },
    init () {
      this.getList();
    }
  },
  // mounted () {
  //   if (this.isStationRole) {
  //   this.getList();
  //   }
  // },
  // watch: {
  //   isStationRole: function () {
  //     if (this.isStationRole) {
  //     this.getList();
  //     }
  //   }
  // }
};
</script>

<style>
</style>