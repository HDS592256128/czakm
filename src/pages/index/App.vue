<template>
  <div class="layout-main">
    <div class="header" v-if="!fullScreen">
      <div class="topbar f-cb">
        <div class="logo">
          <img src="@/assets/logo.png" />
          <div class="logo-text"></div>
        </div>
      </div>
    </div>
    <div class="layout-wrap f-cb" v-if="loaded && !fullScreen">
      <div class="layout-side">
        <LogInfo></LogInfo>
        <div v-framespr.fix="195">
          <SideNav></SideNav>
        </div>
      </div>
      <div class="layout-content">
        <div class="content-inner"
             id="loadingTarget">
          <Crumb></Crumb>
          <div v-cloak>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div v-if="fullScreen" >
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { mapState, mapActions } from "vuex";
import footer from "@comp/footer";
import SideNav from "./components/sideNav";
import LogInfo from "./components/logInfo";
import Crumb from "./components/crumb";
import TogglerUser from "./components/toggleUser";
import getQueryString from '@/utils/getQueryString.js';

export default {
  components: {
    "jg-footer": footer,
    SideNav,
    TogglerUser,
    Crumb,
    LogInfo
  },
  data: function () {
    return {
      userInfo: {},
      activeName: "mytask",
      loaded: false
    };
  },
  methods: {
    ...mapActions(["getUserInfo", "getIfBound"])
  },
  computed: {
    ...mapState(["subNav", "roleList", "showCrumb",'fullScreen'])
  },
  mounted () {    
    this.loaded = true;
    this.getUserInfo().then(res => {
      this.loaded = true;
    });
    const token = localStorage.getItem("csrf_token");
    if (!token) {
      // window.location.href = process.env.BASE_URL + "/login.html";
    } else {
      this.$store.commit("updateToken", token);
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle-user {
  float: right;
  margin-top: 20px;
}
</style>
<style lang="scss">
.icon-mimaxianshi {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #ddd;
}
.fc0 {
  // color: #409EFF;
  color: #999;
}

input[name="password"] {
  padding-right: 30px;
}
</style>
<style>
.el-col {
  padding-bottom: 10px;
}
</style>