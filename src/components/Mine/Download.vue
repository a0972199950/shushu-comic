<!--下载-->
<template>
  <div class="new_down">
    <MineTop title="下载中心"></MineTop>
    <div class="download-total">
      <div class="download-top">
        <img
          src="/src/assets/Img/ic_launcher.jpg"
          alt="logo"
          class="top-logo"
          style="border-radius: 10px;"
        >
        <p class="top-title">咻咻漫画
          <span id="version"></span>
        </p>
        <p class="top-text"></p>
        <a
          id="link"
          class="install-a"
          style="background-image:linear-gradient(55deg,#fe1942 1%,#ff6e30 100%)"
          :href="url"
        >点击下载安装</a>
      </div>
      <div class="tan" style="display: none;">
        <div class="dialog-wrappp">
          <div class="text-biaoo">
            <div class="text-fir">
              <span class="cliright">点击右上角</span>
              <p class="yuan">
                <span></span>
                <span></span>
                <span></span>
              </p>
            </div>
            <p class="check">选择在浏览器打开</p>
          </div>
          <div class="jiantou"></div>
        </div>
      </div>
      <div class="android-content">
        <div class="download-title">
          <i></i>android安装教程
          <i></i>
        </div>
        <div class="download-tips">1、点击“下载APP”获取安装包，下载完成后按照系统引导安装即可。</div>
        <img src="/src/assets/Img/anzhuo.png" alt class="android-img">
        <div class="download-tips">2、下载完成后按照系统引导安装即可。</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import MineTop from "../Book/Topbar.vue";
export default {
  name: "Dowmload",
  components: {
    MineTop
  },
  data() {
    return {
      tableHeight: "",
      url: ""
    };
  },
  computed: {
    isShowDown: function() {
      return false;
    }
  },
  mounted() {
      this.loadData();
    this.tableHeight = document.body.clientHeight;
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
    }
  }
};
</script>

<style scoped>
.new_down .download-total {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
}
.new_down .download-total .download-top {
  text-align: center;
}
.new_down .download-total .download-top .top-logo {
  margin-top: 2rem;
  width: 4rem;
  height: 4rem;
}
.new_down .download-total .download-top .top-title {
  height: 2rem;
  line-height: 2rem;
  font-size: 0.75rem;
  color: #575456;
}
.new_down .download-total .download-top .top-text {
  margin-top: 0.09333333rem;
  margin-bottom: 0.2rem;
  height: 0.8rem;
  line-height: 0.3rem;
  font-size: 12px;
  color: #868686;
  font-weight: 300;
}
.new_down .download-total .download-top .install-a {
  margin: auto;
  display: block;
  height: 2.7rem;
  width: 10.6rem;
  line-height: 2.7rem;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  background-image: -webkit-linear-gradient(35deg, #5c47f9 1%, #6084fd 100%);
  background-image: linear-gradient(55deg, #5c47f9 1%, #6084fd 100%);
  -webkit-box-shadow: 0 2px 10px 0 rgba(95, 132, 228, 0.68);
  box-shadow: 0 2px 10px 0 rgba(95, 132, 228, 0.68);
  border-radius: 100px;
  text-decoration: none;
}
.new_down .download-total .tan {
  min-width: 8.5em;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  z-index: 90;
  background: center center no-repeat rgba(0, 0, 0, 0.8);
}
.new_down .download-total .tan .dialog-wrappp {
  position: relative;
}
.new_down .download-total .tan .dialog-wrappp .text-biaoo {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin-top: 1.46666667rem;
}
.new_down .download-total .tan .dialog-wrappp .text-biaoo .text-fir {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.new_down .download-total .tan .dialog-wrappp .text-biaoo .check {
  margin-top: 0.22666667rem;
}
.new_down .download-total .tan .dialog-wrappp .jiantou {
  position: absolute;
  width: 2.12rem;
  height: 2.48rem;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  right: 0.34666667rem;
}
.new_down .download-total .download-title {
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;
  height: 2rem;
  font-weight: 700;
  line-height: 2rem;
  font-size: 16px;
  color: #454545;
  text-align: center;
}
.new_down .download-total .download-title i {
  display: inline-block;
  margin-bottom: 0.13333333rem;
  height: 1px;
  width: 1.5rem;
}
.new_down .download-total .download-title i:nth-child(1) {
  background-image: -webkit-gradient(
    linear,
    right top,
    left top,
    from(#939393),
    to(rgba(255, 255, 255, 0))
  );
  background-image: -webkit-linear-gradient(
    right,
    #939393 0,
    rgba(255, 255, 255, 0) 100%
  );
  background-image: linear-gradient(
    -90deg,
    #939393 0,
    rgba(255, 255, 255, 0) 100%
  );
  margin-right: 0.26666667rem;
}
.new_down .download-total .download-title i:nth-child(2) {
  margin-left: 0.26666667rem;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#939393),
    to(rgba(255, 255, 255, 0))
  );
  background-image: -webkit-linear-gradient(
    left,
    #939393 0,
    rgba(255, 255, 255, 0) 100%
  );
  background-image: linear-gradient(
    90deg,
    #939393 0,
    rgba(255, 255, 255, 0) 100%
  );
}
.new_down .download-total .download-tips {
  width: 100%;
  font-size: 14px;
  color: #888;
  line-height: 1.4rem;
  margin-bottom: 0.6rem;
}
.new_down .download-total .android-img {
  display: block;
  height: 7.2rem;
  width: 11.2rem;
  text-align: center;
  margin: auto auto 0.8rem;
}
</style>