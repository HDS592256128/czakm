<!--
 * @Descripttion:
 * @version: 编辑信息详情
 * @Author: pjji
 * @Date: 2020-02-23 12:49:46
 * @LastEditors: pjji
 * @LastEditTime: 2020-03-12 22:26:57
 -->
<template>
  <div>
    <!-- 查看详情/查看申请登记信息 -->
    <div class="view-details">
      <!-- 主体 -->
      <div class="info-main clearfix">
        <el-form :model="listForm"
                 :rules="rulesForm"
                 ref="listForm"
                 label-width="130px"
                 class="listForm clearfix">
          <div class="clearfix">
            <el-form-item label="单位编码："
                          prop="unitCode"
                          style="width: 58%;">
              <el-input v-model="listForm.unitCode"
                        placeholder="请输入单位编码"
                        :disabled="pageType == 'view'?true:false"
                        autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="所属区域："
                          style="width: 80%;float: inherit;"
                          prop="areaCode"
                          class="jzd">
              <AreaSelect returnType="object"
                          ref="areaSelect"
                          :label="''"
                          @loaded="init"
                          @change="val=>{area = val}"></AreaSelect>
              <el-input v-if="pageType == 'view'"
                        v-model="listForm.address"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="单位名称："
                          prop="unitName"
                          style="width: 58%;">
              <el-input v-model="listForm.unitName"
                        placeholder="请输入单位名称"
                        :disabled="pageType == 'view'?true:false"
                        autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="绑定检查点："
                          prop="checkPoint"
                          style="width: 58%;">
            </el-form-item>
          </div>
          <div>
            <el-form-item label="考勤单位坐标："
                          prop="attendPointer"
                          style="width: 58%;">
                <el-input
                    v-model="listForm.attendPointer"
                    disabled
                    autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="考勤范围（m）:"
                          prop="attendScope"
                          style="width: 58%;">
                <el-input
                    v-model="listForm.attendScope"
                    autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="考勤规则："
                          prop="attendRule">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="上班时间点"
                            label-width="90px"
                            prop="goWorkTime">
                            <el-time-picker
                                v-model="attendTime.goWorkTime"
                                style="width: 80%;"
                                format="HH:mm">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="允许浮动"
                            label-width="80px"
                            prop="goWorkFloat">
                            <el-input placeholder="请填写" v-model="attendTime.goWorkFloat">
                                <template slot="append">.com</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="下班时间点"
                            label-width="90px"
                            prop="afterWorkTime">
                            <el-time-picker
                                v-model="attendTime.afterWorkTime"
                                style="width: 80%;"
                                format="HH:mm">
                            </el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="允许浮动"
                            label-width="80px"
                            prop="afterWorkFloat">
                            <el-input placeholder="请填写" v-model="attendTime.afterWorkFloat">
                                <template slot="append">.com</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="备注："
                          style="width:100%;"
                          prop="headPhone">
              <el-input v-model="listForm.remarks"
                        type="textarea"
                        :disabled="pageType == 'view'?true:false"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        :placeholder="pageType == 'view'?'':'请输入文本'"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
