<!---->
<template>
  <div id="Footer">
    <div class="footer"></div>
    <Footer class="flex footer_tab">
      <div v-for="(val,index) in Footerlist" :key="index" :class="{'active' : tab==val.name}">
        <router-link :to="{name:val.name}">
          <p>
            <i :class="val.icon"></i>
          </p>
          <span>{{val.info}}</span>
        </router-link>
      </div>
    </Footer>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "",
  data() {
    return {
        //tab:'Home_'
    };
  },
  computed: {
    Footerlist: function() {
      return [
        {
          icon: "fa fa-home",
          name: "Home",
          info: "书城"
        },
        {
          icon: "fa fa-th-large",
          name: "Book",
          info: "分类"
        },
        {
          icon: "fa fa-book",
          name: "Bookshelf",
          info: "书架"
        },
        {
          icon: "fa fa-user-circle-o",
          name: "Mine",
          info: "我的"
        }
      ];
    }
  },
  methods: {},
  mounted() {},
  props: {
    tab:{
      type:String
    }
  },
  watch: {
    $route(to, from) {
        //this.tab = to.name;
    },
    immediate: true
  }
};
</script>
<style scoped>
#Footer {
  height: 60px;
}
.footer_tab {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  height: 60px;
  align-items: center;
  text-align: center;
  z-index: 2;
  background-color: #ffffff;
}
.footer_tab::after {
  content: "";
  position: absolute;
  right: 0;
  width: 100%;
  bottom: 100%;
  height: 8px;
  top: auto;
  pointer-events: none;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.3) 0,
    rgba(0, 0, 0, 0.1) 40%,
    rgba(0, 0, 0, 0.05) 50%,
    transparent 80%,
    transparent
  );
}
.footer_tab div {
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  padding: 6px 0;
}
.footer_tab div.active {
  border-top: 2px solid #f44336;
}
.footer_tab div p {
  height: 30px;
  color: #f56336 !important;
}
.footer_tab div p i {
  font-size: 24px;
}
.footer_tab div span {
  color: #f44336 !important;
  font-size: 14px;
}
</style>


