<template>
  <div ref="scrollWrap"
       style="height:100%;overflow:hidden;">
    <el-menu unique-opened
             :default-active="defaultActive"
             :default-openeds="openeds"
             @open="openChange"
             @select="menuChange"
             router
             class="side-menu">
      <template v-for="menu in menuList">
        <el-menu-item v-if="!menu.items || menu.items.length===0"
                      :key="menu.code"
                      :index="menu.url">
          <span class="menu-icon"
                v-if="menu.icon">
            <i class="iconfont"
               :class="`icon-${menu.icon}`"></i>
          </span>
          {{menu.title}}
        </el-menu-item>
        <el-submenu v-else
                    :index="menu.url"
                    :key="menu.code">
          <template slot="title">
            <span class="menu-icon"
                  v-if="menu.icon">
              <i class="iconfont"
                 :class="`icon-${menu.icon}`"></i>
            </span>
            {{menu.title}}
          </template>
          <el-menu-item v-for="child in menu.items"
                        :key="child.code"
                        :index="child.url">{{child.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
import _ from "lodash";
import BScroll from "better-scroll";

export default {
  data () {
    return {
      defaultActive: "/regsiter-info",
      openeds: ['/check-info-manager'], //默认展开的submenu Index数组
      scroll: null,
      isInit: true,
      menuList: []
    };
  },
  computed: {
    ...mapState(["subNav", "roleList", "userInfo"])
  },
  methods: {
    menuChange (val) {
      const linearArray = _.flatMapDeep(this.menuList, el => {
        const items = el.items || [];
        return [el, items];
      });
      let menu = _.find(linearArray, ["url", val]);
      if (menu.name == 'codeshow') { //亮码记录新增tip
        menu.tipName = menu.title + '（ 注：列表数据中的姓名/身份证/手机号，为该人员亮码时的个人信息 ）'
      }
      this.$store.commit("setActiveNav", {
        index: 0,
        data: menu
      });
    },
    openChange () {
      this.scroll ? this.scroll.refresh() : "";
    },
    initNav() {
      const that = this;
      const target = [
        {
          "title": "考勤单位管理",
          'tipName': '考勤单位管理',
          "code": "unit",
          "url": '/unit',
          "icon": 'punch',
          "sort": "1",
          "items": []
        },
        {
          "title": "考勤记录管理",
          'tipName': '考勤记录管理',
          "code": "record",
          "url": '/record',
          "icon": 'punch',
          "sort": "1",
          "items": []
        }
      ];
      // 过滤一级菜单
//      that.userInfo && that.userInfo.menuList.forEach(function(item2) {
//        that.subNav.forEach(function(item) {
//          if (item.name === item2.code) {
//            target.push(item);
//          }
//        });
//      });
      // 过滤二级菜单
      // target.forEach(el => {
      //   if (el.items && el.items.length) {
      //     el.items = el.items.filter(child => {
      //       let obj = _.find(this.userInfo.menuList, ["menuCode", child.name]);
      //       if (obj) {
      //         child.sort = obj.menuOrder;
      //         return true;
      //       } else {
      //         return true;
      //       }
      //     });
      //     // 排序
      //     _.sortBy(el.items, "sort");
      //   }      console.log('过滤二级菜单3',target)

      // });

      that.menuList = target;

      if (target.length) {
        that.$router.push(target[0].url);
        that.menuChange(target[0].url);
        that.defaultActive = target[0].url;
      }
    }
  },
  mounted() {
    const that = this;
    const _path = window.location.hash.replace("#", "");
    that.$nextTick(() => {
      that.scroll = new BScroll(that.$refs.scrollWrap, {
        scrollbar: true,
        mouseWheel: {
          speed: 10,
          invert: false,
          easeTime: 400
        }
      });
      setTimeout(function() {
        that.initNav();
      }, 800);
    });
  },
  watch: {
    subNav: function() {
      this.initNav();
    },
    roleList: function() {
      this.initNav();
    }
  }
};
</script>

<style lang="scss">
.menu-icon {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-right: 3px;
  .iconfont {
    font-size: 18px;
    color: #fff;
  }
}
.el-submenu__title i {
  color: #fff;
}
.side-menu .el-menu-item.is-active,
.side-menu .el-menu-item:hover,
.side-menu .el-submenu__title.is-active,
.side-menu .el-submenu__title:hover {
  background-size: 188px;
}
</style>