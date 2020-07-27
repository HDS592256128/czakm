<!--
 * @Descripttion: 
 * @version: 修改记录
 * @Author: pjji
 * @Date: 2020-02-23 12:49:46
 * @LastEditors: pjji
 * @LastEditTime: 2020-03-20 13:30:35
 -->
<template>
  <div>
    <el-dialog title="修改记录"
               :visible.sync="changeRecordDialog"
               width="80%"
               :close-on-click-modal="false"
               append-to-body>

      <div class="change-record">
        <ul class="record-header clearfix">
          <li class="fl">旧版本</li>
          <li class="fl">新版本</li>
        </ul>
        <!-- 主体 -->
        <div class="record-mian">
          <div class="record-item clearfix"
               v-for="(item,i) in recordData">
            <div class="old-version fl">
              <span class="ell "
                    :title="item.oldName || item.name">{{item.oldName || item.name}}</span>
              <span class="fr ell tr"
                    :title="item.oldValue">{{item.oldValue}}</span>
            </div>
            <span class="arrow fl"> ----> </span>
            <div class="new-version fr">
              <span class="ell"
                    :title="item.newName || item.name">{{item.newName || item.name}}</span>
              <span class="fr ell tr"
                    :title="item.newValue">{{item.newValue}}</span>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div class="footer-des">
          <span class="des-title">修改时间：</span>
          <span class="des-value">{{createTime}}</span>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="changeRecordDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'changeRecord',
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      changeRecordDialog: false,
      recordData: [],
      correspondList: [],
      createTime: ''
    };
  },
  methods: {
    show () {
      this.changeRecordDialog = true;
    },
    //点击查看修改记录数据
    queryViewChangeRecord (currentId, createTime) {
      let that = this;
      //对应关系参照表 
      //后台接口无法直接返回可展示数据，需要前端再次数据处理、关联。  ---相关后台同事：朱诞生
      let correspondList = {
        'userName': '姓名',
        'userPhone': '手机号',
        'orgName': '工作单位',
        'isParty': '是否党员',
        'hasCar': '是否有车',
        'addressNow': '现居住地',
        'hourseType': '住户类型',
        'addressVillage': '小区名称',
        'doorNo': '门牌号',
        'isTouch': '是否有湖北等重点疫情地区旅游或人员接触史',
        'isContactFy': '近14天新型冠状病毒感染的肺炎病例接触史',
        'isTemNormal': '体温',
        'contactName': '集体宿舍（工地）联系人名称',
        'contactPhone': '集体宿舍（工地）联系人电话',
        'isBlack': '是否外市返回',
        'carNum': '车辆车牌号'
      };
      that.createTime = createTime;
      that.$api.regInfo.queryViewChangeRecord({
        id: currentId
      }).then(res => {
        if (res.flag) {
          const data = res.data;
          if (data && data.healthHisJson) {
            let array = JSON.parse(data.healthHisJson);
            let addressVillageObj = _.filter(array, ['alterField', 'addressVillage']);
            let curHourse = _.filter(array, ['alterField', 'hourseType']);
            let addressVillageOldName = '',
              addressVillageNewName = '';
            if (curHourse.length > 0) {
              addressVillageOldName = curHourse[0].oldValue == '4' ? '酒店名称' : (curHourse[0].oldValue == '5' ? '集体宿舍（工地）名称' : (curHourse[0].oldValue == '6' ? '目的地' : '小区名称'));
              addressVillageNewName = curHourse[0].newValue == '4' ? '酒店名称' : (curHourse[0].newValue == '5' ? '集体宿舍（工地）名称' : (curHourse[0].newValue == '6' ? '目的地' : '小区名称'));
            }
            array.forEach((item, i) => {
              switch (item.alterField) {
                case 'isParty':
                  item.oldValue = item.oldValue == '1' ? '是' : (item.oldValue == '0' ? '否' : '');
                  item.newValue = item.newValue == '1' ? '是' : (item.newValue == '0' ? '否' : '');
                  break;
                case 'hasCar':
                  item.oldValue = item.oldValue == '1' ? '有' : (item.oldValue == '0' ? '无' : '');
                  item.newValue = item.newValue == '1' ? '有' : (item.newValue == '0' ? '无' : '');
                  break;
                case 'hourseType':
                  item.oldValue = item.oldValue == '1' ? '自住户' : (item.oldValue == '2' ? '承租户' : (item.oldValue == '3' ? '住宅' : (item.oldValue == '4' ? '酒店' : (item.oldValue == '5' ? '集体宿舍（工地）' : (item.oldValue == '6' ? '过境' : '')))));
                  item.newValue = item.newValue == '1' ? '自住户' : (item.newValue == '2' ? '承租户' : (item.newValue == '3' ? '住宅' : (item.newValue == '4' ? '酒店' : (item.newValue == '5' ? '集体宿舍（工地）' : (item.newValue == '6' ? '过境' : '')))));
                  break;
                case 'isTouch':
                  item.oldValue = item.oldValue == '1' ? '是' : (item.oldValue == '0' ? '否' : '');
                  item.newValue = item.newValue == '1' ? '是' : (item.newValue == '0' ? '否' : '');
                  break;
                case 'isContactFy':
                  item.oldValue = item.oldValue == '1' ? '是' : (item.oldValue == '0' ? '否' : '');
                  item.newValue = item.newValue == '1' ? '是' : (item.newValue == '0' ? '否' : '');
                  break;
                case 'isBlack':
                  item.oldValue = item.oldValue == '1' ? '是' : (item.oldValue == '0' ? '否' : '');
                  item.newValue = item.newValue == '1' ? '是' : (item.newValue == '0' ? '否' : '');
                  break;
                case 'isTemNormal':
                  item.oldValue = item.oldValue == '1' ? '正常（<37.3°）' : (item.oldValue == '0' ? '异常（≥37.3°）' : '');
                  item.newValue = item.newValue == '1' ? '正常（<37.3°）' : (item.newValue == '0' ? '异常（≥37.3°）' : '');
                  break;
              }
              if (item.alterField == 'addressVillage') {
                item.oldName = addressVillageOldName || '小区名称';
                item.newName = addressVillageNewName || '小区名称';
              } else {
                item.name = correspondList[item.alterField];
              }
            });
            that.recordData = array;
          }
        } else {
          this.$message.error('数据获取失败');
        }
      }).catch(err => {
        this.$message.error('数据获取失败');
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.change-record {
  padding: 0 20px;
  $fFamily: "微软雅黑";

  font-family: $fFamily;

  .record-header {
    border-bottom: 1px solid #ddd;
    li {
      padding-bottom: 10px;
      width: 50%;
      text-align: center;

      font: {
        size: 20px;
        weight: bold;
      }
    }
  }

  .record-mian {
    .record-item {
      width: 100%;
      .old-version {
        padding: 10px 5px;
        width: 43%;
        height: 47px;
        line-height: 27px;
        border-bottom: 1px solid #ddd;

        span {
          display: inline-block;
          width: 50%;
        }
      }
      .arrow {
        padding: 10px 5px;
        width: 14%;
        height: 47px;
        line-height: 27px;
        text-align: center;
      }
      .new-version {
        padding: 10px 5px;
        width: 43%;
        height: 47px;
        line-height: 27px;
        border-bottom: 1px solid #ddd;
      }

      .tr {
        max-width: 60%;
        text-align: right;
      }
    }
  }

  .footer-des {
    margin-top: 50px;
    text-align: center;
    .des-title {
      font: {
        size: 18px;
        weight: bold;
      }
    }
    .des-value {
      font: {
        size: 14px;
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