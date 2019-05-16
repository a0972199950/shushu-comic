<!--目录-->
<template>
  <div id="Catalog">
    <Topbar :title="'目录-'+bookinfo.title" zIndex="-1"></Topbar>
    <div class="border_W"></div>
    <div class="flex Catalog_top">
      <div class="fl" @click="chapterSort()">
        <i class="fa fa-arrows-v"></i>
        <span>{{sort.name}}</span>
      </div>
      <div class="fr" @click="pageShow()">
        <span>分页</span>
        <span>{{numshow}}</span>
        <i class="fa fa-angle-down"></i>
      </div>
    </div>
    <mt-popup v-model="popupVisible" class="Catalog_top_pop">
      <div
        class="mint-cell-wrapper"
        v-for="(val,index) in page"
        :key="index"
        @click="choosePage(index+1)"
      >
        <div class="mint-cell-title">
          <label class="mint-radiolist-label">
            <span class="mint-radio">
              <input name="radio" type="radio" class="mint-radio-input">
              <span class="mint-radio-core"></span>
            </span>
            <span class="mint-radio-label">{{val.name}}</span>
          </label>
        </div>
      </div>
    </mt-popup>
    <div style="height:2.9rem;width:100%;"></div>
    <ul class="chapterlist">
      <li v-for="(val,index) in chapter.list" :key="index">
        <router-link :to="{name:'read',params:{id:val.id}}" class="flex">
          <div>
            <img :src="val.thumb" alt>
          </div>
          <div>
            <div class="clearfix">
              <span class="fl">第{{val.sort}}话</span>
              <span class="fr">
                <i v-show="val.book_bean>0">收费</i>
                <i class="fa fa-angle-right"></i>
              </span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="pageBox clearfix">
      <div
        class="fl tl"
        :class="{'active': isActive == httpData.page}"
        @click="prevPage(httpData.page)"
      >上20话</div>
      <div
        class="fr tr"
        :class="{'active': isActive_max == httpData.page}"
        @click="nextPage(httpData.page)"
      >下20话</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Topbar from "./Topbar.vue";
