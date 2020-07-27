<template>
  <div
    :style="`width:${width};height:${height}`"
    class="akm-tag"
    :class="{'red':type=='3','green':type=='1','yellow':type=='2'}"
  ></div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "1"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "24px"
    }
  }
};
</script>

<style lang="scss" scoped>
.akm-tag {
  display: inline-block;
  width: 100%;
  border-radius: 3px;
  vertical-align: middle;
  &.green {
    background: $tag-green;
  }
  &.red {
    background: $tag-red;
  }
  &.yellow {
    background: $tag-yellow;
  }
}
</style>