<template>
    <div class="title">
      <i class="fa fa-angle-left" @click="toBack"></i>
      <slot></slot>
    </div>
</template>
<script>
export default {
  methods:{
    toBack(){
      this.$router.back(-1);
      window.scrollTo(0,0);
    }
  }
}
</script>

<style lang="scss">
  .title{
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    border-bottom: 1px solid #f4f4f4;
    position: relative;
    .fa-angle-left{
      position: absolute;
      top:.5rem;
      left: .8rem;
      font-size: 2rem;
      color:#f44336;
    }
  }
</style>

