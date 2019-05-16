
<!--书架-->
<template>
  <div id="Bookshelf">
    <Bookshelfbar
      title="我的书架"
      :length="Bookarr"
      :delBool="delBool"
      :isactive="1"
      @clickedit="clickedit"
    ></Bookshelfbar>
    <Book
      title="我的书架"
      pop="新书"
      class="newBook"
      :hotlist="Bookarr"
      hideClass="hide"
      :rand="randConfig"
      :delBool="delBool"
    ></Book>
    <Booklist title="猜你喜欢" pop class="newBook" :hotlist="likeBook" :num="9" :moreId=44></Booklist>
    <tabFooter tab="Bookshelf"></tabFooter>
  </div>
</template>

<script>
import Vue from "vue";
import Bookshelfbar from "./Bookshelfbar";
import Book from "../Common/Book.vue";
import tabFooter from "../Common/Footer.vue";
import Booklist from "../Common/Booklist.vue";
export default {
  name: "Bookshelf",
  components: {
    Bookshelfbar,tabFooter,Booklist,
    Book
  },
  data() {
    return {
      Bookshelf: "Bookshelf",
      Bookarr: [],
      randConfig:{
        weight:-1
      },
      likeBook:[],
      delBool: false,
      httpData: {
        pagesize: 20,
        page: 1
      }
    };
  },
  computed: {},
  methods: {
    //编辑点击属性
    clickedit() {
      this.delBool = !this.delBool;
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
    //获取书架书籍
    getBook() {
      var _this = this;
      this.Http.post({
        action: 1005,
        data: _this.httpData,
        success: function(result) {
          if(result.count == 0){
            return
          }
          result.list.forEach(element => {
            element.bookInfo.bookcover = element.bookInfo.thumb;
            element.bookInfo.bookid = element.bookInfo.id;
            _this.Bookarr.push(element.bookInfo);
          });
        }
      });
    }
  },
  mounted() {
    this.getBook();
    this.getData();
  },
  props: {}
};
</script>
<style scoped>
</style>





