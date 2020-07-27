<!--
 * @Descripttion:
 * @version: 编辑信息详情
 * @Author: pjji
 * @Date: 2020-02-23 12:49:46
 * @LastEditors: pjji
 * @LastEditTime: 2020-03-24 14:22:51
 -->
<template>
  <div>
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
                 :rules="rulesForm"
                 ref="infoForm"
                 class="infoForm clearfix">
          <div class="fl item-box"
               v-show="showHealthField && showHealthField.split(',').indexOf('userName') > -1">
            <el-form-item label="姓名"
                          prop="userName"
                          v-if="showHealthField && showHealthField.split(',').indexOf('userName') > -1">
              <el-input v-model="infoForm.userName"
                        :disabled="isDisabled"
                        autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('sex') > -1">
            <el-form-item label="性别"
                          prop="sex">
              <el-input :value="infoForm.sex == '1'?'男':(infoForm.sex == '2'?'女':'')"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('userPhone') > -1">
            <el-form-item label="手机号"
                          prop="userPhone">
              <el-input v-model="infoForm.userPhone"
                        :disabled="isDisabled"
                        autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('idCardNo') > -1">
            <el-form-item label="身份证号"
                          prop="idCardNo">
              <el-input v-model="infoForm.idCardNo"
                        disabled
                        autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('orgName') > -1">
            <el-form-item label="工作单位"
                          prop="orgName">
              <el-input v-model="infoForm.orgName"
                        placeholder="请输入工作单位"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('isParty') > -1">
            <el-form-item label="是否党员"
                          prop="isParty">
              <el-select v-model="infoForm.isParty"
                         placeholder="请选择">
                <el-option v-for="item in isPartyOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('hasCar') > -1">
            <el-form-item label="是否有车辆"
                          prop="hasCar">
              <el-select v-model="infoForm.hasCar"
                         placeholder="请选择">
                <el-option v-for="item in hasCarOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="hasCarNum==1">
            <el-form-item label="车辆车牌号"
                          prop="carNum">
              <el-input v-model="infoForm.carNum"
                        placeholder="请输入车辆车牌号"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('hourseType') > -1">
            <el-form-item label="住户类型"
                          prop="hourseType">
              <el-select v-model="infoForm.hourseType"
                         @change="hourseTypeChange"
                         placeholder="请选择">
                <el-option v-for="item in hourseTypeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="fl item-box area"
               v-show="infoForm.hourseType != '6' && showHealthField && showHealthField.split(',').indexOf('adminDiv') > -1">
            <el-form-item label="居住地"
                          class="jzd"
                          prop="area">
              <AreaSelect ref="areaSelect"
                          returnType="object"
                          :label="''"
                          :noFixed="true"
                          :hideLev="hideLev"
                          @loaded="init"
                          @change="val=>{infoForm.area = val}"></AreaSelect>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('addressVillage') > -1">
            <el-form-item v-if="hasIsHFDZ && infoForm.hourseType == '4'"
                          label="酒店名称"
                          prop="addressVillage">
              <el-input v-model="infoForm.addressVillage"
                        placeholder="请输入酒店名称"></el-input>
            </el-form-item>
            <el-form-item v-else-if="hasIsHFDZ && infoForm.hourseType == '5'"
                          label="集体宿舍（工地）名称"
                          prop="addressVillage">
              <el-input v-model="infoForm.addressVillage"
                        placeholder="请输入集体宿舍（工地）名称"></el-input>
            </el-form-item>
            <el-form-item v-else-if="hasIsHFDZ && infoForm.hourseType == '6'"
                          label="目的地"
                          prop="addressVillage">
              <el-input v-model="infoForm.addressVillage"
                        placeholder="请输入目的地名称 如：广州市、美国"></el-input>
            </el-form-item>
            <el-form-item v-else-if="hasIsHFDZ && infoForm.hourseType == '3'"
                          label="小区名称"
                          prop="addressVillage">
              <el-input v-model="infoForm.addressVillage"
                        placeholder="请输入小区名称"></el-input>
            </el-form-item>
            <el-form-item v-else
                          label="小区名称"
                          prop="addressVillage">
              <el-input v-model="infoForm.addressVillage"
                        placeholder="请输入小区名称"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="hasIsHFDZ && infoForm.hourseType == '5'&& infoForm.hourseType != '6'&& showHealthField && showHealthField.split(',').indexOf('doorNo') > -1">
            <el-form-item label="集体宿舍（工地）联系人名称"
                          prop="contactName">
              <el-input v-model="infoForm.contactName"
                        placeholder="请输入集体宿舍（工地）联系人名称"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="hasIsHFDZ && infoForm.hourseType == '5'&& infoForm.hourseType != '6'&& showHealthField && showHealthField.split(',').indexOf('doorNo') > -1">
            <el-form-item label="请输入集体宿舍（工地）联系人电话"
                          prop="contactPhone">
              <el-input v-model="infoForm.contactPhone"
                        placeholder="请输入请输入集体宿舍（工地）联系人电话"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="infoForm.hourseType != '4'&& infoForm.hourseType != '5'&& infoForm.hourseType != '6'&& showHealthField && showHealthField.split(',').indexOf('doorNo') > -1">
            <el-form-item label="楼栋门牌号"
                          prop="doorNo">
              <el-input v-model="infoForm.doorNo"
                        placeholder="请输入楼栋门牌号"></el-input>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('isTouch') > -1">
            <el-form-item label="是否有湖北等重点疫情地区旅行或人员接触史"
                          prop="isTouch">
              <el-select v-model="infoForm.isTouch"
                         placeholder="请选择">
                <el-option v-for="item in isTouchOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('isContactFy') > -1">
            <el-form-item label="近14天内新型冠状病毒感染的肺炎病例接触史"
                          prop="isContactFy">
              <el-select v-model="infoForm.isContactFy"
                         placeholder="请选择">
                <el-option v-for="item in isContactFyOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="fl item-box"
               v-if="showHealthField && showHealthField.split(',').indexOf('isTemNormal') > -1">
            <el-form-item label="体温"
                          prop="isTemNormal">
              <el-select v-model="infoForm.isTemNormal"
                         placeholder="请选择">
                <el-option v-for="item in isTemNormalOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="fl item-box jzd"
               v-if="showHealthField && showHealthField.split(',').indexOf('isBlack') > -1">
            <el-form-item label="是否外市返回"
                          prop="isBlack"
                          style="width:100%">
              <el-select v-model="infoForm.isBlack"
                         placeholder="请选择">
                <el-option v-for="item in isBlackOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
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
// import AreaSelect from "./area-select/area-select";
import AreaSelect from "@comp/form/area-select";
export default {
  name: "editInfoDetails",
  props: {
    id: {
      type: String,
      default: ""
    },
    noControl: {
      type: Boolean,
      default: false
    },
    //是否可以禁用修改, 默认true (禁用编辑)
    isDisabled: {
      type: Boolean,
      default: true
    },
    //1-脱敏，0-不脱敏
    ishid: {
      type: String,
      default: "1"
    },
    // infoForm: {
    //   type: Object,
    //   default: {}
    // }
  },
  components: {
    AreaSelect
  },
  data () {
    var addressVillageValidate = (rule, value, callback) => {
      if (value === '') {
        switch (this.infoForm.hourseType) {
          case '4':
            callback(new Error('酒店名称不能为空'));
            break;
          case '5':
            callback(new Error('集体宿舍（工地）名称不能为空'));
            break;
          case '6':
            callback(new Error('目的地不能为空'));
            break;
          default:
            callback(new Error('小区名称不能为空'));
        }
      } else {
        callback();
      }
    };
    var areaValidate = (rule, value, callback) => {
      let area = _.compact(value);
      if (this.infoForm.hourseType != '6' && area.length == 0) {
        callback(new Error('请选择居住地'));
      } else if (this.infoForm.hourseType == '3' && area.length == 1) { //住宅时校验
        callback(new Error('请选择街道'));
      } else if (this.infoForm.hourseType == '3' && area.length == 2) { //住宅时校验
        callback(new Error('请选择社区'));
      } else {
        callback();
      }
    };
    return {
      hideLev: false,
      editInfoDetailsDialog: false,
      infoForm: {
        area: [],
        createTime: "", //登记时间
        oriHealthStatus: "", //登记时安康码的颜色
        healthStatus: "", //当前安康码的颜色
        userName: "", //姓名
        sex: "", //性别
        userPhone: "", //手机号
        idCardNo: "", //身份证号
        orgName: "", //工作单位
        isParty: "", //是否党员 1是 0否
        hasCar: "", //是否有车辆 1是 0否
        carNum: "", //车辆车牌号
        addressNow: "", //居住地
        // areaName:createTime, //行政区划的名称
        areaCode: "", //行政区划code
        hourseType: "", //住户类型
        contactName: "",//集体宿舍（工地）联系人名称
        contactPhone: "",//集体宿舍（工地）联系人名称
        addressVillage: "", //小区名称/集体宿舍（工地）名称/目的地/酒店名称
        doorNo: "", //楼栋门牌号
        isTouch: "", // 是否有湖北等重点疫情地区旅行或人员接触史 1是 0否
        isContactFy: "", // 近14天内新型冠状病毒感染的肺炎病例接触史 1是 0否
        isTemNormal: "", //体温
        isBlack: "" //是否外市返回 1是 0否
      },
      recordData: [],
      isPartyOptions: [
        {
          //是否党员
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      hasCarOptions: [
        {
          //是否有车辆
          value: "1",
          label: "有"
        },
        {
          value: "0",
          label: "无"
        }
      ],
      isTouchOptions: [
        {
          //是否有湖北等重点疫情地区旅行或人员接触史
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      isContactFyOptions: [
        {
          //近14天内新型冠状病毒感染的肺炎病例接触史
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      isTemNormalOptions: [
        {
          //体温
          value: "1",
          label: "正常（<37.3°）"
        },
        {
          value: "0",
          label: "异常（≥37.3°）"
        }
      ],
      isBlackOptions: [
        {
          //是否外市返回
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      rulesForm: {
        userName: [{
          required: true,
          message: "姓名不能为空",
          trigger: "submit"
        },
        {
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        sex: [{
          required: true,
          message: "性别不能为空",
          trigger: "submit"
        },
        {
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        userPhone: [{
          required: true,
          message: "手机号不能为空",
          trigger: "submit"
        },
        {
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        idCardNo: [{
          required: true,
          max: 50,
          message: "身份证号不能为空",
          trigger: "submit"
        },
        {
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        orgName: [{
          required: true,
          message: "工作单位不能为空",
          trigger: "submit"
        },
        {
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        isParty: [{
          required: true,
          message: "请选择是否党员",
          trigger: "submit"
        }],
        hasCar: [{
          required: true,
          message: "请选择是否有车辆",
          trigger: "submit"
        }],
        carNum: [
          { required: true, message: '请输入车辆车牌号', trigger: 'blur' },
          {
            max: 8,
            message: "最多不超过8个字符",
            trigger: "submit"
          }
        ],
        hourseType: [{
          required: true,
          message: "请选择住户类型",
          trigger: "submit"
        }],
        area: [{
          required: true,
          validator: areaValidate,
          trigger: "submit"
        }],
        addressVillage: [{
          required: true,
          validator: addressVillageValidate,
          trigger: "blur"
        }, {
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        contactName: [{
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        contactPhone: [{
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        doorNo: [{
          required: true,
          message: "楼栋门牌号不能为空",
          trigger: "submit"
        }, {
          max: 50,
          message: "最多不超过50个字符",
          trigger: "submit"
        }],
        isTouch: [{
          required: true,
          message: "请选择是否有湖北等重点疫情地区旅行或人员接触史",
          trigger: "submit"
        }],
        isContactFy: [{
          required: true,
          message: "请选择近14天内新型冠状病毒感染的肺炎病例接触史",
          trigger: "submit"
        }],
        isTemNormal: [{
          required: true,
          message: "请选择体温",
          trigger: "submit"
        }],
        isBlack: [{
          required: true,
          message: "请选择是否外市返回",
          trigger: "submit"
        }],
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
    indexMethod (index) {
      return index + 1;
    },
    init () {
      this.queryViewDetails();
    },
    show () {
      this.editInfoDetailsDialog = true;
    },
    //清空区域
    clearArea (type) {
      if (type) { //true 为屏蔽区域二三级
        this.hideLev = true;
      } else {
        this.hideLev = false;
      }
      this.infoForm.addressNow = '';
      this.infoForm.areaCode = '';
      this.infoForm.area = [];
      this.$refs.areaSelect.setData([])
    },
    hourseTypeChange (val) {
      this.infoForm.addressVillage = '';
      this.infoForm.doorNo = '';
      this.infoForm.contactName = '';
      this.infoForm.contactPhone = '';
      this.$refs["infoForm"].clearValidate('addressVillage');
      this.$refs["infoForm"].clearValidate('area');
      switch (val) {
        case '3': //住宅
          this.clearArea(); //是否屏蔽区域二三级
          break;
        case '4': //酒店
          this.clearArea(true); //是否屏蔽区域二三级
          break;
        case '5': //集体宿舍（工地）
          this.clearArea(true); //是否屏蔽区域二三级
          break;
        case '6': //过境
          this.clearArea(); //是否屏蔽区域二三级
          break;
      }
    },
    //回显数据请求
    //获取信息详情页数据
    queryViewDetails () {
      this.$api.regInfo
        .queryViewDetails({
          id: this.id,
          ishid: this.ishid
        })
        .then(res => {
          if (res.flag) {
            const data = res.data;
            for (const key in data) {
              if (this.infoForm.hasOwnProperty(key)) {
                this.infoForm[key] = data[key];
              }
            }
            // 区域数据回显
            if (data.adminDiv) {
              if (data.hourseType == '4' || data.hourseType == '5') {
                this.hideLev = true;
              }
              this.$refs.areaSelect.setData(data.adminDiv.split(","));
            }
          } else {
            this.$message.error("信息详情数据获取失败");
          }
        })
        .catch(err => {
          this.$message.error("信息详情数据获取失败");
        });
    },
    isLicensePlate (str) {
      return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/.test(str);
    },
    //编辑信息详情页提交接口
    editInfoDetailsSubmit () {
      this.$refs["infoForm"].validate(valid => {
        if (valid) {
          if (this.hasCarNum == 1 && !this.isLicensePlate(this.infoForm.carNum)) {
            this.$message.error("车辆车牌号输入有误！");
            return
          }
          let infoData = {
            id: this.id,
            ...this.infoForm
          };

          let areaData = _.compact(this.infoForm.area);
          if (areaData.length) {
            infoData.addressNow = areaData
              .map(el => {
                return el.mc;
              })
              .join(",");
            infoData.adminDiv = areaData
              .map(el => {
                return el.dm;
              })
              .join(",");
            let lastEl = areaData.pop();
            infoData.areaCode = lastEl.dm;
          }
          delete infoData.area;

          let that = this;
          this.$api.regInfo
            .editInfoDetailsSubmit(infoData)
            .then(res => {
              if (res.flag) {
                this.$message.success("提交成功");

                // 提交数据同步到第三方接口
                this.$api.regInfo.dealAkmHealthService(infoData).then(res => {
                  console.log(res);
                });

                //延迟400ms 用于第三方接口发送，这个接口服务端处理很慢，因此不在停留等待接口
                setTimeout(() => {
                  try {
                    if (this.noControl) {
                      this.$emit("close");
                      return false;
                    }
                    that.$parent.$parent.search();
                    that.$parent.$parent.editInfoDetailsDialog = false;
                  } catch (error) { }
                }, 400);
              } else {
                this.$message.error("提交失败");
              }
            })
            .catch(err => {
              this.$message.error("提交失败");
            });
        }
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
        if (this.infoForm.hasCar == '1') {
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
    hourseTypeOptions () {
      const showHealthField = this.showHealthField;
      if (showHealthField && showHealthField.split(',').indexOf('isHFDZ') > -1) {
        let arr = [
          {
            value: "3",
            label: "住宅"
          },
          {
            value: "4",
            label: "酒店"
          },
          {
            value: "5",
            label: "集体宿舍（工地）"
          },
          {
            value: "6",
            label: "过境"
          }]
        return arr;
      } else {
        let arr = [{
          //住户类型
          value: "1",
          label: "自住户"
        },
        {
          value: "2",
          label: "承租户"
        }]
        return arr;
      }
    }
  },
  mounted () {
    // this.init();
  }
};
</script>
<style lang="scss" scoped>
@import "./css/editInfoDetails.scss";
</style>
<style>
.el-dialog__body {
  padding: 10px 25px 30px;
}
</style>
