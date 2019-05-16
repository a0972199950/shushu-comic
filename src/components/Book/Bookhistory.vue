<!--阅读记录-->
<template>
  <div id="Bookhistory">
    <Bookshelfbar
      title="阅读记录"
      :length="Bookarr"
      :isactive="2"
      :delBool="delBool"
      @clickedit="clickedit"
    ></Bookshelfbar>
    <Book
      title="我的书架"
      pop="新书"
      class="newBook"
      :hotlist="Bookarr"
      hideClass="hide"
      :delBool="delBool"
      :statushide="statushide"
      :rand="randConfig"
    ></Book>
    <Booklist title="猜你喜欢" pop class="newBook" :hotlist="likeBook" :num="9" :moreId=44></Booklist>
    <tabFooter tab="Bookshelf"></tabFooter>
  </div>
</template>

<script>
import Vue from "vue";
import Bookshelfbar from "./Bookshelfbar";
import tabFooter from "../Common/Footer.vue";
import Book from "../Common/Book.vue";
import Booklist from "../Common/Booklist.vue";
export default {
  name: "Bookhistory",
  components: {
    Bookshelfbar,tabFooter,Booklist,
    Book
  },
  data() {
    return {
      Bookshelf: "Bookshelf",
      statushide: "statushide",
      Bookarr: [],
      likeBook:[],
      delBool: false,
      randConfig:{
        weight:-1
      },
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
        action: 1008,
        data: _this.httpData,
        success: function(result) {
          // console.log(result)
          if(result == undefined || result == 'undefined' || result == ''){
            return
          }
          result.forEach(element => {
            element.bookcover = element.thumb;
            element.chapter_id = element.chapter_id;
            element.title = element.book_title;
            element.isread = 2;
            _this.Bookarr.push(element);
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