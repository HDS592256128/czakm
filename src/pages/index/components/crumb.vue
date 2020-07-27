<template>
  <div class="breadcrumb-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(el,index) in activeNav" :key="index">{{el.tipName || el.title}}</el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["activeNav"])
  }
};
</script>

<style>
</style>