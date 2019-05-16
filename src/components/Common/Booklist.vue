<!--书籍竖-->
<template>
  <div id="Book_list">
    <div class="bookTitle flex" :class="hideClass">
      <div>
        <span></span>
        {{title}}
      </div>
      <div>
        <router-link :to="{name:'Bookmore',params:{id:moreId,title:title}}" class="more">
          <span>更多</span>
          <i class="fa fa-angle-right"></i>
        </router-link>
      </div>
    </div>
    <ul class="bookBox clearfix" :class="className">
      <li v-for="(val,index) in hotlist_1" :key="index" class="clearfix col1">
        <!-- <router-link :to="{name:'Bookinfo',params: {id: val.bookid}}" class="flex"> -->
        <a class="flex" @click="jump_read(val.bookid)">
          <div class="imgBox">
            <span class="book_pop" v-if="pop !=='NO' ">{{pop}}</span>
            <span class="book_pop" v-if="pop =='NO' ">NO.{{index+1}}</span>
            <span class="book_sta book_sta_1" v-if="val.status==1">连载</span>
            <span class="book_sta book_sta_2" v-else>完结</span>
            <div v-if="imgSrc=='thumb'" class="bookImgBox_bookcover">
              <img :src="val.thumb" alt>
            </div>
            <div v-else class="bookImgBox_bookcover">
              <img :src="val.bookcover" alt>
            </div>
          </div>
          <div class="book_info">
            <p class="booktitle oneline">{{val.title}}</p>
            <p class="book_des" v-if="say =='description'">{{val.description}}</p>
            <p class="book_des" v-else>{{val.desc}}</p>
            <p class="book_type flex">类型：{{val.typename}}</p>
            <p class="bookInfo flex">
              <span class="oneline">
                <i class="num">作者：{{val.author}}</i>
              </span>
              <span class="oneline">
                <i class="fa fa-star"></i>
                <i class="num">{{(Math.random() * (10 - 9) + 9).toFixed(2)}}</i>
              </span>
              <span class="oneline">
                <i class="fa fa-eye"></i>
                <i class="num">{{(Math.floor(Math.random() * (100000 - 40000)) + 400000)}}</i>
              </span>
              
            </p>
          </div>
        <!-- </a> -->
        </a>
      </li>
      <!-- <li v-for="(val,index) in hotlist_1" :key="index" class="fl col3 clearfix">
            <router-link :to="{name:'book'}">
                <div>
                    
                    <span class="book_pop" v-if="pop !=='NO' ">{{pop}}</span>
                    <span class="book_pop" v-if="pop =='NO' ">NO.{{index+1}}</span>
                    <span class="book_sta book_sta_1" v-if="val.status==1">完结</span>
                    <span class="book_sta book_sta_2" v-else>连载</span>
                    <img :src="val.bookcover" alt="">
                </div>
                <p class="booktitle oneline">{{val.title}}</p>
                <p class="bookInfo flex">
                    <span class="oneline"> 
                        <i class="fa fa-star"></i>
                        <i class="num">{{round_num}}</i>
                    </span>
                    <span class="oneline"> 
                        <i class="fa fa-eye"></i>
                        <i class="num">{{round_num_p}}</i>
                    </span>
                </p>
            </router-link>
      </li>-->
    </ul>
    <div class="h16"></div>
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
    hotlist_1: function() {
      if (this.hotlist) {
        this.hotlist.forEach(element => {
          if (element.id) {
            element.bookid = element.id;
          }
        });
        return this.hotlist.slice(0, this.num);
      } else {
        return [];
      }
    },
    round_num: function() {
      return (Math.random() * (10 - 9) + 9).toFixed(2);
    },
    round_num_p: function() {
      return Math.floor(Math.random() * (100000 - 90000)) + 900000;
    }
  },
  methods: {
    //某本书的最后一次阅读
    loadLastRead(bookid) {
      var _this = this;
      this.Http.post({
        action: 1012,
        data: {
          bookid: bookid,
        },
        success: function(result) {
          var jump_chapterId = result.id;
          _this.$router.push({ name: "read", params: { id: jump_chapterId } });
        }
      });
    },
    jump_read(bookid){
      this.loadLastRead(bookid);
    }
  },
  mounted() {},
  props: {
    hotlist: {
      type: Array,
      default: function() {
        return [];
      }
    },
    title: {
      type: String
    },
    num: {
      type: Number
    },
    moreId: {
      type: Number
    },
    pop: {
      type: String
    },
    className: {
      type: String
    },
    imgSrc: {
      type: String
    },
    say: {
      type: String
    },
    hideClass: {
      type: String
    }
  }
};
</script>
<style scoped>
#Book_list {
  min-height: 15rem;
}
.bookTitle {
  position: relative;
  height: 2.5rem;
  padding: 0 0.8rem;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.bookTitle > div {
  flex: 1;
  -webkit-flex: 1;
  font-size: 0.8rem;
}
.bookTitle > div:nth-of-type(1) span {
  position: absolute;
  left: 0;
  height: 1rem;
  width: 5px;
  background-color: #f44336 !important;
  top: 0.7rem;
}
.more {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.8rem;
  line-height: 2.5rem;
  width: 4rem;
  font-size: 0.8rem;
  text-align: right;
}
.more i {
  font-size: 1rem;
  margin-left: 0.2rem;
}
.bookBox {
  padding: 0 2%;
  /* padding: 0 1%; */
}
.bookBox li.col3 {
  width: 32%;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f1f1f1;
}
.bookBox li.col1 {
  padding: 0.4rem 0;
  min-height: 5rem;
  border-bottom: 1px solid #f1f1f1;
}
.bookBox li.col1 .imgBox {
  width: 32%;
  margin-right: 0.5rem;
}
.bookBox li.col1 .book_info {
  position: relative;
  flex: 1;
  -webkit-flex: 1;
  border: none;
}
.bookBox li.col1 .bookInfo {
  z-index: 2;
  line-height: 1.5rem;
}
.bookBox li.col1 .bookInfo span {
  margin-right: 0.5rem;
}
.book_des {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* margin: 0.5rem 0; */
  height: 3rem;
  color: #979797;
  line-height: 1rem;
  font-size: 0.6rem;
  text-overflow: ellipsis;
  overflow: hidden;
}
.book_type {
  margin: 0.3rem 0 0;
  font-size: 0.6rem;
  display: inline-block;
  padding: 0.2rem 0.5rem;
  background-color: #999;
  color: #ffffff;
  border-radius: 0.2rem;
}
.bookBox li.col3:nth-of-type(3n + 2) {
  padding: 0.4rem 2%;
}
.bookBox li.col3 > a {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 0.2rem;
  overflow: hidden;
}
.bookBox li > a div {
  position: relative;
  /* border: 1px solid #f1f1f1; */
}
.bookBox li > a div.bookImgBox_bookcover{
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,.5);
  border-radius: .3rem;
}
.newBook .book_pop {
  display: none;
}
.book_pop {
  position: absolute;
  top: 0.3rem;
  right: -1rem;
  background-color: violet;
  z-index: 2;
  font-size: 0.6rem;
  width: 4rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color: #ffffff;
  transform: rotate(45deg);
}
.TopBook li:nth-of-type(1) .book_pop {
  background-color: #f44336;
}
.TopBook li:nth-of-type(2) .book_pop {
  background-color: #ff9800;
}
.TopBook li:nth-of-type(3) .book_pop {
  background-color: #2196f3;
}
.book_sta {
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  width: 1.5rem;
  height: 1rem;
  z-index: 2;
  font-size: 0.6rem;
  color: #ffffff;
  line-height: 1rem;
  text-align: center;
}
.book_sta_1 {
  background-color: #4caf50;
}
.book_sta_1:before {
  content: "";
  border-color: #4caf50 transparent transparent #4caf50;
  display: block;
  width: 0rem;
  height: 0;
  position: absolute;
  left: 1.5rem;
  border-style: solid;
  border-width: 0.2rem;
}
.book_sta_1:after {
  border-color: transparent transparent #4caf50 #4caf50;
  content: "";
  display: block;
  width: 0rem;
  height: 0;
  position: absolute;
  left: 1.5rem;
  bottom: 0;
  border-style: solid;
  border-width: 0.2rem;
}
.book_sta_2 {
  background-color: #f44336;
}
.book_sta_2:before {
  content: "";
  border-color: #f44336 transparent transparent #f44336;
  display: block;
  width: 0rem;
  height: 0;
  position: absolute;
  left: 1.5rem;
  border-style: solid;
  border-width: 0.2rem;
}
.book_sta_2:after {
  border-color: transparent transparent #f44336 #f44336;
  content: "";
  display: block;
  width: 0rem;
  height: 0;
  position: absolute;
  left: 1.5rem;
  bottom: 0;
  border-style: solid;
  border-width: 0.2rem;
}
.bookBox li img {
  width: 100%;
  height: 9rem;
  overflow: hidden;
}
.bookBox li .booktitle {
  color: #f44336;
  font-size: 0.85rem;
  height: 2rem;
  line-height: 2rem;
}
.bookInfo {
  overflow: hidden;
  padding: 0 0.1rem;
}
.bookInfo > span {
  font-size: 0.5rem;
}
.bookInfo > span:nth-of-type(1) {
  margin-right: 0.2rem;
}
.col3 .bookInfo > span:nth-of-type(2) {
  flex: 1;
  -webkit-flex: 1;
}
.col1 .bookInfo > span:nth-of-type(3) {
  flex: 1;
  -webkit-flex: 1;
  overflow: hidden;
}
.bookInfo > span .fa {
  color: #ffbe24;
}
.bookInfo > span .num {
  color: #999999;
}
</style>


