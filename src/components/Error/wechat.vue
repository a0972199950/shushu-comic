<template>
  <div id="wechat" v-if="show">
    <div style id="iswx">
      <img src="/src/assets/Img/live_weixin.png" alt>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    show: function() {
      if (this.isWechat()) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    error() {
      if (this.isWechat()) {
        this.$router.push({
          name: "wechat"
        });
      }
    }
  },
  mounted() {
    this.error();
  },
  props: {}
};
</script>
<style scoped>
#iswx {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.8;
  z-index: 13;
  visibility: visible;
  display: block;
  z-index: 200001;
}
#iswx > img {
  margin-left: 35px;
  width: 85%;
}
</style>

