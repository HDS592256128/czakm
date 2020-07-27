<!--
 * @Descripttion:
 * @version: 查看详情
 * @Author: pjji
 * @Date: 2020-02-23 12:49:46
 * @LastEditors: pjji
 * @LastEditTime: 2020-03-19 15:44:59
 -->
<template>
  <div>
    <el-dialog title="查看详情"
               :visible.sync="viewInfoDetailsDialog"
               width="80%"
               :close-on-click-modal="false">
      <!-- 查看详情/查看申请登记信息 -->
      <div class="view-details">
        <div class="info-head">
          <span class="head-tit">申请登记信息</span>
          <span class="head-line">
            <span>登记时间：</span>
            <span class="head-val">{{infoForm.createTime | dateFormat}}</span>
          </span>
          <span class="head-line">
            <span>登记时安康码的颜色：</span>
            <span class="head-val color-box"
                  :class="{'green':infoForm.oriHealthStatus == '1','yellow':infoForm.oriHealthStatus == '2','red':infoForm.oriHealthStatus == '3'}">{{ infoForm.oriHealthStatus == '' ? '发放中' : ''}}</span>
          </span>
          <span class="head-line">
            <span>当前安康码的颜色：</span>
            <span class="head-val color-box"
                  :class="{'green':infoForm.healthStatus == '1','yellow':infoForm.healthStatus == '2','red':infoForm.healthStatus == '3'}">{{ infoForm.healthStatus == '' ? '发放中' : ''}}</span>
          </span>
        </div>
        <!-- 主体 -->
        <div class="info-main clearfix">
          <el-form :model="infoForm"
                   status-icon
                   :rules="rules"
                   class="infoForm clearfix">
            <el-form-item label="姓名"
                          v-if="showHealthField && showHealthField.split(',').indexOf('userName') > -1">
              <el-input v-model="infoForm.userName"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别"
                          v-if="showHealthField && showHealthField.split(',').indexOf('sex') > -1">
              <el-input :value="infoForm.sex == '1'?'男':(infoForm.sex == '2'?'女':'')"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号"
                          v-if="showHealthField && showHealthField.split(',').indexOf('userPhone') > -1">
              <el-input v-model="infoForm.userPhone"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号"
                          v-if="showHealthField && showHealthField.split(',').indexOf('idCardNo') > -1">
              <el-input v-model="infoForm.idCardNo"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作单位"
                          v-if="showHealthField && showHealthField.split(',').indexOf('orgName') > -1">
              <el-input v-model="infoForm.orgName"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否党员"
                          v-if="showHealthField && showHealthField.split(',').indexOf('isParty') > -1">
              <el-input v-model="infoForm.isParty"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否有车辆"
                          v-if="showHealthField && showHealthField.split(',').indexOf('hasCar') > -1">
              <el-input v-model="infoForm.hasCar"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="车辆车牌号"
                          v-if="hasCarNum==1">
              <el-input v-model="infoForm.carNum"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="居住地"
                          v-if="showHealthField && showHealthField.split(',').indexOf('addressNow') > -1">
              <el-input v-model="
                          infoForm.addressNow"
                        disabled
                        autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item label="住户类型"
                          v-if="showHealthField && showHealthField.split(',').indexOf('hourseType') > -1">
              <el-input disabled
                        v-model="infoForm.hourseType"></el-input>
            </el-form-item>
            <el-form-item :label="addressVillageLabel"
                          v-if="showHealthField && showHealthField.split(',').indexOf('addressVillage') > -1">
              <el-input v-model="infoForm.addressVillage"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="集体宿舍（工地）联系人名称"
                          v-if="showHealthField && curHourseType == '5' && showHealthField.split(',').indexOf('addressVillage') > -1">
              <el-input v-model="infoForm.contactName"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="集体宿舍（工地）联系人电话"
                          v-if="showHealthField && curHourseType == '5' && showHealthField.split(',').indexOf('addressVillage') > -1">
              <el-input v-model="infoForm.contactPhone"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="楼栋门牌号"
                          v-if="showHealthField && showDoorNo && showHealthField.split(',').indexOf('doorNo') > -1">
              <el-input v-model="infoForm.doorNo"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否有湖北等重点疫情地区旅行或人员接触史"
                          v-if="showHealthField && showHealthField.split(',').indexOf('isTouch') > -1">
              <el-input :value="infoForm.isTouch == '1'?'是':(infoForm.isTouch == '0'?'否':'')"
                        :class="{'cor-red':infoForm.isTouch == '1'}"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="近14天内新型冠状病毒感染的肺炎病例接触史"
                          v-if="showHealthField && showHealthField.split(',').indexOf('isContactFy') > -1">
              <el-input :value="infoForm.isContactFy == '1'?'是':(infoForm.isContactFy == '0'?'否':'')"
                        :class="{'cor-red':infoForm.isContactFy == '1'}"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <!-- 新增 start-->
            <el-form-item label="同楼道、办公区域有确诊病例"
                          v-if="showHealthField && showHealthField.split(',').indexOf('isNearbyHas') > -1">
              <el-input :value="infoForm.isNearbyHas == '1'?'是':(infoForm.isNearbyHas == '0'?'否':'')"
                        :class="{'cor-red':infoForm.isNearbyHas == '1'}"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否有发热、干咳、气促、呼吸道症状"
                          v-if="showHealthField && showHealthField.split(',').indexOf('isSick') > -1">
              <el-input :value="infoForm.isSick == '1'?'是':(infoForm.isSick == '0'?'否':'')"
                        :class="{'cor-red':infoForm.isSick == '1'}"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="来源地类型"
                          v-if="showHealthField && showHealthField.split(',').indexOf('nativeType') > -1">
              <el-input :value="infoForm.nativeType == 'gn'?'国内':(infoForm.nativeType == 'gw'?'国外':'')"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="来源地"
                          v-if="showHealthField && showHealthField.split(',').indexOf('nativePlace') > -1">
              <el-input :value="infoForm.nativePlace"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="途径城市"
                          v-if="showHealthField && showHealthField.split(',').indexOf('wayCity') > -1">
              <el-input :value="infoForm.wayCity"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="来肥时间"
                          v-if="showHealthField && showHealthField.split(',').indexOf('arrivalTime') > -1">
              <el-input :value="infoForm.arrivalTime"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="交通工具"
                          v-if="showHealthField && showHealthField.split(',').indexOf('vehicle') > -1">
              <el-input :value="infoForm.vehicle"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="车牌或车次或航班号"
                          v-if="showHealthField && showHealthField.split(',').indexOf('vehicleNo') > -1">
              <el-input :value="infoForm.vehicleNo"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
            <!-- 新增 end-->
            <el-form-item label="体温"
                          v-if="showHealthField && showHealthField.split(',').indexOf('isTemNormal') > -1">
              <el-input :value="infoForm.isTemNormal == '1'?zcText:(infoForm.isTemNormal == '0'?ycText:'')"
                        :class="{'cor-red':infoForm.isTemNormal == '0'}"
                        disabled></el-input>
            </el-form-item>

            <el-form-item label="是否外市返回"
                          v-if="showHealthField && showHealthField.split(',').indexOf('isBlack') > -1">
              <el-input :value="infoForm.isBlack == '1'?'是':(infoForm.isBlack == '0'?'否':'')"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
          </el-form>

          <!-- 修改记录 新增显隐控制-->
          <div class="change-record"
               v-if="showHealthField && showHealthField.split(',').indexOf('isShowChangeRecord') > -1">
            <p class="title">修改记录：</p>
            <el-table :data="recordData"
                      style="width: 100%">
              <el-table-column type="index"
                               :index="indexMethod"
                               label="序号"
                               width="80"></el-table-column>
              <el-table-column prop="createTime"
                               label="时间"></el-table-column>
              <el-table-column prop="name"
                               label="操作人"></el-table-column>
              <el-table-column prop="address"
                               label="操作">
                <template slot-scope="scope">
                  <span v-if="scope.row.isCurrentVersion == '1'">当前版本</span>
                  <el-button v-else
                             @click="viewChangeRecord(scope.row)"
                             type="text"
                             size="small">查看修改记录</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!--  -->
        </div>
      </div>

      <!-- 查看详情弹出层 -->
      <changeRecord ref="changeRecordDialog" />

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="viewInfoDetailsDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
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
import changeRecord from "./changeRecord.vue"; //查看修改记录
export default {
  name: "viewInfoDetails",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  components: {
    changeRecord
  },
  data () {
    return {
      viewInfoDetailsDialog: false,
      zcText: "正常(<37.3°)",
      ycText: "异常(≥37.3°)",
      addressVillageLabel: '小区名称',
      showDoorNo:true,
      curHourseType:'1',
      infoForm: {
        createTime: "", //登记时间
        oriHealthStatus: "", //登记时安康码的颜色
        healthStatus: "", //当前安康码的颜色
        userName: "", //姓名
        sex: "", //性别
        userPhone: "", //手机号
        idCardNo: "", //身份证号
        orgName: "", //工作单位
        isParty: "", //是否党员 1是 0否
        hasCar: "", //是否有车辆 1有 0无
        carNum: "", //车牌号
        addressNow: "", //居住地
        hourseType: "", //住户类型  1自住户 2 承租户
        addressVillage: "", //小区名称
        contactName:"",//集体宿舍（工地）联系人名称
        contactPhone:"",//集体宿舍（工地）联系人电话
        doorNo: "", //楼栋门牌号
        isTouch: "", // 是否有湖北等重点疫情地区旅行或人员接触史 1是 0否
        isContactFy: "", // 近14天内新型冠状病毒感染的肺炎病例接触史 1是 0否
        isTemNormal: "", //体温 1正常 0异常
        isBlack: "", //是否外市返回 1是 0否
        isNearbyHas: "", //新增字段---同楼道、办公区域有确诊病例
        isSick: "", //是否有发热、干咳、气促、呼吸道症状
        nativeType: "", //是否有发热、干咳、气促、呼吸道症状
        nativePlace: "", //来源地
        wayCity: "", //途径城市
        arrivalTime: "", //来肥时间
        vehicle: "", //交通工具
        vehicleNo: "", //车牌或车次或航班号
      },
      rules: {
        userName: [
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ],
        userPhone: [
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ],
        idCardNo: [
          {
            max: 20,
            message: "最多不超过20个字符",
            trigger: "submit"
          }
        ]
      },
      recordData: []
    };
  },
  filters: {
    dateFormat: function (str) {
      str = dateFormat(str);
      return str;
    }
  },
  methods: {
    indexMethod (index) {
      return index + 1;
    },
    show () {
      this.viewInfoDetailsDialog = true;
    },
    //查看修改记录
    viewChangeRecord (row) {
      this.$refs.changeRecordDialog.show();
      this.$refs.changeRecordDialog.queryViewChangeRecord(
        row.id,
        row.createTime
      );
    },
    //获取信息详情页数据
    queryViewDetails (currentId) {
      this.$api.regInfo
        .queryViewDetails({
          id: currentId
        })
        .then(res => {
          if (res.flag) {
            const data = res.data;
            for (const key in data) {
              if (this.infoForm.hasOwnProperty(key)) {
                if (key == "isParty" || key == "hasCar") {
                  let val = "";
                  if (data[key] == "1") {
                    val = "是";
                  } else if (data[key] == "0") {
                    val = "否";
                  }
                  this.infoForm[key] = val;
                } else if (key == "hourseType") {
                  let val = "";
                  this.curHourseType = data[key];
                  switch (data[key]) {
                    case '1':
                      val = "自住户";
                      this.addressVillageLabel = '小区名称';
                      break;
                    case '2':
                      val = "承租户";
                      this.addressVillageLabel = '小区名称';
                      break;
                    case '3':
                      val = "住宅";
                      this.addressVillageLabel = '小区名称';
                      break;
                    case '4':
                      val = "酒店";
                      this.addressVillageLabel = '酒店名称';
                      this.showDoorNo = false;
                      break;
                    case '5':
                      val = "集体宿舍（工地）";
                      this.addressVillageLabel = '集体宿舍（工地）名称';
                      this.showDoorNo = false;
                      break;
                    case '6':
                      val = "过境";
                      this.addressVillageLabel = '目的地';
                      this.showDoorNo = false;
                      break;
                  }
                  this.infoForm[key] = val;
                } else {
                  this.infoForm[key] = data[key];
                }
              }
            }
          } else {
            this.$message.error("信息详情数据获取失败");
          }
        })
        .catch(err => {
          this.$message.error("信息详情数据获取失败");
        });
    },
    //获取修改记录数据
    queryChangeRecord (currentId) {
      this.$api.regInfo
        .queryChangeRecord({
          healthId: currentId
          // healthId: '9EFF2A284E236DB0E0534A3F1FACD14B'
        })
        .then(res => {
          if (res.flag) {
            const data = res.data;
            if (data.length > 0) {
              data.forEach((item, i) => {
                item.createTime = dateFormat(item.createTime);
                item.name = item.account + "(" + item.createUserName + ")";
              });
              this.recordData = data;
            } else {
              this.recordData = [];
            }
          } else {
            this.$message.error("修改记录数据获取失败");
          }
        })
        .catch(err => {
          this.$message.error("修改记录数据获取失败");
        });
    }
  },
  computed: {
    showHealthField () {
      return this.$store.state.showHealthField;
    },
    hasCarNum () {
      const showHealthField = this.showHealthField;
      if (showHealthField && showHealthField.split(',').indexOf('hasCar') > -1) {
        if (this.infoForm.hasCar == '是') {
          return 1
        } else {
          return 0
        }
      }
    },
    hasIsHFDZ () {
      const showHealthField = this.showHealthField;
      if (showHealthField && showHealthField.split(',').indexOf('isHFDZ') > -1) {
        return true;
      } else {
        return false;
      }
    },
  }
};
</script>
<style lang="scss" scoped>
// @import "~@/assets/styles/_variable.scss";
.view-details {
  padding: 0 20px;
  $fFamily: "微软雅黑";
  font-family: $fFamily;

  .info-head {
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;

    .head-tit {
      //   margin-right: 15px;
      margin-right: 10%;
      font: {
        size: 20px;
        weight: bold;
      }
    }
    .head-line {
      //   margin-left: 10px;
      margin-left: 5%;
      font: {
        size: 13px;
        weight: bold;
      }
    }
    .head-val {
      font: {
        size: 13px;
        weight: 400;
      }
    }
    .color-box {
      display: inline-block;
      margin-bottom: 5px;
      vertical-align: middle;
      width: 62px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 5px;

      &.red {
        background-color: $tag-red;
      }
      &.yellow {
        background-color: $tag-yellow;
      }
      &.green {
        background-color: $tag-green;
      }
    }
  }

  .info-main {
    margin-top: 15px;
    .info-table .lab {
      // width: 180px;
      text-align: left;
    }
    .infoForm {
      padding: 10px 20px;
      border: 1px solid #ddd;

      /deep/ .el-form-item {
        float: left;
        width: 48%;
      }
      /deep/ .el-form-item:nth-child(2n) {
        margin-left: 4%;
      }
      // .item-box {
      //   padding: 0 30px;
      //   width: 50%;
      // }
      //  /deep/ .jzd {
      //   width: 100%;
      //   .el-form-item {
      //     width: 100%;
      //   }
      // }

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
</style>
<style>
.el-dialog__body {
  padding: 10px 25px 30px;
}
</style>
