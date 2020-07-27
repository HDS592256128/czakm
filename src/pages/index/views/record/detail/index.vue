<template>
  <div>
    <!-- 查看详情/查看申请登记信息 -->
    <div class="view-details">
      <!-- 主体 -->
      <div class="info-main clearfix">
        <el-row>
          <el-col>
            <div class="info-panel-title">
              <i class="el-icon-user"></i>人员信息
            </div>
            <el-form :model="personInfo"
                    ref="hxRecordInfo"
                    class="listForm">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="姓名：">
                    <span>{{personInfo.name}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="手机号：">
                    <span>{{personInfo.phoneNum}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="身份证号：">
                    <span>{{personInfo.idCard}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="info-panel-title">
              <i class="el-icon-document"></i>考勤记录
            </div>
            <div class="search-bar">
                <el-form
                size="small"
                :model="attendRecordForm"
                label-width="120px"
                ref="searchForm"
                >
                    <el-row :gutter="24">
                        <el-col :span="12">
                        <el-form-item label="所属单位" prop="unitName">
                            <el-input placeholder="请输入所属单位" v-model="attendRecordForm.unitName"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="考勤点名称" prop="attendPoinerName">
                            <el-input placeholder="请输入所属单位" v-model="attendRecordForm.attendPoinerName"></el-input>
                        </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="考勤日期" prop="attendDate">
                                <el-date-picker
                                v-model="attendRecordForm.attendDate"
                                type="daterange"
                                style="width: 100%"
                                range-separator="~"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <div class="f-tar">
                                <el-button size="small" type="primary" @click="searchRecord">搜索</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="table-content">
                <el-table :data="attendRecordData" style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="userCode"
                        label="打卡时间"
                        align="center"
                        min-width="150"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column 
                        label="考勤点" 
                        align="center" 
                        prop="expenseMoney" 
                        width="120"
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column 
                        label="考勤单位"
                        width="100"
                        align="center" 
                        prop="cardTypeTxt" 
                        :show-overflow-tooltip="true"
                    ></el-table-column>
                <!-- 数据为空插槽 -->
                <!-- <ListEmpty :isNeverQuery="isNeverQuery" slot="empty"></ListEmpty> -->
                </el-table>
                <div class="pager-wrap f-cb" v-show="total > 0">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNum"
                    :page-size="pageSize"
                    :page-sizes="[5, 10, 20, 50]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
                </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import AreaSelect from "@comp/form/area-select";
import _ from "lodash";
import rangeDate from "@/utils/rangeDateTimeFormat";
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: "listDetails",
  props: {
    // propsParams: {
    //   type: Object,
    //   default: {}
    // },
    pageType: {
      type: String,
      default: "view"
    },
    activityName:{
      type: String,
      default: ""
    },
  },
  computed: {
    user: function() {
      return this.$store.state.userInfo;
    },
  },
  watch:{},
  components: {
    AreaSelect,
    ElImageViewer
  },
  data () {
    return {
      //核销记录
      personInfo:{
        name:'黄大帅', //姓名
        phoneNum:'13545375833', //手机号
        idCard:'42028116564546', //身份证号
      },
      attendRecordForm:{
          unitName:'',
          attendPoinerName:'',
          attendDate:[]
      },
      attendRecordData:[],
      total: null,
      pageSize: 10,
      pageNum: 1,
    };
  },
  methods: {
    //关闭弹窗
    hide () {
      this.$parent.$parent.detailsDialogFlag = false;
    },
    searchRecord(){
        this.stationListData = [];
        this.pageNum = 1;
        // 总数置空
        this.total = null;
        this.getList();
    },
    addParams() {
      let data = _.cloneDeep(this.attendRecordForm);
      let { beginTime, overTime } = rangeDate(data.attendDate);
      data.startDate = beginTime;
      data.endDate = overTime;
      delete data.attendDate;

      return data;
    },
    getList(){
        let that = this;
        let _data = that.addParams();
        let params = {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            ..._data
        };
        console.log(params);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
  },
  mounted () {

  }
};
</script>
<style lang="scss" scoped>
.view-details{
  .info-panel-title{
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    // padding-left: 14px;
    position: relative;
    font-weight: 600;
    border-bottom: 1px dashed #333;
    i{
        font-size: 24px;
        margin-right: 10px;
    }
    // &:after{
    //   content: "";
    //   position: absolute;
    //   width: 6px;
    //   height: 18px;
    //   border-radius: 2px;
    //   left: 0;
    //   top: 6px;
    //   background: #488ce9;
    // }
  }
  .search-bar{
      padding-top: 20px;
  }
}
.empty-content{
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.listForm{
  .labelLeft{
    /deep/ .el-form-item__label{
      text-align: left;
    }
  }
}
</style>
