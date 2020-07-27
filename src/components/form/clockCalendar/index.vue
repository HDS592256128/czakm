<!--
 * @Descripttion: 
 * @version: 
 * @Author: pjji
 * @Date: 2020-02-29 17:38:26
 * @LastEditors: pjji
 * @LastEditTime: 2020-03-12 23:59:10
 -->
<template>
  <div v-if="calendarPropsParams.nowMonth && calendarPropsParams.beforeMonth"
       class="calendar-wrap clearfix">
    <div class="calendar-item fl">
      <el-calendar v-model="beforeMonth"
                   class="leftCalendar">
        <template slot="dateCell"
                  slot-scope="{date, data}">
          <p v-if="data.type == 'current-month' && findObj(data.day).flag"
             @click="SingleDetails(date, data, $event)"
             class="date-p is-selected"
             :class="findObj(data.day).className">
            {{ data.day.split('-').slice(1).join('-') }} {{'✔️'}}
          </p>
          <p v-else
             @click="SingleDetails(date, data, $event)"
             class="date-p">
            {{ data.day.split('-').slice(1).join('-') }}
          </p>
        </template>
      </el-calendar>
      <div class="prev-btn fl changg-btn"
           onselectstart="return false"
           @click="preBtnFun">《 前一个月</div>
    </div>
    <div class="calendar-item fl">
      <el-calendar v-model="nowMonth"
                   class="rightCalendar">
        <template slot="dateCell"
                  slot-scope="{date, data}">
          <p v-if="data.type == 'current-month' && findObj(data.day).flag"
             @click="SingleDetails(date, data, $event)"
             class="date-p is-selected"
             :class="findObj(data.day).className">
            {{ data.day.split('-').slice(1).join('-') }} {{'✔️'}}
          </p>
          <p v-else
             @click="SingleDetails(date, data, $event)"
             class="date-p">
            {{ data.day.split('-').slice(1).join('-') }}
          </p>
        </template>
      </el-calendar>
      <div class="next-btn fr changg-btn"
           onselectstart="return false"
           @click="rightNextBtnFun">后一个月 》</div>
    </div>
    <div class="footer-tips fr">
      <p>提示：</p>
      <p>绿色打钩代表当日打卡成功；日期背景颜色为当日打卡后的安康码颜色，点击已打卡日期可查看详情。</p>
    </div>
  </div>
</template>

