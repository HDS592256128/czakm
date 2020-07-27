<template>
  <div>
    <el-form-item :label="label" :prop="propTxt">
      <el-select
        size="small"
        clearable
        v-model="areaLev1"
        :disabled="lev1dis||levdisAll"
        placeholder="请选择"
        @change="lev1Change"
        style="width:22%;margin-right:4%"
      >
        <el-option v-for="item in areaLev1List" :key="item.dm" :label="item.mc" :value="item.dm"></el-option>
      </el-select>
      <el-select
        v-show="!hideLev"
        size="small"
        clearable
        :disabled="lev2dis||levdisAll"
        v-model="areaLev2"
        @change="lev2Change"
        placeholder="请选择"
        style="width:22%;margin-right:4%"
      >
        <el-option v-for="item in areaLev2List" :key="item.dm" :label="item.mc" :value="item.dm"></el-option>
      </el-select>
      <el-select
        v-show="!hideLev"
        :disabled="lev3dis||levdisAll"
        clearable
        size="small"
        v-model="areaLev3"
        @change="lev3Change"
        placeholder="请选择"
        style="width:22%;margin-right:4%"
      >
        <el-option v-for="item in areaLev3List" :key="item.dm" :label="item.mc" :value="item.dm"></el-option>
      </el-select>
      <el-select
        v-show="!hideLev"
        @change="change"
        :disabled="lev4dis||levdisAll"
        clearable
        size="small"
        v-model="areaLev4"
        placeholder="请选择"
        style="width:22%"
      >
        <el-option v-for="item in areaLev4List" :key="item.dm" :label="item.mc" :value="item.dm"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    propTxt: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: "登记区域"
    },
    returnType: {
      type: String,
      default: "object"
    },
    noFixed: {
      type: Boolean,
      default: false
    },
    hideLev: {
      type: Boolean,
      default: false
    },
    levdisAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      areaLev1: "",
      areaLev2: "",
      areaLev3: "",
      areaLev4: "",
      areaLev1List: [],
      areaLev2List: [],
      areaLev3List: [],
      areaLev4List: [],
      lev1dis: false,
      lev2dis: false,
      lev3dis: false,
      lev4dis: false
    };
  },
  methods: {
    setData(res) {
      if (_.isArray(res)) {
        this.areaLev1 = res[0];
        if (res[0]) {
          this.getXzqhData(res[0]).then(data => {
            this.areaLev2List = data;
            this.areaLev2 = res[1];
            // 判断有没有区县数据
            if (res[1]) {
              this.getXzqhData(res[1]).then(data => {
                this.areaLev3List = data;
                this.areaLev3 = res[2];
                // 判断有无街道数据
                if (res[2]) {
                  this.getXzqhData(res[2]).then(data => {
                    this.areaLev4List = data;
                    this.areaLev4 = res[3];
                    this.change();
                    this.$emit("loaded");
                  });
                } else {
                  this.change();
                  this.$emit("loaded");
                }
              });
            } else {
              this.change();
              this.$emit("loaded");
            }
          });
        } else {
          this.change();
          this.$emit("loaded");
        }
      }
    },
    lev1Change(val) {
      this.areaLev2 = "";
      this.areaLev3 = "";
      this.areaLev4 = "";
      this.areaLev2List = [];
      this.areaLev3List = [];
      this.areaLev4List = [];
      this.change();
      if (val && !this.hideLev) {
        this.getXzqhData(val).then(data => {
          this.areaLev2List = data;
        });
      }
    },
    lev2Change(val) {
      this.areaLev3 = "";
      this.areaLev4 = "";
      this.areaLev3List = [];
      this.areaLev4List = [];
      this.change();
      if (val) {
        this.getXzqhData(val).then(data => {
          this.areaLev3List = data;
        });
      }
    },
    lev3Change(val) {
      this.areaLev4 = "";
      this.areaLev4List = [];
      this.change();
      if (val) {
        this.getXzqhData(val).then(data => {
          this.areaLev4List = data;
        });
      }
    },
    change() {
      let val = null;
      if (this.returnType == "object") {
        const areaLev1Obj = _.find(this.areaLev1List, ["dm", this.areaLev1]);
        const areaLev2Obj = _.find(this.areaLev2List, ["dm", this.areaLev2]);
        const areaLev3Obj = _.find(this.areaLev3List, ["dm", this.areaLev3]);
        const areaLev4Obj = _.find(this.areaLev4List, ["dm", this.areaLev4]);
        val = [areaLev1Obj, areaLev2Obj, areaLev3Obj, areaLev4Obj];
      } else {
        val = [this.areaLev1 || "", this.areaLev2 || "", this.areaLev3 || "", this.areaLev4 || ""];
      }
      this.$emit("change", val);
    },
    getXzqhData(adminDiv) {
      return new Promise((resolve, reject) => {
        this.$api.common
          .queryXzqhBySjdm({
            sjdm: adminDiv
          })
          .then(res => {
            if (res.flag) {
              resolve(res.data);
              res.data.length > 0 ? this.$store.commit("upUserInfoJb", res.data[0].jb) : '';
            } else {
              reject(res);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getUserXzqh() {
      return new Promise((resolve, reject) => {
        this.$api.common
          .queryUserAreaListByDm({
            dm: this.userInfo.adminDiv
          })
          .then(res => {
            if (res.flag) {
              resolve(res.data);
            } else {
              reject(res);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getFirstXzqh(val) {
      this.$api.common.getXzqhByDm({
        dm: val
      })
      .then(res => {
        if (res.flag) {
          this.areaLev1List = [res.data];
        }
      })
      .catch(err => {});
    },
    initDictData() {
      this.getUserCurrentXzqh();
    },
    clearSelect() {
      const that = this;
      that.areaLev1 = '';
      that.areaLev2 = '';
      that.areaLev3 = '';
      that.areaLev2List = [];
      that.areaLev3List = [];
    },
    cleardata() {
      const that = this;
      that.areaLev1 = '';
      that.areaLev2 = '';
      that.areaLev3 = '';
      that.areaLev4 = '';
      that.areaLev2List = [];
      that.areaLev3List = [];
      that.areaLev4List = [];
    },
    getUserCurrentXzqh() {
      const that = this;
      that.$api.common.getCurrentXzqh({})
        .then(res => {
          if (res.flag) {
            const data = res.data;
            that.$store.commit("upUserInfoJslxbm", data.jslxbm);
            that.$store.commit("upUserInfoSsyljg", data.ssyljg);
            if (data.suoshushengbm) {
              that.lev1dis = true;
              that.getFirstXzqh(data.suoshushengbm);
              that.setData([data.suoshushengbm, data.suoshushibm, data.suoshuqubm, data.suoshujdbm]);
              if (data.suoshushibm) {
                that.lev2dis = true;
                if (data.suoshuqubm) {
                  that.lev3dis = true;
                  if (data.suoshujdbm) {
                    that.lev4dis = true;
                  }
                }
              }
            } else {
              that.getFirstXzqh('340000000000');
              that.$emit("loaded");
            }
          }
        })
        .catch(err => {});
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    this.initDictData();
  }
};
</script>

<style>
</style>
