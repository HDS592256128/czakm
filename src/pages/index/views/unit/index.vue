<!--
 * @Descripttion:
 * @version: 商家报名审核
 * @Author: pjji
 * @Date: 2020-02-23 12:49:46
 * @LastEditors: lkai
 * @LastEditTime: 2020-04-20 16:00:41
 -->
<template>
  <div id="verification" class="content-body">
    <div class="content-view">
      <div class="search-bar">
        <el-form
          size="small"
          :model="searchForm"
          label-width="80px"
          ref="searchForm"
          :rules="searchFormRule"
        >
          <el-row :gutter="24">
            <el-col :span="6">
              <AreaSelect
                label="区域"
                retuenType="object"
                @change="setAddressNow"
                @loaded="areaDataComplete = true"
              ></AreaSelect>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单位名称" label-width="80px" prop="unitName">
                <el-input placeholder="请输入商家名称" v-model="searchForm.unitName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="status" label-width="90px">
                <el-select v-model="searchForm.status" clearable placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="f-tar">
                <el-button
                  size="small"
                  type="primary"
                  @click="searchFun($event)"
                >搜索</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="addNew"
                >新增</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="addNew"
                >导出数据</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table-content">
        <el-table :data="stationListData" style="width: 100%">
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="userName" label="单位编码" align="center" width="90">
            <template slot-scope="scope">
              <span
                :title="scope.row.userName"
                class="ell link-btn"
                type="text"
                @click="viewFun(scope.row)"
              >{{scope.row.userName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userCode"
            label="单位名称"
            align="center"
            min-width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column 
            label="所属区域" 
            align="center" 
            prop="expenseMoney" 
            width="120"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column 
            label="状态"
            width="100"
            align="center" 
            prop="cardTypeTxt" 
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="expenseTime"
            label="创建时间"
            align="center"
            width="132"
            :show-overflow-tooltip="true"
          >
            <!-- <template slot-scope="scope">
              <span
                :title="scope.row.expenseTime.substr(0,16)"
                class="ell"
                type="text"
              >{{scope.row.expenseTime.substr(0,16)}}</span>
            </template> -->
          </el-table-column>

          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="viewFun(scope.row)"
              >启用</el-button>
              <el-button
                type="text"
                @click="viewFun(scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                @click="viewFun(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="delectData(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
          <!-- 数据为空插槽 -->
          <ListEmpty :isNeverQuery="isNeverQuery" slot="empty"></ListEmpty>
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
    </div>
    <!-- 详情弹出层 -->
    <el-dialog
      :title="dialogTitle"
      center
      :visible.sync="detailsDialogFlag"
      width="800px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <Detail
        v-if="detailsDialogFlag"
        :propsParams="propsParams"
        :pageType="pageType"
        ref="detailsDialog"
      />
      <div slot="footer" class="dialog-footer">
        <el-button v-if="pageType == 'view'" @click="detailsDialogFlag = false">关 闭</el-button>
        <el-button
          v-if="pageType == 'add' || pageType == 'edit'"
          @click="detailsDialogFlag = false"
        >取 消</el-button>
        <el-button
          v-if="pageType == 'add' || pageType == 'edit'"
          type="primary"
          style="margin-left: 20px;"
          @click="submit($event)"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 详情弹出层 -->
    <!-- <el-dialog
      :title="dialogTitle"
      :visible.sync="detailsDialogFlag"
      width="800px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <Detail
        v-if="detailsDialogFlag"
        :pageType="pageType"
        :siteId="siteId"
        :activityId="activityObj.id"
        :activityName="activityName"
        ref="detailsDialog"
      />
      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button v-if="pageType == 'view'" @click="detailsDialogFlag = false">关 闭</el-button>
        
      </div>
    </el-dialog> -->
    <!-- <MapModal ref="mapModal" :dialogVisible="dialogVisible"></MapModal> -->
  </div>
</template>

<script>
function dateFormat(str) {
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
// import pagination from "@/components/pagination/pagination.vue";
import Detail from "./detail";
// import rangeDate from "@/utils/rangeDateTimeFormat";
// import downloadFile from "@/utils/downloadFile";
// import MapModal from "./mapModal";
export default {
  components: {
    AreaSelect,
    // pagination,
    Detail,
    // MapModal
  },
  data() {
    let validActive=(rule,value,callback)=>{
        if(this.activityObj.id){
            callback()
        }else{
            callback(new Error('请选择活动名称'))
        }
    };
    return {
      dialogVisible:false,
      // 区域控件是否已经初始化完成
      areaDataComplete: false,
      // 是否未开始查询数据
      isNeverQuery: true,
      //状态
      statusOptions: [
        {name:'全部',code:'0'},
        {name:'启用',code:'1'},
        {name:'禁用',code:'2'},
      ],
      currentRow: [], //当前列表数据
      isNoData: true,
      siteTypeDisabled: false,
      detailsDialogFlag: false, //详情弹出层
      deleteDialog: false, //删除弹出层
      dialogTitle: "查看",
      pageType: "view", //页面类型 view查看  edit编辑  add新增
      //当前列表相关数据
      activityObj: {}, //参与活动
      searchForm: {
        addressNow: "", //区域
        adminDiv: "", //区域
        unitName: "", //单位名称
        status: "", //状态
      },
      searchFormRule: {},
      stationListData: [
        {name:'黄大帅'}
      ], //列表数据
      total: null,
      pageSize: 10,
      pageNum: 1,
      //传到详情页id
      siteId:'',
      propsParams:{}
    };
  },
  filters: {
    dateFormat: function(str) {
      str = dateFormat(str);
      return str;
    }
  },
  methods: {
    mapModal(){
      this.dialogVisible = true;
    },
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    //查询
    searchFun(e) {
      // 查询列表置空
      this.stationListData = [];
      this.pageNum = 1;
      // 总数置空
      this.total = null;
      this.getList(e);
    },
    //获取当前选中区域拼接数据
    addParams() {
      let data = _.cloneDeep(this.searchForm);

      return data;
      
    },
    //获取列表信息
    getList(e) {
      let that = this;
      that.$refs.searchForm.validate(flag => {
        if (flag) {
          let _data = that.addParams();
          
          let params = {
            pageNum: that.pageNum,
            pageSize: that.pageSize,
            ..._data
          };
          // that.$api.station
          //   .queryList(params)
          that.$api.coupon
            .xfqExpense(params)
            .then(res => {
              if (res.flag) {
                const data = res.data.rows;
                if (data.length > 0) {
                  const rule = {

                  }
                  that.stationListData = data;
                  that.total = res.data.total;
                } else {
                  that.stationListData = [];
                }
              } else {
                that.stationListData = [];
                that.$message.error("查询失败");
              }
            })
            .catch(err => {
              that.$message.error("查询失败");
            });
        }
      });
    },
    //新增
    addNew() {
      this.propsParams = {};
      this.dialogTitle = "新增";
      this.pageType = "add";
      this.detailsDialogFlag = true;
    },
    //查看
    viewFun(row){
      this.dialogTitle = "核销信息";
      this.pageType = "view";
      this.siteId = row.id;
      this.detailsDialogFlag = true;
      // this.$nextTick(() => {
      //   this.$refs.detailsDialog.dataFill();
      // });
    },
    // 设置区域
    setAddressNow(address) {
      let areaData = _.compact(address);
      if (areaData.length) {
        this.searchForm.addressNow = areaData
          .map(el => {
            return el.mc;
          })
          .join(",");
        let lastEl = areaData.pop();
        this.searchForm.adminDiv = lastEl.dm;
      } else {
        this.searchForm.addressNow = "";
        this.searchForm.adminDiv = "";
      }
    },
    //删除
    delectData(row) {
      let that = this;
      that.$confirm("确定删除本单位及单位相关的考勤记录信息？", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          // that.$api.areaPeople
          //   .delectAreaPeople({ id: row.id })
          //   .then(res => {
          //     console.log("删除成功");
          //     console.log(res);
          //     if (!res.flag) {
          //       return that.$message.error("删除失败！");
          //     }
          //     that.$message.success("删除成功！");
          //     that.loading = false;
          //     //刷新列表  带搜索条件
          //     that.searchFun();
          //   })
          //   .catch(err => {
          //     that.loading = false;
          //     that.$message.error("删除失败！");
          //   });
        })
        .catch(() => {});
    },
  },

  computed: {
    user: function() {
      return this.$store.state.userInfo;
    },
    authInfo() {
      let roleAuthMap = this.user.roleAuthMap;
      if (roleAuthMap) {
        return roleAuthMap.stationList || [];
      } else {
        return [];
      }
    }
  },
  mounted() {
    // this.getActivityList();
    // this.getXfqList();
  }
};
</script>
<style lang="scss">
#verification {
  /deep/ .el-range-separator {
    width: 6%;
  }
  .content-view {
    .search-bar {
      padding: 20px;
      margin-bottom: 25px;
      border: 1px solid #cccccc;
    }
    .table-content {
      padding: 20px;

      .color-blocks {
        width: 70%;
        height: 20px;
        border-radius: 3px;
      }
      .page-content {
        margin-top: 10px;
      }
      .bg-red {
        background: $tag-red;
      }
      .bg-green {
        background: $tag-green;
      }
      .bg-yellow {
        background: $tag-yellow;
      }
    }
  }
}
.tangram-suggestion-main{
    z-index: 9999999999;
}
</style>