<script>
import { funs } from "./way.js"; //方法函数
import _ from "lodash";
export default {
  props: {
    calendarPropsParams: {
      type: Object,
      default: {
        nowMonth: new Date(), //当月
        beforeMonth: funs.beforeMonthFun(new Date()), //当前月的前一个月
      }
    },
    clockDateObj: {
      type: Array,
      default: []
    }
  },
  data () {
    let beforeMonthFun = (nowDate) => {
      if (nowDate) {
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth();
        var date = currentYear + '-' + currentMonth;
        if (currentMonth == 0) {
          currentYear = currentYear - 1;
          date = currentYear + '-' + 12;
        }
        return new Date(date);
      }
    };
    return {
      nowMonth: new Date(), //当月
      beforeMonth: funs.beforeMonthFun(new Date()), //当前月的前一个月
      minMonth: funs.getPreMonthDay(funs.getNowMonth().nowDate, 3),
      minMonthDa: new Date(this.minMonth).getTime(),
      leftPrevBtn: null,
      leftNextBtn: null,
      rightPrevBtn: null,
      rightNextBtn: null,
      leftTitle: '',
      leftTitDate: '',
      rightTitle: '',
      rightTitDate: '',
      // clockDateObj: [],
      winChips: new Array(11).fill(0)
    };
  },
  methods: {
    findObj (date) {
      let _obj = {};
      let obj = _.find(this.clockDateObj, ['clockDate', date])
      if (!obj) {
        _obj.flag = false;
      } else {
        _obj.obj = obj;
        _obj = {
          flag: true,
          obj: obj,
          className: obj.dkColour == '1' ? 'bg-green' : (obj.dkColour == '2' ? 'bg-yellow' : (obj.dkColour == '3' ? 'bg-red' : ''))
        }
      }
      return _obj;
    },
    init () {
      // this.addDay('init');
    },
    SingleDetails (date, data, ev) {
      if (this.findObj(data.day).flag) {
        this.$emit("SingleDetails", data, ev);
      } else {
        console.log('未勾选')
      }
    },
    addDay (type) {
      if (this.leftTitle && this.rightTitle) {
        if (document.getElementById('leftNode')) {
          document.getElementById('leftNode').remove()
        }
        if (document.getElementById('rightNode')) {
          document.getElementById('rightNode').remove()
        }
        let leftTit = this.leftTitle,
          rightTit = this.rightTitle,
          leftTitDom = leftTit.parentElement,
          rightTitDom = rightTit.parentElement,
          leftCurDay = "",
          rightCurDay = "";
        if (type == 'init') {
          leftCurDay = funs.getDay(funs.dateInit(leftTit.textContent));
          rightCurDay = funs.getDay(funs.dateInit(rightTit.textContent));
        } else {
          leftCurDay = funs.getDay(funs.beforeTimeFun(funs.dateInit(leftTit.textContent)));
          rightCurDay = funs.getDay(funs.beforeTimeFun(funs.dateInit(rightTit.textContent)));
        }
        let leftNode = document.createElement('span'),
          rightNode = document.createElement('span');
        leftNode.setAttribute('id', 'leftNode');
        rightNode.setAttribute('id', 'rightNode');
        leftNode.setAttribute('class', 'leftNode');
        rightNode.setAttribute('class', 'rightNode');
        leftNode.innerHTML = leftCurDay;
        rightNode.innerHTML = rightCurDay;
        leftTitDom.appendChild(leftNode);
        rightTitDom.appendChild(rightNode);
      }
    },
    preBtnFun () {
      this.$nextTick(() => {
        let tit = this.leftTitle.textContent;
        tit = funs.dateInit(tit);
        this.leftTitDate = tit;
        tit = funs.beforeTimeFun(tit);
        let curDa = new Date(tit).getTime(),
          minDa = new Date(this.minMonth).getTime()
        if (curDa < minDa) {
          return false;
        } else {
          this.leftPrevBtn.click()
          this.rightPrevBtn.click()
          this.addDay();
        }
      })
    },
    rightNextBtnFun () {
      this.$nextTick(() => {
        let tit = this.rightTitle.textContent;
        tit = funs.dateInit(tit);
        this.rightTitDate = tit;
        tit = funs.nextTimeFun(tit);
        let curDa = new Date(tit).getTime(),
          maxDa = new Date(funs.getNowMonth().nowDate).getTime()
        if (curDa > maxDa) {
          return false;
        } else {
          this.rightNextBtn.click();
          this.leftNextBtn.click();
          this.addDay();
        }
      })
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo;
    },
  },
  watch: {

  },
  mounted () {
    this.$nextTick(() => {
      // 点击前一个月
      this.leftPrevBtn = document.querySelector('.leftCalendar .el-button-group>button:nth-child(1)');
      this.leftNextBtn = document.querySelector('.leftCalendar .el-button-group>button:nth-child(3)');
      this.leftTitle = document.querySelector('.leftCalendar .el-calendar__title');
      //点击后一个月
      this.rightPrevBtn = document.querySelector('.rightCalendar .el-button-group>button:nth-child(1)');
      this.rightNextBtn = document.querySelector('.rightCalendar .el-button-group>button:nth-child(3)');
      this.rightTitle = document.querySelector('.rightCalendar .el-calendar__title');
      // this.init()
    })
  }
};
</script>

<style  lang="scss" scoped>
.calendar-wrap {
  width: 100%;
  .calendar-item {
    width: 50%;

    .date-p {
      padding: 10px 5px;
      width: 100%;
      height: 50px;
      // line-height: 70px;
      text-align: center;
      color: #666;
    }
    .is-selected {
      // color: #1989fa;
      color: #fff;
    }
  }
  .footer-tips {
    width: 70%;
    padding: 20px 20px 0 20px;
    text-align: left;
    color: #666;
    font-size: 12px;
  }
  .changg-btn {
    cursor: pointer;
    font-size: 14px;
  }
  .bg-green {
    //1
    background: $tag-green;
  }
  .bg-yellow {
    //2
    background: $tag-yellow;
  }
  .bg-red {
    //3
    background: $tag-red;
  }
}
/deep/ .el-calendar-table__row td.next .date-p {
  color: #c0c4cc;
}
/deep/ .el-calendar__button-group {
  display: none;
}
/deep/ .el-calendar__header {
  padding-bottom: 0;
  border-bottom: none;
}
/deep/ .el-calendar__title {
  display: block;
  margin: 0 auto;
  // text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #666;
}
/deep/ .el-calendar-day {
  padding: 0;
  height: 50px;
}
/deep/ .el-dialog__body {
  padding: 10px 10px 30px;
}
</style>
<style>
.el-calendar-table:not(.is-range) td.next,
.el-calendar-table:not(.is-range) td.prev {
  pointer-events: none !important;
}
.leftNode {
  /* position: absolute;
  left: 34%; */
  font-size: 16px;
}
.rightNode {
  /* position: absolute;
  left: 78%; */
  font-size: 16px;
}
</style>