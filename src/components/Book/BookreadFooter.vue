<template>
  <div id="BookreadFooter" v-if="show">
    <ul class="clearfix">
      <li v-for="(val,index) in book" :key="index" class="fl" @click.stop="go_down()">
        <div>
          <img :src="val.bookcover" alt>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from "vue";
import { Dialog } from "vant";
import "vant/lib/index.css";
Vue.use(Dialog);
export default {
  name: "",
  data() {
    return {
      book: []
    };
  },
  computed: {
    show: function() {
      if (this.isAndroid()) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
      //底部点击提示
    go_down() {
      this.DialogInfo("更多", "未删减版啪啪啪漫画");
    },
    /* 排序 */
    randomsort(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    },
    /* 底部推荐 */
    bottomData() {
      var _this = this;
      _this.Http.post({
        action: 3001,
        data: { ids: "46" },
        success: function(result) {
          _this.book = result[46].sort(_this.randomsort).slice(0, 4);
        }
      });
    },
    //具体提示消息
    DialogInfo(info1, info2) {
      let from = sessionStorage.getItem("from");
      if (from == 3) {
        return;
      }
      let that = this;
      Dialog.confirm({
        title: "温馨提示",
        showCancelButton: true,
        message:
          info1 +
          '<span style="color:#f00;font-size:17px;">' +
          info2 +
          "</span>，请下载官方App，激情漫画看不停！！"
      })
        .then(() => {
          that.$router.push({
            name: "download"
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.bottomData();
    console.log(this.way)
  },
  props: {
      way:{}
  }
};
</script>
<style scoped>
ul {
  display: flex;
  display: -webkit-flex;
  max-height: 8rem;
  overflow: hidden;
}
ul > li {
  flex: 1;
  -webkit-flex: 1;
  max-height: 8rem;
  overflow: hidden;
}
ul > li:not(:first-child) {
  padding-left: 0.2rem;
}
ul > li img {
  width: 100%;
  height: 100%;
}
</style>


