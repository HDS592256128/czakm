<template>
  <div class="pager-wrap">
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-size="perpage"
      :pager-count="5"
      :page-count="totalPage"
      background
      layout="total, prev, pager, next, jumper, sizes"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    options: {
      type: Array,
      default () {
        return [10, 20, 30, 40, 50];
      }
    }
  },
  data () {
    return {
      perpage: this.options[0]
    };
  },
  computed: {
    totalPage () {
      return Math.ceil(this.total / this.perpage);
    }
  },
  methods: {
    pagesigeChange () {
      this.handleCurrentChange(1);
    },
    handleSizeChange (page) {
      this.perpage = page;
      this.handleCurrentChange(1);
    },
    handleCurrentChange (val) {
      this.$emit('update:currentPage', val);
      this.$emit('pageChange', {
        pageNo: val || 1,
        pageSize: this.perpage || 10
      });
    },
    go (n) {
      this.handleCurrentChange(n);
    }
  }
};
</script>
<style lang="scss" scoped>
  .pager-wrap {
    padding: 10px 0;
    text-align: center;
    /deep/.el-pagination__total{
      float: left;
    }
    /deep/.el-pagination__jump ,
    /deep/.el-pagination__sizes{
      float: right;
    }
  }
</style>