<template>
  <div id="app" :style="{minHeight:minH}">
    <wechat></wechat>
    <tips></tips>
    <!--路由切换动画-->
    <transition-group name="transitionName">
    </transition-group>
      <router-view :key="1"></router-view>
 <!--  <tabFooter v-show="FooterShow"></tabFooter> -->
  </div>
</template>

<script>
import tabFooter from "./components/Common/Footer.vue";
import wechat from "./components/Error/wechat.vue";
export default {
  components: {
    tabFooter,wechat
  },
  data() {
    return {
      transitionName: "",
      FooterShow:true
    };
  },
  computed: {
    minH: function() {
      return document.documentElement.clientHeight + "px";
    }
  },
  watch: {
    $route(to, from) {
      if(to.meta.FooterShow){
        this.FooterShow = true;
      }else{
        this.FooterShow = false;
      }
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
    immediate: true
  }
};
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
