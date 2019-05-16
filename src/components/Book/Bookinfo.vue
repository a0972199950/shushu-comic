<!--书籍信息-->
<template>
  <div id="Bookinfo">
    <Topbar :title="bookinfo.title" zIndex="1"></Topbar>
    <div class="bookBox">
      <img :src="bookinfo.thumb_x" alt>
    </div>
    <div class="bookcon">
      <span class="booktitle">{{bookinfo.title}}</span>
      <span
        class="tag"
        v-for="(val,index) in tagShow"
        :key="index"
        :style="{backgroundColor:val.color}"
      >{{val.name}}</span>
    </div>
    <div class="bookcon booktype">
      <span>
        <i>作者：</i>
        {{bookinfo.author}}
      </span>
      <span>
        <i>类型：</i>
        {{bookinfo.typename}}
      </span>
    </div>
    <div class="booktype bookcon">
      <span class>
        <i class="fa fa-star"></i>
        <i class="num">{{(Math.random() * (10 - 9) + 9).toFixed(2)}}</i>
      </span>
      <span class>
        <i class="fa fa-eye"></i>
        <i class="num">{{(Math.floor(Math.random() * (100000 - 40000)) + 400000)}}</i>
      </span>
    </div>
    <div class="make clearfix">
      <span class="fl" v-show="!isAdd" @click="joinBookrack(bookid)">订阅追更</span>
      <span class="fl" v-show="isAdd">已加入书架</span>
      <span class="fr" @click="bookread()">立即阅读</span>
    </div>
    <div class="des">{{bookinfo.description}}</div>
    <ul>
      <li class="flex" @click="endChapter(bookid)">
        <i class="fa fa-clock-o"></i>
        <span>最新</span>
        <span class="chapter">最终章</span>
        <i class="fa fa-angle-right"></i>
      </li>
      <li class="flex" @click="goCat(bookid)">
        <i class="fa fa-reorder"></i>
        <span>目录（小图继续看）</span>
        <span class="chapter">共{{Catalog.count}}话</span>
        <i class="fa fa-angle-right"></i>
      </li>
    </ul>
    <div class="h16"></div>
    <Booklist title="猜你喜欢" pop class="newBook" :hotlist="likeBook" :num="9" :moreId=44></Booklist>
  </div>
</template>

