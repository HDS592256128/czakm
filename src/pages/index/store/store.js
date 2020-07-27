import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/common/api/api';
import _ from 'lodash';
import statisticsTop from "./module/statisticsTop";
import statisticsBottom from "./module/statisticsBottom";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    statisticsTop,
    statisticsBottom
  },
  state: {
    fullScreen: false,
    ajaxPendingNum: 0,
    isSupportExport: "",
    token: "",
    userInfo: null,
    userInfoJb: '',
    userInfoJslxbm: '',
    userInfoSsyljg: '',
    roleList: [],
    subNav: [
      {
        name: "regsiter",
        code: "1",
        url: "/scan-regsiter",
        title: "扫码登记",
        icon: "regsiter"
      },
      {
        name: "workers",
        code: "2",
        url: "/medical-workers",
        title: "医护人员管理",
        icon: "scene"
      }, {
        name: "medicalInstitution",
        code: "3",
        url: "/medicalInstitution",
        title: "医疗机构管理",
        icon: "station"
      }, {
        name: "sites",
        code: "4",
        url: "/service-sites",
        title: "服务站点管理",
        icon: "abnormal"
      }, {
        name: "commission",
        code: "5",
        url: "/health-commission",
        title: "卫健人员管理",
        icon: "appeal"
      }, {
        name: "manager",
        code: "6",
        url: "/register-info-manager",
        title: "登记信息管理",
        icon: "role"
      },
      {
        name: "idCardRegsiter",
        code: "7",
        url: "/id-card-regsiter",
        title: "身份证号登记",
        icon: "regsiter"
      },
      {
        name: "phoneRegsiter",
        code: "8",
        url: "/phone-regsiter",
        title: "手机号登记",
        icon: "regsiter"
      },
      {
        name: "dataStatistics",
        code: "9",
        url: "/data-statistics",
        title: "数据统计",
        icon: "statistics"
      }
    //   {
    //   name: "check",
    //   code: "3",
    //   url: "/code-check-manager",
    //   title: "核验记录管理",
    //   icon: "check"
    // }, {
    //   name: "abnormal",
    //   code: "4",
    //   url: "/abnormal-log-manager",
    //   title: "异常信息管理",
    //   icon: "abnormal"
    // }, {
    //   name: "appeal",
    //   code: "9",
    //   url: "/appeal-manager",
    //   title: "申诉信息管理",
    //   icon: "appeal"
    // }, {
    //   name: "scene",
    //   code: "5",
    //   url: "/scene-manager",
    //   title: "场景管理",
    //   icon: "scene"
    // }, {
    //   name: "station",
    //   code: "6",
    //   url: "/station-manager",
    //   title: "检查点管理",
    //   icon: "station",
    //   items: [{
    //       name: "stationList",
    //       code: "6-1",
    //       url: "/station-manager/list",
    //       title: "检查点管理",
    //     },
    //     {
    //       name: "stationType",
    //       code: "6-2",
    //       url: "/station-manager/type",
    //       title: "检查点类型管理",
    //     },
    //     {
    //       name: "stationExamine",
    //       code: "6-3",
    //       url: "/station-examine",
    //       title: "检查点申请审核",
    //     }
    //   ]
    // }, {
    //   name: "area",
    //   code: "7",
    //   url: "/area-people",
    //   title: "区域人员管理",
    //   icon: "area"
    // }, {
    //   name: "checkpeople",
    //   code: "8",
    //   url: "/check-people",
    //   title: "检查人员管理",
    //   icon: "checkpeople"
    // }, {
    //   name: "punch",
    //   code: "10",
    //   url: "/healthy-clock",
    //   title: "健康打卡管理",
    //   icon: 'punch'
    // }, {
    //   name: "statistics",
    //   code: "11",
    //   url: "/data-statistics",
    //   title: "数据统计",
    //   icon: 'statistics'
    // }
    ],
    systemConfig: {},
    activeNav: [],
    showCrumb: true  // true隐藏Crumb
  },
  mutations: {
    setActiveNav(state, obj) {
      const arr = _.cloneDeep(state.activeNav);
      arr[obj.index] = obj.data;
      state.activeNav = arr;
    },
    sendAjaxSetNum(state, flag) {
      if (flag === 'send') {
        state.ajaxPendingNum++;
      } else {
        state.ajaxPendingNum--;
      }
    },
    updateCrumb(state, data) {
      state.showCrumb = data;
    },
    updateUserInfo(state, data) {
      state.userInfo = data;
    },
    updateRoleList(state, data) {
      state.roleList = data;
    },
    upUserInfoJb(state, data) {
      state.userInfoJb = data;
    },
    upUserInfoJslxbm(state, data) {
      state.userInfoJslxbm = data;
    },
    upUserInfoSsyljg(state, data) {
      state.userInfoSsyljg = data;
    },
    updateSystemConfig(state, data) {
      state.systemConfig = data;
      if (data.hasOwnProperty('isSupportExport')) {
        state.isSupportExport = data.isSupportExport;
      }
      if (data.hasOwnProperty('showHealthField')) {
        state.showHealthField = data.showHealthField;
      }
      if (data.hasOwnProperty('showUnusualField')) {
        state.showUnusualField = data.showUnusualField;
      }
      if (data.hasOwnProperty('showAppealDeleteButton')) {
        state.showAppealDeleteButton = data.showAppealDeleteButton;
      }
    },
    updateToken(state, data) {
      state.token = data;
    }
  },
  actions: {
    getUserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/crm/userinfo',
          method: 'post'
        }).then(res => {
          if (_.isObject(res.data) && res.data.id) {
            commit('updateUserInfo', res.data);
            resolve();
          }
        }).catch(err => {
          reject(err);
        });
      });
    }
  }
});
