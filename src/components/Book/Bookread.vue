
<!--书籍阅读-->
<template>
  <div id="bookread" @click="clickmenu()">
    <Topbar :readshow="readshow" :title="bookName" :sort="sort"></Topbar>
    <div class="bookcontent" :style="{minHeight:minH}" id="readImgBox">
      <div v-for="(val,index) in bookInfo" :key="index" class="readImgBox">
        <img v-lazy="val" :key="val">
      </div>
    </div>
    <div id="payBox_before" v-show="ispayshow"></div>
    <div id="payBox" v-show="ispayshow">
      <p class="haspaddLR">本章价格：{{book_bean}}金币</p>
      <p class="nopaddLR">开通VIP，海量漫画免费看</p>
      <div class="payButton">
        <router-link :to="{name:'recharge'}" class="ta">余额不足，立即充值</router-link>
      </div>
      <div class="pay_info">
        <span class="fl">余额：{{userInfo.book_bean}}金币</span>
        <router-link :to="{name:'recharge'}" class="fr">开通VIP，免费阅读</router-link>
      </div>
    </div>
    <transition-group name="fade">
      <div class="bottomBox flex" :key="1" v-show="bottomShow">
        <div class="function ta" @click="go_mulu(bookid)">目录</div>
        <div
          class="button ta"
          :class="{'active': prevChapterId == 0}"
          @click="prev(prevChapterId)"
        >上一话</div>
        <div
          class="button ta"
          :class="{'active': nextChapterId == 0}"
          @click="next(nextChapterId)"
        >下一话</div>
        <div class="function ta" @click="joinBookrack(bookid)">书架</div>
      </div>
    </transition-group>
    <!-- 增加菜单放到页面底部，防止点击唤醒菜单是false -->
    <div class="bottomBox flex" style="position: relative;">
      <div class="function ta" @click="go_mulu(bookid)">目录</div>
      <div
        class="button ta"
        :class="{'active': prevChapterId == 0}"
        @click="prev(prevChapterId)"
      >上一话</div>
      <div
        class="button ta"
        :class="{'active': nextChapterId == 0}"
        @click="next(nextChapterId)"
      >下一话</div>
      <div class="function ta" @click="joinBookrack(bookid)">书架</div>
    </div>
    <readfooter v-show="footerShow"></readfooter>
  </div>
</template>