function dateFormat (str) {
  if (str && str.length > 12) {
    str =
      str.substr(0, 4) +
      "-" +
      str.substr(4, 2) +
      "-" +
      str.substr(6, 2) +
      " " +
      str.substr(8, 2) +
      ":" +
      str.substr(10, 2) +
      ":" +
      str.substr(12, 2);
  }
  return str;
}
import AreaSelect from "@comp/form/area-select";
import _ from "lodash";
// import AreaSelect from "../../area-select/area-select";
export default {
  name: "listDetails",
  props: {
    propsParams: {
      type: Object,
      default: {}
    },
    pageType: {
      type: String,
      default: "view"
    }
    // listForm: {
    //   type: Object,
    //   default: {}
    // }
  },
  components: {
    AreaSelect
  },
  data () {
    let validate1 = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('请输入考勤范围'));
        }
        setTimeout(() => {
            if (!Number(value)) {
                callback(new Error('请输入数字'));
            } else {
                const re = /^[0-9]$|^[0-9]{2}$|^[1,2][0-9]{2}$|^[3][0][0]$/;
                const rsCheck = re.test(value);
                if (!rsCheck) {
                    callback(new Error('请输入1-300间的整数'));
                } else {
                    callback();
                }
            }
        }, 500);
    };
    return {
      areaLoad: false,
      siteTypePicked: [
        {
          siteType: "",
          siteTypeTxt: ""
        }
      ],
      area: [],
      listForm: {
        unitCode:"", //单位编码
        district: "", //区县名称
        county: "", //街道名称
        street: "", //社区名称
        districtCode: "", //区县code
        countyCode: "", //街道code
        streetCode: "", //社区code
        unitName:"", //单位名称
        attendPointer:"", //考勤单位坐标
        attendScope:"", //考勤范围


        siteType: "", //检查点类型代码
        siteTypeTxt: "", //检查点类型名称
        siteName: "", //检查点名称
        scene: "", //场景类型
        sceneCode: "", //场景类型code
        address: "", //检查地点
        addressEx: "", //详细地址
        inOut: "0",//可生成二维码类型
        deptCode: "",//企业单位编码
        headName: "", //检查负责人
        headPhone: "", //检查点负责人联系电话
        remarks: "", //备注
        addressDiv: "",// 末级区域编码
      },
      attendTime:{
          goWorkTime:'',//上班时间
          goWorkFloat:'',//上班浮动
          afterWorkTime:'',//下班时间
          afterWorkFloat:'',//下班浮动
      },
      recordData: [],
      //场景类型
      sceneOptions: [],
      //检查点类型
      siteTypeTxtOptions: [],
      rulesForm: {
        //单位编码
        unitCode:[
            { required: true, message: "请输入单位编码", trigger: "blur" }
        ],
        //单位名称
        unitName:[
            { required: true, message: "请输入单位名称", trigger: "blur" }
        ],
        //考勤单位坐标
        attendPointer:[
            { required: true, message: "请输入考勤单位坐标", trigger: "blur" }
        ],
        //考勤范围
        attendScope: [
          { required: true, validator: validate1, trigger: "blur" },
        ],
        //企业单位编码
        deptCode: [
          {
            max: 18,
            message: "最多不超过18个字符",
            trigger: "submit"
          }
        ],
        //检查负责人
        headName: [
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ],
        //检查点负责人联系电话
        headPhone: [
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ],
        //场景类型
        sceneCode: [
          { required: true, message: "请选择场景类型", trigger: "blur" }
        ],
        //检查点类型
        siteType: [
          { required: true, message: "请选择检查点类型", trigger: "blur" }
        ],
        //检查地点
        areaCode: [
          { required: true, validator: this.validateArea, trigger: "blur" }
        ],
        //详细地址
        addressEx: [
          {
            max: 50,
            message: "最多不超过50个字符",
            trigger: "submit"
          }
        ],
        //检查负责人
        inOut: [
          { required: true, message: "请选择可生成二维码类型", trigger: "blur" }
        ],
        //检查负责人
        createName: [
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ],
        //检查点负责人联系电话
        headPhone: [
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ],
        //备注：
        headPhone: [
          {
            max: 20,
            message: "最多不超过200个字符",
            trigger: "submit"
          }
        ]
      }
    };
  },
  filters: {
    dateFormat: function (str) {
      str = dateFormat(str);
      return str;
    }
  },
  methods: {
    /**
     * 远程下拉搜索框change事件处理，存储完整的数据选中列表
     */
    remoteSelectChange (val, key) { },
    /**
     * @params {Object} 服务端返回数据
     * @description 分页 select 控件 远程数据包装处理函数
     * @returns {Object} 返回控件能够识别的数据结构
     */
    selectPageDataFormat (resp) {
      if (resp.flag) {
        const { total, rows } = resp.data;
        return {
          totalRow: total,
          list: rows
        };
      }
    },
    //检查点校验
    validateArea (rule, value, callback) {
      if (this.area.length > 0) {
        let flag = false;
        this.area.forEach((item, i) => {
          if (item) {
            flag = true;
          }
        });
        if (this.pageType == "edit" && this.listForm.address) {
          flag = true;
        }
        if (flag) {
          callback();
        } else {
          callback(new Error("请选择检查地点"));
        }
      } else {
        if (this.pageType == "edit" && this.listForm.address) {
          callback();
        } else {
          callback(new Error("请选择检查地点"));
        }
      }
    },
    indexMethod (index) {
      return index + 1;
    },
    init () {
      this.areaLoad = true;
    },
    //获取检查点类型字典项
    getSiteTypeTxt (e) {
      this.$api.station
        .querySiteTypeTxtList()
        .then(res => {
          if (res.flag) {
            const data = res.data;
            this.siteTypeTxtOptions = data;
          }
        })
        .catch(err => { });
    },
    //获取场景类型字典项
    siteCjList (e) {
      this.$api.station
        .siteCjList()
        .then(res => {
          if (res.flag) {
            const data = res.data;
            let arr = [];
            data.forEach((item, i) => {
              arr.push({
                scene: item.cjName,
                sceneCode: item.id.toString()
              });
            });
            this.sceneOptions = arr;
          }
        })
        .catch(err => { });
    },
    //获取当前选中区域拼接数据
    addParams () {
      if (this.area.length > 0 && this.area[0]) {
        this.listForm.address = "";
        this.listForm.district = "";
        this.listForm.county = "";
        this.listForm.street = "";
        this.listForm.districtCode = "";
        this.listForm.countyCode = "";
        this.listForm.streetCode = "";
        let arr = [];
        this.area.forEach((item, i) => {
          if (item) {
            arr.push(item.mc);
            switch (i) {
              case 0:
                this.listForm.district = item.mc; //区县名称
                this.listForm.districtCode = item.dm; //区县code
                break;
              case 1:
                this.listForm.county = item.mc; //街道名称
                this.listForm.countyCode = item.dm; //街道code
                break;
              case 2:
                this.listForm.street = item.mc; //社区名称
                this.listForm.streetCode = item.dm; //社区code
                break;
            }
          }
        });
        this.listForm.address = arr.join(",");
      }

      //参数添加行政区划code
      let areaData = _.compact(this.area);
      if (areaData.length) {
        let lastEl = areaData.pop();
        this.listForm.addressDiv = lastEl.dm;
      }

      //检查点类型入参拼接
      if (this.listForm.siteType) {
        this.siteTypeTxtOptions.forEach((item, i) => {
          if (item.siteType == this.listForm.siteType) {
            this.listForm.siteTypeTxt = item.siteTypeTxt;
          }
        });
      } else {
        this.listForm.siteTypeTxt = "";
      }
      //场景类型入参拼接
      if (this.listForm.sceneCode) {
        this.sceneOptions.forEach((item, i) => {
          if (item.sceneCode == this.listForm.sceneCode) {
            this.listForm.scene = item.scene;
          }
        });
      } else {
        this.listForm.scene = "";
      }
    },
    //关闭弹窗
    hide () {
      this.$parent.$parent.detailsDialogFlag = false;
    },
    //回显数据填充请求
    dataFill () {
      this.$api.station
        .siteViewDetail({
          id: this.propsParams.id
        })
        .then(res => {
          if (res.flag) {
            const data = res.data;
            for (var key in data) {
              data[key] = !data[key] ? "" : data[key];
            }
            this.siteTypePicked = [
              {
                siteType: data.siteType,
                siteTypeTxt: data.siteTypeTxt
              }
            ];
            this.listForm = data;

            // 区域数据回显
            if (this.$refs.areaSelect) {
              let adminFullArr = _.compact([
                data.districtCode,
                data.countyCode,
                data.streetCode
              ]);
              this.$refs.areaSelect.setData(adminFullArr);
            }
          } else {
            this.$message.error("信息详情数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);

          this.$message.error("信息详情数据获取失败");
        });
    },
    //编辑回显数据填充请求 不脱敏
    editDataFill () {
      this.$api.station
        .siteEditViewDetail({
          id: this.propsParams.id
        })
        .then(res => {
          if (res.flag) {
            const data = res.data;
            for (var key in data) {
              data[key] = !data[key] ? "" : data[key];
            }
            this.siteTypePicked = [
              {
                siteType: data.siteType,
                siteTypeTxt: data.siteTypeTxt
              }
            ];
            this.listForm = data;

            // 区域数据回显
            if (this.$refs.areaSelect) {
              let adminFullArr = _.compact([
                data.districtCode,
                data.countyCode,
                data.streetCode
              ]);
              this.$refs.areaSelect.setData(adminFullArr);
            }
          } else {
            this.$message.error("信息详情数据获取失败");
          }
        })
        .catch(err => {
          console.log(err);

          this.$message.error("信息详情数据获取失败");
        });
    },
    //编辑
    edit () {
      let that = this;
      that.addParams();
      let params = {
        adminDiv: that.propsParams.adminDiv,
        adminName: that.propsParams.adminName,
        createName: that.propsParams.userName,
        updateName: that.propsParams.userName,
        ...that.listForm
      };
      that.$api.station
        .siteEdit(params)
        .then(res => {
          if (res.flag) {
            that.$message.success(res.errMsg || "操作成功");
            that.$parent.$parent.getList();
            that.hide();
          } else {
            that.$message.error(res.errMsg || "操作失败");
          }
        })
        .catch(err => {
          that.$message.error("操作失败");
        });
    },
    //新增
    add () {
      let that = this;
      that.addParams();
      let params = {
        adminDiv: that.propsParams.adminDiv,
        adminName: that.propsParams.adminName,
        createName: that.propsParams.userName,
        updateName: that.propsParams.userName,
        ...that.listForm
      };
      params.siteName = params.siteName.trim();
      if(!params.siteName){
        return this.$message.error("请输入检查点名称");
      }
      that.$api.station
        .siteAdd(params)
        .then(res => {
          if (res.flag) {
            that.$message.success(res.errMsg || "操作成功");
            that.$parent.$parent.getList();
            that.hide();
          } else {
            that.$message.error(res.errMsg || "操作失败");
          }
        })
        .catch(err => {
          that.$message.error("操作失败");
        });
    },
    //编辑信息详情页提交接口
    detailSubmit () {
      let that = this;
      that.$refs["listForm"].validate(valid => {
        if (valid) {
          switch (that.pageType) {
            case "edit":
              that.edit();
              break;
            case "add":
              that.add();
              break;
          }
        }
      });
    }
  },
  mounted () {
    // this.getSiteTypeTxt();
    // this.siteCjList();
  }
};
</script>
<style lang="scss" scoped>
// @import "~@/assets/styles/_variable.scss";
.view-details {
  padding: 0 5px;
  $fFamily: "微软雅黑";
  font-family: $fFamily;

  .info-main {
    margin-top: 15px;
    .info-table .lab {
      // width: 180px;
      text-align: left;
    }
    .listForm {
      padding-right: 20px;

      .dis_ib {
        width: 40%;
      }
      .des {
        width: 60%;
        font-size: 12px;
        line-height: 24px;
      }
      // border: 1px solid #ddd;
      /deep/ .el-form-item {
        float: left;
      }
      /deep/ .el-form-item:nth-child(2n) {
        margin-left: 4%;
      }
      /deep/ .jzd {
        .el-form-item {
          width: 100%;
        }
      }
      /deep/ .cor-red {
        .el-input__inner {
          color: red !important;
        }
      }
    }
    .change-record {
      margin-top: 30px;
      .title {
        font: {
          size: 16px;
          weight: bold;
        }
      }
    }
  }
}

/deep/.el-select {
  width: 100%;
}
</style>
<style>
.el-dialog__body {
  padding: 10px 25px 30px;
}
</style>
