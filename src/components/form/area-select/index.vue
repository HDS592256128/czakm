<template>
  <div>
    <el-form-item :label="label">
      <el-select
        size="small"
        clearable
        v-model="areaLev1"
        :disabled="lev1dis"
        placeholder="请选择"
        @change="lev1Change"
        style="width:30%;margin-right:4.5%"
      >
        <el-option v-for="item in areaLev1List" :key="item.dm" :label="item.mc" :value="item.dm"></el-option>
      </el-select>
      <el-select
        v-show="!hideLev"
        size="small"
        clearable
        :disabled="lev2dis"
        v-model="areaLev2"
        @change="lev2Change"
        placeholder="请选择"
        style="width:30%;margin-right:4.5%"
      >
        <el-option v-for="item in areaLev2List" :key="item.dm" :label="item.mc" :value="item.dm"></el-option>
      </el-select>
      <!-- <el-select
        v-show="!hideLev"
        @change="change"
        :disabled="lev3dis"
        clearable
        size="small"
        v-model="areaLev3"
        placeholder="请选择"
        style="width:30%"
      >
        <el-option v-for="item in areaLev3List" :key="item.dm" :label="item.mc" :value="item.dm"></el-option>
      </el-select> -->
    </el-form-item>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
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
    hideLev:{
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      options: [],
      areaLev1: "",
      areaLev2: "",
      areaLev3: "",
      areaLev1List: [],
      areaLev2List: [],
      areaLev3List: [],
      lev1dis: false,
      lev2dis: false,
      lev3dis: false
    };
  },
  methods: {
    setData(data) {
      if (_.isArray(data)) {
        if (data[0]) {
          this.areaLev1 = data[0];
          if (!this.lev2dis) {
            this.lev1Change(data[0]);
          }
        } else {
          this.areaLev1 = "";
        }
        if (data[1]) {
          this.areaLev2 = data[1];
          if (!this.lev3dis) {
            this.lev2Change(data[1]);
          }
        } else {
          this.areaLev2 = "";
        }
        if (data[2]) {
          this.areaLev3 = data[2];
        } else {
          this.areaLev3 = "";
        }
        this.change();
      }
    },
    lev1Change(val) {
      this.areaLev2 = "";
      this.areaLev3 = "";
      this.areaLev2List = [];
      this.areaLev3List = [];
      this.change();
      if (val && !this.hideLev) {
        this.getXzqhData(val).then(data => {
          this.areaLev2List = data;
        });
      }
    },
    lev2Change(val) {
      this.areaLev3 = "";
      this.areaLev3List = [];
      this.change();
      if (val) {
        this.getXzqhData(val).then(data => {
          this.areaLev3List = data;
        });
      }
    },
    change() {
      let val = null;
      if (this.returnType == "object") {
        const areaLev1Obj = _.find(this.areaLev1List, ["dm", this.areaLev1]);
        const areaLev2Obj = _.find(this.areaLev2List, ["dm", this.areaLev2]);
        const areaLev3Obj = _.find(this.areaLev3List, ["dm", this.areaLev3]);
        val = [areaLev1Obj, areaLev2Obj, areaLev3Obj];
      } else {
        val = [this.areaLev1 || "", this.areaLev2 || "", this.areaLev3 || ""];
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
              res.data.length > 0 ? this.$store.commit("upUserInfoJb",res.data[0].jb) : '';
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
    initDictData() {
      if (!this.userInfo) {
        return;
      }
      this.getUserXzqh().then(res => {
        const cityCode = res[0] ? res[0].dm : "";
        if (cityCode) {
          this.getXzqhData(cityCode).then(data => {
            this.areaLev1List = data;
            // 判断有没有区县数据
            if (res[1] && !this.noFixed) {
              this.areaLev1 = res[1].dm;
              this.lev1dis = true;
              this.getXzqhData(res[1].dm).then(data => {
                this.areaLev2List = data;
                // 判断有无街道数据
                if (res[2]) {
                  this.areaLev2 = res[2].dm;
                  this.lev2dis = true;
                  this.getXzqhData(res[2].dm).then(data => {
                    this.areaLev3List = data;
                    // 判断有无社区数据
                    if (res[3]) {
                      this.areaLev3 = res[3].dm;
                      this.lev3dis = true;
                      this.change();
                      this.$emit("loaded");
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
          });
        }
      });
    },
    clearSelect(){
      let that = this;
      that.areaLev1 = '';
      that.areaLev2 = '';
      that.areaLev3 = '';
      that.areaLev2List = [];
      that.areaLev3List = [];
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    this.initDictData();
  },
  watch: {
    userInfo: function() {
      this.initDictData();
    },
    areaLev1List: function(){
      this.change();
    },
    areaLev2List: function(){
      this.change();
    },
    areaLev3List: function(){
      this.change();
    }
  }
};
</script>

<style>
</style>