<script>
import Vue from "vue";
import { MessageBox } from "mint-ui";
import { Dialog } from "vant";
import "vant/lib/index.css";
Vue.use(Dialog);
import Topbar from "./Topbar.vue";
import readfooter from "./BookreadFooter.vue";
export default {
  name: "read",
  components: {
    Topbar,
    readfooter
  },
  data() {
    return {
      chapterId: this.$route.params.id, //当前章节id
      bookid: "",
      sort: 0, //当前章节
      bookName: "", //书籍名称
      bookInfo: [], //漫画内容
      book_bean: [], //收费金币
      userInfo: "", //个人信息
      prevChapterId: "", //上一章
      nextChapterId: "", //下一章
      ispayshow: false, //是否显示收费引导
      footerShow: true, //
      bottomShow: false,
      iShowDown: -1, //安卓显示引导下载的提示展示重置
      readshow: true //Topbar头部显示细节
    };
  },
  computed: {
    tabHeight: function() {
      return document.documentElement.clientHeight;
    },
    minH: function() {
      return document.documentElement.clientHeight + "px";
    }
  },
  methods: {
    //检查图片是否加载完成
    ErrorImg(e) {
      var that = this;
      var ImgUrl = e.src;
      if(!e.statusImg){
        e.statusImg = true;
        console.log(e)
        that.Http.post({
          action: 2010,
          showLoading:false,
          data: { picurl: ImgUrl },
          success: function(res) {
            e.src = res.url;
            console.log(res.url)
            e.statusImg = false;
          },
          error:function(){
            e.statusImg = false;
          }
        });
      }
    },
    //底部点击提示
    go_down() {
      this.DialogInfo("更多", "未删减版啪啪啪漫画");
    },
    //关于滑动提示下载
    downApp() {
      if (this.ispayshow) {
        //如果此章节收费则不提示下载
        return;
      }
      if (this.isAndroid()) {
        window.addEventListener("scroll", this.handleScroll);
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var iProp = Math.floor(scrollTop / this.tabHeight);
      console.log(iProp);
      if (this.iShowDown == -1) {
        if (iProp == 10 || iProp == 30 || iProp == 40) {
          if (iProp == 40) {
            this.DialogInfo("为了", "保护您的账户安全");
          } else {
            this.DialogInfo("更多", "未删减版啪啪啪漫画");
          }
          this.iShowDown = 0;
        }
      } else {
        if (iProp !== 10 && iProp !== 30 && iProp !== 40) {
          this.iShowDown = -1;
        }
      }
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
    },
    //点击屏幕唤出底部菜单
    clickmenu() {
      this.bottomShow = !this.bottomShow;
    },
    //返回目录
    go_mulu(id) {
      this.$router.push({ path: "/cat/" + id });
    },
    //翻页阅读
    prev(id) {
      if (id == 0 || id == "0") {
        MessageBox("温馨提示", "没有上一章了");
        return;
      } else {
        this.$router.push({ name: "read", params: { id: id } });
      }
    },
    next(id) {
      if (id == 0 || id == "0") {
        MessageBox("温馨提示", "没有下一章了");
        return;
      } else {
        this.$router.push({ name: "read", params: { id: id } });
      }
    },
    //获取章节内容
    getcontent() {
      var _this = this;
      this.Http.post({
        action: 2005,
        data: {
          chapterid: _this.chapterId,
          app: 1
        },
        success: function(result) {
          document.title = result.book.title;
          _this.bookName = result.book.title;
          _this.bookid = result.book.id;
          _this.sort = +result.sort;
          _this.bookInfo = result.images;
          _this.chapterId = result.id;
          _this.prevChapterId = result.previd;
          _this.nextChapterId = result.nextid;
          _this.ispayshow = false;
          _this.footerShow = true;
          _this.writeHis();
        },
        error: function(result) {
          var result = result.data;
          document.title = result.book.title;
          _this.bookName = result.book.title;
          _this.bookid = result.book.id;
          _this.sort = +result.sort;
          _this.book_bean = +result.book_bean;
          _this.bookInfo = result.images;
          _this.chapterId = result.id;
          _this.prevChapterId = result.previd;
          _this.nextChapterId = result.nextid;
          let from = sessionStorage.getItem("from");
          if (from == 2 && _this.isAndroid()) {
            _this.$router.replace({
              name: "download"
            });
          }
          _this.ispayshow = true;
          _this.footerShow = false;
        }
      });
    },
    //写入历史记录
    writeHis() {
      var _this = this;
      this.Http.post({
        action: 1007,
        data: {
          bookid: _this.bookid,
          chapterid: _this.chapterId
        },
        success: function(result) {}
      });
    }
  },
  mounted() {
    this.getcontent();
    this.getUserInfo();
    this.downApp();
    this.$Lazyload.$on("error", this.ErrorImg);
  },
  props: {},
  watch: {
    $route(to, form) {
      this.chapterId = this.$route.params.id;
      this.getcontent();
      this.downApp();
    },
    immediate: true
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 1s all ease;
}
.fade-enter-active {
  bottom: 0;
  opacity: 1;
}
.fade-leave-active {
  opacity: 0;
  bottom: -2.5rem;
}

.fade-enter,
.fade-leave {
  bottom: -2.5rem;
  opacity: 0;
}
.bottomBox .button.active {
  opacity: 0.55 !important;
  /* pointer-events: none !important; */
}
.bottomBox .button {
  flex: 1;
  -webkit-flex: 1;
}
.bottomBox .function {
  width: 3rem;
}
.bottomBox > div {
  height: 2rem;
  line-height: 2rem;
  margin: 0.25rem 0;
  border-right: 1px solid #f1f1f1;
}
.bottomBox > div:last-child {
  border-right: none;
}
.bottomBox {
  position: fixed;
  width: 100%;
  max-width: 640px;
  bottom: 0;
  height: 2.5rem;
  background-color: #ffffff;
  font-size: 0.8rem;
  color: #f44336;
  z-index: 6;
}
.bottomBox::after {
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
.pay_info a {
  font-size: 0.6rem;
  color: #f44336;
  text-decoration: underline;
}
.pay_info span {
  font-size: 0.6rem;
}
.pay_info {
  height: 2rem;
  line-height: 2rem;
  color: #9e9e9e;
  font-size: 0.8rem;
  padding: 0.4rem 1rem 0;
}
.payButton > a {
  display: block;
  width: 100%;
  line-height: 2rem;
  background-color: #f44336;
  color: #ffffff;
  font-size: 0.8rem;
  border-radius: 0.3rem;
}
.payButton {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f5f5f5;
  height: 2rem;
}
#payBox > p {
  height: 2rem;
  line-height: 2rem;
  color: #5c5d58;
  font-size: 0.8rem;
  padding: 0 1rem;
}
.nopaddLR {
  padding: 0 1rem 0.5rem !important;
  border-bottom: 1px solid #f5f5f5;
}
#payBox {
  position: absolute;
  padding: 0.5rem 0;
  height: 10rem;
  background-color: #ffffff;
  bottom: 3rem;
  left: 2%;
  right: 2%;
  border-radius: 0.3rem;
  box-shadow: 0px 3px 8px#9c9c9c !important;
  z-index: 3;
}
#payBox_before {
  content: "";
  display: block;
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
#bookread {
  position: relative;
  overflow: hidden;
}
img {
  width: 100%;
}
</style>


