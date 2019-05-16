<template>
  <div class="topTips" id="app-down" v-show="isShowDownBox">
    <div class="notification reader-download-notification">
      <div class="notification-header">
        <div class="notification-icon icon icon-app"></div>
        <div class="notification-title text-color-primary">
          咻咻漫画
          <br>海量未删减高品质漫画抢先看
        </div>
        <div class="righr">
          <router-link
            :to="{name: 'download'}"
            class="button btn-down"
            :href="url"
            v-if="isShowDown"
          >下载APP</router-link>
          <div v-else class="button btn-add" @click="addHome()">
            <span v-if="isIosShow==1">添加到主屏幕</span>
            <span v-if="isIosShow==2">添加书签</span>
            <span v-if="isIosShow==3">收藏网址</span>
          </div>
          <i name="close" class="fa fa-times" @click="close()"></i>
        </div>
      </div>
    </div>
    <div v-show="addHomeShow">
      <div class="addHomePop" @click="addHome()"></div>
      <div class="addHomeCon">
        <div class="addHomeInfo">
          <img src="/src/assets/Img/ic_launcher.jpg" alt class="Applogo">
          请点击
          <img
            src="/src/assets/Img/add-Icon2.png"
            alt
            class="Applogo"
            v-if="isIosShow"
          >
          <img src="/src/assets/Img/add-Icon1.png" alt class="Applogo" v-else>
          ，然后轻点“
          <span v-if="isIosShow==1">添加到主屏幕</span>
          <span v-if="isIosShow==2">添加书签</span>
          <span v-if="isIosShow==3">收藏网址</span>”。
          <div class="showInfo"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      tableHeight: "",
      isClick: false,
      addHomeShow: false,
      url: ""
    };
  },
  computed: {
    isShowDownBox: function() {
      if (this.isClick) {
        return false;
      } else {
        return true;
      }
    },
    isShowDown: function() {
      let u = navigator.userAgent;
      let app = navigator.appVersion;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (!isIOS) {
        return true;
      } else {
        return false;
      }
    },
    isIosShow: function() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let ua = u.toLowerCase();
      let app = navigator.appVersion;
      //alert(ua)
      if (isIOS) {
        if (ua.indexOf("qqbrowser") > -1) {
          return 2;
        } else if (ua.indexOf("baidubrowser") > -1) {
          return 3;
        } else if (ua.indexOf("safari") > -1) {
          return 1;
        } else {
          return 3;
        }
      }
    }
  },
  methods: {
    loadData() {
      let _this = this;
      this.Http.post({
        action: 3006,
        data: { platform: 1 },
        success: function(data) {
          _this.url = data.url;
        },
        error: function(data) {
          _this.url = data.url;
        }
      });
    },
    close() {
      this.isClick = !this.isClick;
    },
    addHome() {
      this.addHomeShow = !this.addHomeShow;
      if (this.addHomeShow) {
        document.documentElement.style.overflowY = "hidden";
      } else {
        document.documentElement.style.overflowY = "auto";
      }
    }
  },
  mounted() {
    this.tableHeight = document.body.clientHeight;
    this.loadData();
  },
  activated() {
    this.loadData();
  }
};
</script>

<style scoped>
.topTips {
  width: 100%;
  height: 3rem;
  max-width: 640px;
}
.notification {
  position: relative;
  height: 1.4rem;
}
.notification-header {
  position: fixed;
  z-index: 200000;
  top: 0rem;
  height: 2.5rem;
  padding: 0.25rem 0;
  width: 100%;
  max-width: 640px;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  -webkit-align-items: center;
  align-items: center;
  background-color: #ffffff;
}

.notification-icon {
  width: 0.16rem;
  height: 0.16rem;
  margin-right: 0.08rem;
  line-height: 0.16rem;
}
.icon-app {
  width: 2.5rem !important;
  height: 2.5rem !important;
  margin: 0 0.5rem;
  background: transparent url("/src/assets/Img/ic_launcher.jpg") no-repeat 50%/100% !important;
  border-radius: 5px;
  box-shadow: 0 1px 3px #696969;
}
.text-color-primary {
  color: #f44336 !important;
  flex: 1;
  font-size: 0.6rem;
  line-height: 1rem;
}
.button {
  display: inline-block;
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  background-color: #f44336;
  color: #fff;
  border-radius: 0.75rem;
  padding: 2px 10px;
}
.righr {
  position: relative;
  margin-right: 0.8rem;
}
.fa-times {
  font-size: 1.2rem;
  margin-left: 0.1rem;
}
.addHomePop {
  position: fixed;
  top: 3rem;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999999999999999;
}
.addHomeCon {
  position: fixed;
  bottom: 1.5rem;
  width: 100%;
  max-width: 640px;
  z-index: 999999999999999;
}
.addHomeInfo {
  position: relative;
  margin: 0 0.7rem;
  padding: 0.7rem;
  border-radius: 5px;
  background-color: #ffffff;
  color: #212121;
  font-size: 0.75rem;
  letter-spacing: -1px;
}
.Applogo {
  width: 1.5rem;
  margin-right: 0.5rem;
}
.showInfo {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  bottom: -0.7rem;
  left: 50%;
  margin-left: -0.7rem;
  border-radius: 3px;
  background-color: #ffffff;
  transform: rotate(45deg);
}
</style>

