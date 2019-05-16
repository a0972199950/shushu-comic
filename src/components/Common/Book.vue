<!--书籍横-->
<template>
  <div id="Book">
    <div class="bookTitle flex" :class="hideClass">
      <div>
        <span></span>
        {{title}}
      </div>
      <div>
        <router-link
          :to="{name:'Bookmore',params:{id:moreId,title:title}}"
          class="more"
          :tltle="title"
        >
          <span>更多</span>
          <i class="fa fa-angle-right"></i>
        </router-link>
      </div>
    </div>
    <ul class="bookBox clearfix" :class="className">
      <div v-show="book.length==0" class="no_book">
        <i class="fa fa-folder-open-o"></i>
        暂时没有记录
      </div>
      <li v-for="(val,index) in book" :key="index" class="fl col3 clearfix">
        <a href="javascript:;" @click.stop="jump_bookinfo(val.bookid,val.isread,val.chapter_id)">
          <div>
            <span class="book_pop" v-if="pop !=='NO' ">{{pop}}</span>
            <span class="book_pop" v-if="pop =='NO' ">NO.{{index+1}}</span>
            <span class="book_sta book_sta_1" v-if="val.status==1" :class="statushide">连载</span>
            <span class="book_sta book_sta_2" v-else :class="statushide">完结</span>
            <img :src="val.bookcover" alt>
            <i
              v-show="delBool"
              class="fa fa-trash-o delbutton"
              @click.stop="delbook(val.bookid,index,val.isread)"
            ></i>
          </div>
          <p class="booktitle oneline">{{val.title}}</p>
          <p class="bookInfo flex" :class="hideClass">
            <span class="oneline">
              <i class="fa fa-star"></i>
              <i class="num">{{(Math.random() * (10 - 9) + 9).toFixed(2)}}</i>
            </span>
            <span class="oneline">
              <i class="fa fa-eye"></i>
              <i class="num">{{(Math.floor(Math.random() * (100000 - 40000)) + 400000)}}</i>
            </span>
          </p>
        </a>
      </li>
    </ul>
    <div class="h16" v-show="hotlist_1.length>0"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "mint-ui";
export default {
  name: "",
  data() {
    return {
      book: [],
    };
  },
  computed: {
    hotlist_1: function() {
      if (this.hotlist) {
        this.book = this.hotlist.slice(0, this.num);
        return this.hotlist.slice(0, this.num);
      } else {
        return [];
      }
    },
    round_num: function() {
      var arr = [];
      for (let index = 0; index < this.num; index++) {
        arr[index] = (Math.random() * (10 - 9) + 9).toFixed(2);
      }
      return arr;
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
    //路由跳转书籍详情
    jump_bookinfo(id, isread, chapter_id) {
      let _this = this;
      if (this.rand.weight != null && this.rand.weight > 0) {
        this.Http.post({
          action: 3016,
          data: {
            bookid: id,
            id: _this.moreId
          },
          success: function(result) {
            // console.log("随机",result);
            _this.loadLastRead(result.id)
            /* _this.$router.push({
              name: "BookinfoR",
              params: { id: result.id }
            }); */
          }
        });
      } else {
        if (parseInt(isread) == 2) {
          this.$router.push({ name: "read", params: { id: chapter_id } });
        } else {
          //this.$router.push({ name: "Bookinfo", params: { id: id } });
          _this.loadLastRead(id)
        }
      }
    },
    //删除书架书籍
    delbook(id, index, isread) {
      var _this = this;
      if (parseInt(isread) == 2) {
        this.Http.post({
          action: 1009,
          data: {
            bookid: id
          },
          success: function() {
            _this.book = _this.hotlist.splice(index, 1);
            Toast({
              message: "成功删除记录",
              iconClass: "fa fa-check"
            });
          }
        });
      } else {
        this.book = this.hotlist.splice(index, 1);
        this.joinBookrack(id);
      }
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
    hideClass: {
      type: String
    },
    statushide: {
      type: String
    },
    pop: {
      type: String
    },
    delBool: {
      type: Boolean
    },
    className: {
      type: String
    },
    rand: {}
  }
};
</script>
<style scoped>
.no_book {
  width: 10rem;
  margin: 3rem auto;
  text-align: center;
  color: #cecece;
}
.no_book i {
  font-size: 2rem;
  display: block;
}
.delbutton {
  position: absolute;
  font-size: 1.2rem;
  top: -0.2rem;
  color: #ffffff;
  right: 0;
  background: #f56336;
  z-index: 6;
  width: 1.8rem;
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  border-radius: 0.2rem;
}
#Book {
  /* min-height: 15rem; */
}
.statushide {
  display: none;
}
.bookTitle {
  position: relative;
  height: 2rem;
  padding: 0 0.8rem;
  align-items: center;
  border-bottom: 1px solid #f6f6f6;
}
.bookTitle > div {
  flex: 1;
  -webkit-flex: 1;
  font-size: 0.6rem;
}
.bookTitle > div:nth-of-type(1) span {
  position: absolute;
  left: 0;
  height: 1rem;
  width: 5px;
  background-color: #f44336 !important;
  top: 0.5rem;
}
.more {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0.8rem;
  line-height: 2rem;
  width: 4rem;
  font-size: 0.6rem;
  text-align: right;
}
.more i {
  font-size: 1rem;
  margin-left: 0.2rem;
}
.bookBox {
  padding: 0 2%;
}
.bookBox li.col3 {
  /* width: 33%; */
  width: 32%;
  min-height: 5rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f1f1f1;
}
.bookBox li:nth-of-type(3n + 2) {
  /* padding: 0.4rem 0.5%; */
  padding: 0.4rem 2%;
}
.bookBox li > a {
  position: relative;
  display: block;
  width: 100%;
  border-radius: 0.2rem;
  /* overflow: hidden; */
}
.bookBox li > a div {
  position: relative;
  /* border: 1px solid #f1f1f1; */
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
  overflow: hidden;
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
.bookInfo > span:nth-of-type(2) {
  flex: 1;
  -webkit-flex: 1;
}
.bookInfo > span .fa {
  color: #ffbe24;
}
.bookInfo > span .num {
  color: #999999;
}
</style>


