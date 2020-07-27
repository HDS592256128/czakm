<template>
  <div class="list-empty">
    <div class="f-tac">
      <img src="@/assets/images/nodata.png" alt />
    </div>
    <div v-show="isNeverQuery" class="text f-tac">您可根据各条件进行筛选，来完成数据的查询</div>
  </div>
</template>

<script>
export default {
  name: "ListEmpty",
  props: {
    // 是否为等待初始化状态
    isNeverQuery: {
      type: Boolean,
      default: true
    }
  }
};
</script>
