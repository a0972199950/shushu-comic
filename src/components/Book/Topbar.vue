<!--topbar-->
<template>
  <div id="topbar">
    <div class="topbar flex">
      <div class="fl" @click="back()">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="title read_bar" v-show="readshow">
        <p>{{title}}</p>
        <p>第{{sort}}话</p>
      </div>
      <div class="title" v-show="!readshow">{{title}}</div>
      <router-link :to="{name:'Home'}" class="bar_home">
        <i class="fa fa-home"></i>
      </router-link>
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
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  mounted() {},
  props: {
    title: {
      type: String
    },
    readshow: {
      type: Boolean
    },
    sort: {
      type: Number
    }
  }
};
</script>
<style scoped>
.bar_home {
  width: 2.5rem;
  text-align: center;
  height: 2.5rem;
  font-size: 1.2rem;
  color: #ffffff;
  line-height: 2.5rem;
}
.read_bar p:nth-of-type(1) {
  font-size: 0.85rem;
  margin-bottom: 0.2rem;
}
.read_bar p:nth-of-type(2) {
  font-size: 0.6rem;
}
#topbar {
  height: 2.5rem;
}
.topbar {
  position: fixed;
  width: 20rem;
  height: 2.5rem;
  background-color: #f44336;
  align-items: center;
  z-index: 9;
  max-width: 640px;
}
.topbar::after {
  content: "";
  position: absolute;
  right: 0;
  width: 100%;
  bottom: auto;
  height: 8px;
  top: 100%;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.05) 50%,
    transparent 80%,
    transparent
  );
}
.topbar .fl {
  width: 2.5rem;
  text-align: center;
  height: 2.5rem;
  margin-right: 0.5rem;
}
.topbar .fl i {
  font-size: 1.8rem;
  color: #ffffff;
  line-height: 2.5rem;
}
.title {
  color: #ffffff;
  font-size: 0.8rem;
  flex: 1;
  -webkit-flex: 1;
}
</style>


