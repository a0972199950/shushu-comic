<template>
  <div id="home">
    <Payway :bannerlist="banner" :moreId=1 :rand="swiperConfig" ></Payway>
    <Nav></Nav>
    <div class="h16"></div>
    <Book title="精品荟萃" pop="精品"  className="hotBook" :hotlist="hot" :num=9 :moreId=2 :rand="hotConfig"></Book>
    <Book title="新书推荐" pop="新书"  className="newBook" :hotlist="newBook" :num=9 :moreId=3 :rand="newBookConfig"></Book>
    <Book title="人气推荐" pop="NO"  className="TopBook" :hotlist="TopBook" :num=3 :moreId=10 :rand="TopBookConfig"></Book>
    <Booklike title="猜你喜欢" pop=""  className="newBook" :hotlist="likeBook" :num=20 :moreId=44 :rand="likeBookConfig"></Booklike>
    <lastread></lastread>
    <tabFooter :tab="Home"></tabFooter>
  </div>
</template>
<script>
import Payway from "../Common/Swiper.vue";
import Nav from "./Nav.vue";
import Book from '../Common/Book.vue';
import Booklist from '../Common/Booklist.vue';
import Booklike from '../Common/Booklike.vue';
import tabFooter from "../Common/Footer.vue";
export default {
  name : 'Home',
  components:{
    Payway,
    Nav,
    Book,
    Booklist,
    Booklike,
    tabFooter
  },
  data() {
    return {
      //当前页面
      Home: 'Home',
      //banner
      banner: [],
      //热门
      hot: [],
      //新书
      newBook: [],
      //Top
      TopBook: [],
      //猜你喜欢
      likeBook: [],
      swiperConfig:{},
      hotConfig:{},
      newBookConfig:{},
      TopBookConfig:{},
      likeBookConfig:{},
    };
  },
  mounted() {
    // this.getData();
    this.getRandomData();
  },
  methods: {
    //打乱排序
    randomsort(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    },
    //获取首页数据
    // getData() {
    //   var _this = this;
    //   this.Http.post({
    //     action: 3001,
    //     data: { ids: "1,2,3,4,10,44" },
    //     success: function(result) {
    //       console.log("正常数据",result);
    //       //轮播
    //       _this.banner = result[1].slice(0, 3);
    //       //热门
    //       _this.hot = result[2];
    //       //新书
    //       _this.newBook = result[3];
    //       //Top
    //       _this.TopBook = result[10];
    //       //猜你喜欢
    //       _this.likeBook = result[44];
    //       return false;
    //     }
    //   });
    // },
    getRandomData() {
      var _this = this;
      this.Http.post({
        action: 3015,
        data: { ids: "1,2,3,4,10,44" },
        success: function(result) {
          //轮播
          _this.banner = result["1"].list.slice(0, 3);
          _this.swiperConfig =result["1"].config;
          // //热门
          _this.hot = result["2"].list;
          _this.hotConfig =result["2"].config;
          // //新书
          _this.newBook = result["3"].list;
          _this.newBookConfig =result["3"].config;
          // //Top
          _this.TopBook = result["10"].list;
          _this.TopBookConfig =result["10"].config;
          // //猜你喜欢
          _this.likeBook = result["44"].list;
          _this.likeBookConfig =result["44"].config;
          return false;
        }
      });
    },


  }
};
</script>