export default {
  name: "Bookmulu",
  components: {
    Topbar
  },
  data() {
    return {
      bookid: this.$route.params.id, //书籍id
      bookinfo: "",
      chapter: "",
      popupVisible: false,
      isActive: 1,
      isActive_max: -1,
      numshow: "1-20",
      page: [],
      httpData: {
        bookid: this.$route.params.id,
        pagesize: 20,
        page: 1,
        sort: 0
      }
    };
  },
  computed: {
    sort: function() {
      if (this.httpData.sort == 0) {
        return { name: "倒序" };
      } else if (this.httpData.sort == 1) {
        return { name: "正序" };
      }
    }
  },
  methods: {
    //跳转翻页
    prevPage(id) {
      this.isActive = 1;
      if (id <= 1) {
        return;
      }
      this.httpData.page--;
      this.getChapter();
    },
    nextPage(id) {
      var len = this.page.length;
      if (id >= len) {
          return;
      }
      this.isActive_max = len;
      this.httpData.page++;
      this.getChapter();
    },
    //选择页码
    choosePage(id) {
      this.httpData.page = id;
      this.getChapter();
      this.popupVisible = false;
      this.numshow = this.page[id - 1].name;
    },
    //计算页码
    pagelist() {
      var arr = [];
      var allChapter = this.chapter.count;
      var page = Math.floor(allChapter / 20);
      for (let index = 0; index < page; index++) {
        arr.push({
          name: index * 20 + 1 + "-" + (index + 1) * 20,
          id: index
        });
      }
      if (allChapter % 20 !== 0) {
        arr.push({
          name: page * 20 + 1 + "-" + allChapter,
          id: page + 1
        });
      }
      this.page = arr;
    },
    //分页
    pageShow() {
      this.popupVisible = !this.popupVisible;
    },
    //排序
    chapterSort() {
      if (this.httpData.sort == 0) {
        this.httpData.sort = 1;
        this.getChapter();
      } else if (this.httpData.sort == 1) {
        this.httpData.sort = 0;
        this.getChapter();
      }
    },
    //获取书籍信息
    getBookInfo() {
      var _this = this;
      this.Http.post({
        action: 2003,
        data: {
          bookid: _this.bookid,
          lang: 1
        },
        success: function(result) {
          window.document.title = result.title;
          _this.bookinfo = result;
        }
      });
    },
    //获取章节信息
    getChapter() {
      var _this = this;
      this.Http.post({
        action: 2004,
        data: _this.httpData,
        success: function(result) {
          _this.chapter = result;
          _this.pagelist();
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      });
    }
  },
  mounted() {
    this.getBookInfo();
    this.getChapter();
  },
  props: {}
};
</script>
<style scoped>
.pageBox {
  padding: 0.6rem 0.8rem;
  height: 44px;
}
.pageBox div {
  width: 40%;
  line-height: 44px;
  height: 44px;
  font-size: 0.8rem;
  color: #f44336;
}
.pageBox div.active {
  opacity: 0.55 !important;
  pointer-events: none !important;
}
.Catalog_top {
  position: fixed;
  height: 2.5rem;
  align-items: center;
  background-color: #f44336;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  width: 20rem;
  max-width: 640px;
  z-index: 5;
}
.Catalog_top_pop {
  top: 2.8rem;
  right: 0.5rem;
  -webkit-transform: translate3d(0%, 0%, 0);
  transform: translate3d(-0%, -0%, 0);
  min-height: 2.5rem;
  width: 14rem;
  left: auto;
  border-radius: 0.3rem;
  box-shadow: 0 0.2rem 0.5rem #484848;
}
.mint-radio-input:checked + .mint-radio-core {
  background-color: #f44336 !important;
  border-color: #f44336 !important;
}
.border_W {
  height: 1px;
  position: fixed;
  background-color: rgba(255, 255, 255, 0.2);
  width: 20rem;
  max-width: 640px;
  z-index: 6;
}
ul.chapterlist {
  padding: 0 0 0.4rem 0.8rem;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(202, 202, 202, 0.2);
}
ul.chapterlist > li {
  height: 4rem;
}
ul.chapterlist > li > a {
  padding: 0.6rem 0;
  height: 2.8rem;
  overflow: hidden;
}
ul.chapterlist > li > a > div:nth-of-type(1) {
  width: 6rem;
}
ul.chapterlist > li > a > div:nth-of-type(1) img {
  width: 100%;
  max-height: 2.8rem;
  overflow: hidden;
}
ul.chapterlist > li > a > div:nth-of-type(2) {
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  padding-left: 0.5rem;
  color: #3e3e3e;
}
ul.chapterlist > li > a > div:nth-of-type(2) > div {
  font-size: 0.6rem;
  padding-top: 0.2rem;
  padding-right: 0.8rem;
}
ul.chapterlist > li > a > div:nth-of-type(2) > div .fr i:nth-of-type(1) {
  color: #ffffff;
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  background-color: #f44336;
  margin-right: 1.2rem;
}
ul.chapterlist > li > a > div:nth-of-type(2) > div .fr i:nth-of-type(2) {
  position: absolute;
  right: 0.8rem;
  top: 0;
  color: #999999;
  font-size: 1rem;
}
ul.chapterlist > li > a > div:nth-of-type(2)::after {
  content: "";
  position: absolute;
  right: 0;
  width: 100%;
  bottom: -0.6rem;
  height: 1px;
  pointer-events: none;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(202, 202, 202, 0.2);
}
.Catalog_top::before {
  content: "";
  position: absolute;
  right: 0;
  width: 100%;
  top: -1px;
  height: 8px;
  pointer-events: none;
  background-color: #f44336;
  z-index: 4;
}
.Catalog_top::after {
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
.Catalog_top .fl {
  padding-left: 1rem;
  font-size: 0.8rem;
  height: 2.5rem;
  line-height: 2.5rem;
}
.Catalog_top .fr {
  flex: 1;
  -webkit-flex: 1;
  padding-right: 1rem;
  text-align: right;
  font-size: 0.8rem;
  height: 2.5rem;
  line-height: 2.5rem;
}
.Catalog_top .fr span {
  margin-right: 0.2rem;
  letter-spacing: 1px;
}
</style>
