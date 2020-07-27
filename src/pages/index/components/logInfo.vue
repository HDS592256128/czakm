<template>
  <div class="log-info">
    <div class="f-cb"
         v-if="userInfo">
      <span class="user-photo">
        <img src="@/assets/images/headimg.png"
             alt />
      </span>
      <span class="user-name f-vam">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link f-tac">
            Hi,
            <span :title="userInfo.userName"
                  class="f-ib f-toe f-vam"
                  style="position:relative;top:-1px;max-width: 100px;">{{userInfo.userName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="modifyPass">密码修改</el-dropdown-item> -->
            <el-dropdown-item command="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <div class="line"></div>
      <!-- <span class="log-out f-ib f-vam" @click="confirmlogOut">退出</span> -->
    </div>
    <pass ref="pass"
          :modifyPassVisible.sync="modifyPassVisible"></pass>

    <el-dialog title="温馨提示"
               :visible.sync="dialogVisible"
               width="30%"
               align="center"
               append-to-body
               :close-on-click-modal='false'
               :before-close="handleClose">
      <p style="padding-top:20px; text-align:left">当前密码为默认密码，是否前往修改？</p>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="modifyPass()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import pass from "./pass";

export default {
  data () {
    return {
      dialogVisible: false,
      avatarImgSrc: "",
      useIconHead: false,
      infoShow: false,
      versionDialogVisible: false,
      modifyPassVisible: false
    };
  },
  methods: {
    handleClose () {
      this.dialogVisible = false;
      this.$api.common.logOut().then(res => {
        localStorage.removeItem("csrf_token");
        localStorage.removeItem("csrf_isFirst");
        window.location.href = process.env.BASE_URL + "/login.html";
      });
    },
    handleCommand (command) {
      if (command == "modifyPass") {
        this.modifyPass();
      } else if (command == "logOut") {
        this.confirmlogOut();
      }
    },
    modifyPass () {
      this.dialogVisible = false;
      this.modifyPassVisible = true;
    },
    confirmlogOut () {
      this.$confirm("确认要退出吗？", "消息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$api.common.logOut().then(res => {
            localStorage.removeItem("csrf_token");
            localStorage.removeItem("csrf_isFirst");
            window.location.href = process.env.BASE_URL + "/login.html";
          });
        })
        .catch(() => { });
    },
    downloadFile () {
      window.open(
        `${
        process.env.BASE_URL
        }/common/downOperation.do?fileName=${encodeURIComponent(
          this.fileInfo.name
        )}`
      );
    }
  },
  filters: {
    encry (str) {
      const val = String(str);
      if (_.isString(val) && val.length > 14) {
        const _start = val.substring(0, 6);
        const _end = val.substring(14, 18);
        return `${_start}********${_end}`;
      } else {
        return val;
      }
    }
  },
  components: {
    pass
  },
  computed: {
    userInfo: function () {
      return this.$store.state.userInfo;
    },
    config: function () {
      return this.$store.state.systemConfig;
    },
  },
  mounted () {
    if (!localStorage.getItem('csrf_isFirst') && this.userInfo && this.userInfo.defaultPwd) {
      localStorage.setItem('csrf_isFirst', '1');
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.default-head {
  color: #fff;
  background: #c0c4cc;
  display: block;
  color: #999;
  text-align: center;
  line-height: 36px;
}
.user-photo {
  display: block;
  text-align: center;
  padding: 20px 0 10px;
}
.user-name {
  display: block;
  text-align: center;
  padding-bottom: 15px;
}

.version {
  cursor: pointer;
  color: $theme-color;
}
</style>