<script>
import Vue from "vue";
import Topbar from "./Topbar.vue";
import Booklist from "../Common/Booklist.vue";
export default {
  name: "Bookinfo",
  components: {
    Topbar,
    Booklist
  },
  data() {
    return {
      bookid: this.$route.params.id, //书籍id
      bookinfo: {}, //书籍信息
      tagShow: [], //小标签信息
      likeBook: [], //才你喜欢书籍
      Catalog: [], //目录
      chapterId:'',//立即阅读的x章节
      isAdd: false //是否加入书架
    };
  },
  computed: {
    tag: function() {
      return [
        { name: "VIP", color: "#ff9800" },
        { name: "精品", color: "#b65bb6" },
        { name: "离婚", color: "#ce61ff" },
        { name: "复仇", color: "#ff9800" },
        { name: "性爱", color: "#b65bb6" },
        { name: "尺度", color: "#f44336" },
        { name: "欲望", color: "#ffcf00" },
        { name: "孤独", color: "#b65bb6" }
      ];
    }
  },
  methods: {
    //跳转最终章
    endChapter(){
      this.$router.push({ name: "read", params: { id: this.Catalog.list[0].id } });
    },
    //某本书的最后一次阅读
    loadLastRead() {
      var _this = this;
      this.Http.post({
        action: 1012,
        data: {
          bookid: _this.bookid
        },
        success: function(result) {
          _this.chapterId = result.id;
        }
      });
    },
    //点击阅读
    bookread() {
      this.$router.push({ name: "read", params: { id: this.chapterId } });
    },
    //点击跳转目录
    goCat(id) {
      this.$router.push({ path: "/cat/" + id });
    },
    //打乱排序
    randomsort(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    },
    //获取首页数据
    getData() {
      var _this = this;
      this.Http.post({
        action: 3001,
        data: { ids: "1,2,3,4,10,44" },
        success: function(result) {
          //猜你喜欢
          _this.likeBook = result[44];
          return false;
        }
      });
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
    //随机展示tag
    randertag() {
      var i = this.tag.length;
      var len = Math.floor(Math.random() * (i - 4)) + 4;
      this.tagShow = this.tag.sort(this.randomsort).slice(0, len);
    },
    //书籍是否加入书架
    isAddBook() {
      var _this = this;
      this.Http.post({
        action: 1011,
        data: {
          bookid: _this.bookid
        },
        success: function(result) {
          if (+result.errcode == 1010) {
            _this.isAdd = true;
          }
        },
        error: function(result) {
          if (+result.errcode == 1011) {
            _this.isAdd = false;
          } else if (+result.errcode == 1010) {
            _this.isAdd = true;
          }
        }
      });
    },
    //获取目录
    getCatalog() {
      var _this = this;
      this.Http.post({
        action: 2004,
        data: {
          bookid: _this.bookid,
          sort: 1
        },
        success: function(result) {
          _this.Catalog = result;
        }
      });
    }
  },
  mounted() {
    this.getBookInfo();
    this.randertag();
    this.getData();
    this.isAddBook();
    this.getCatalog();
    this.loadLastRead();
  },
  props: {},
  watch: {
    $route(to, form) {
      this.bookid = this.$route.params.id;
      this.isAdd = false;
      this.getBookInfo();
      this.randertag();
      this.isAddBook();
      this.getCatalog();
      this.loadLastRead();
    },
    immediate: true
  }
};
</script>
<style scoped>
.bookBox {
  padding: 0.4rem 0;
}
.bookBox img {
  width: 100%;
  height: 10rem;
  max-height: 12rem;
  box-shadow: 0 1px 5px #757575;
}
.bookcon {
  padding: 0 0.8rem;
  margin-bottom: 0.3rem;
}
.bookcon span {
  margin-bottom: 0.2rem;
}
.booktitle {
  font-size: 0.75rem;
  color: #392525;
  letter-spacing: 1px;
  margin-right: 0.3rem;
}
.tag {
  color: #ffffff;
  padding: 0.1rem 0.2rem;
  font-size: 0.6rem;
  display: inline-block;
  margin: 0 0.2rem;
  border-radius: 0.2rem;
}
.booktype {
  padding-top: 0.5rem;
  font-size: 0.6rem;
}
.booktype span {
  margin-right: 1rem;
}
.booktype i {
  color: #9e9e9e;
}
.booktype i.fa {
  color: #ffbe24;
}
.booktype i.num {
  color: #5d5656;
}
.make {
  padding: 0.6rem 0.8rem;
  height: 1.8rem;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
}
.make span {
  height: 1.8rem;
  line-height: 1.8rem;
  width: 45%;
  text-align: center;
  border: 0.1rem solid #f44336;
  border-radius: 0.2rem;
  font-size: 0.75rem;
}
.make span:nth-of-type(1) {
  color: #f44336;
}
.make span:nth-of-type(2) {
  color: #f44336;
  opacity: 0.55 !important;
  pointer-events: none !important;
}
.make span:nth-of-type(3) {
  color: #ffffff;
  background-color: #f44336;
}
.des {
  padding: 0.8rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  color: #5d5656;
  text-indent: 2rem;
  min-height: 1.5rem;
}
ul > li {
  position: relative;
  border-bottom: 1px solid #f5f5f5;
  height: 2rem;
  align-items: center;
  padding: 0.2rem 0.8rem;
  font-size: 0.75rem;
  color: #9c9c9c;
}
ul > li .fa {
  font-size: 1.3rem;
  margin-right: 0.8rem;
}
ul > li .fa-angle-right {
  position: absolute;
  right: 0rem;
}
.chapter {
  position: absolute;
  right: 2rem;
}
</style>


