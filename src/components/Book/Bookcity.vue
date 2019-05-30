<!---->
<template>
  <div id="Bookcity">
    <div class="serchlist" :class="bookcityClasshide">
      <div>
        <span
          :class="{'active': isActive_sex == val.id}"
          v-for="(val,index) in serch.sex.list"
          :key="index-1"
          @click="serchBook('isActive_sex',val.id)"
        >{{val.typename}}</span>
        <span
          :class="{'active': isActive_sta == val.id}"
          v-for="(val,index) in serch.status.list"
          :key="index+1"
          @click="serchBook('isActive_sta',val.id)"
        >{{val.typename}}</span>
      </div>
      <div>
        <span
          :class="{'active': isActive_type == val.id}"
          v-for="(val,index) in serch.type.list"
          :key="index"
          @click="serchBook('isActive_type',val.id)"
        >{{val.typename}}</span>
      </div>
    </div>
    <div class="h16" :class="bookcityClasshide"></div>
    <ul
      v-infinite-scroll="loadData"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="500"
    >
      <Booklike
        title="猜你喜欢"
        pop
        class="newBook"
        :hotlist="likeBook"
        hideClass="hide"
        imgSrc="thumb"
        say="description"
        jump="id"
        :rand="likeBookConfig"
        :moreId=44
      ></Booklike>
    </ul>
    <div v-show="bottomShow" class="bottomShow">我的底线在这里</div>
    <tabFooter tab="Book" :class="bookcityClasshide"></tabFooter>
  </div>
</template>

<script>
import Booklist from "../Common/Booklist.vue";
import Booklike from "../Common/Booklike.vue";
import tabFooter from "../Common/Footer.vue";
export default {
  name: "Book",
  components: {
    Booklist,
    tabFooter,
    Booklike
  },
  data() {
    return {
      topShow: false,
      bottomShow: false,
      likeBookConfig:{isrand: 1, weight: 20, target: 78, high: 77},
      //搜索
      serch: {
        type: {
          name: "分类",
          list: []
        },
        sex: {
          name: "频道",
          list: [
            {
              id: 1,
              typename: "男频"
            },
            {
              id: 2,
              typename: "女频"
            }
          ]
        },
        status: {
          name: "频道",
          list: [
            {
              id: 1,
              typename: "连载"
            },
            {
              id: 2,
              typename: "完结"
            }
          ]
        }
      },
      //是否选中分类
      isActive_sex: 0,
      isActive_type: 0,
      isActive_sta: 0,
      //请求参数
      /* httpdata: {
        type_id: 0,
        lang: 1,
        sexy: 0,
        status: 0,
        pagesize: 20,
        page: 1
      }, */
      likeBook: [],
      //滑动开关
      loading: false,
      //是否允许滑动请求
      isHttp: true
    };
  },
  computed: {
    posturl:function(){
      if(this.httpurl){
        return 2009
      }else{
        return 2007
      }
    },
    httpdata: function() {
      if (this.loaddata) {
        return this.loaddata;
      } else {
        return {
          type_id: 0,
          lang: 1,
          sexy: 0,
          status: 0,
          pagesize: 20,
          page: 1
        };
      }
    }
  },
  methods: {
    //获取搜索列表
    getSerchData() {
      var _this = this;
      this.Http.post({
        action: 2001,
        data: {
          lang: 1
        },
        success: function(result) {
          _this.serch.type.list = result;
        }
      });
    },
    //点击搜索
    serchBook(key, id) {
      this.isHttp = true;
      this.bottomShow = false;
      this.likeBook = [];
      if (key == "isActive_type") {
        this.isActive_type = id;
        this.httpdata.type_id = id;
      }
      if (key == "isActive_sex") {
        this.isActive_sex = id;
        this.httpdata.sexy = id;
      }
      if (key == "isActive_sta") {
        this.isActive_sta = id;
        this.httpdata.status = id;
      }
      this.httpdata.page = 1;
      this.loadData();
    },
    //获取数据
    loadData() {
      if (this.isHttp) {
        var _this = this;
        _this.loading = true;
        this.Http.post({
          action: _this.posturl,
          data: this.httpdata,
          success: function(result) {
            result.list.forEach(element => {
              _this.likeBook.push(element);
            });
            _this.loading = false;
            _this.httpdata.page++;
            if (result.list.length < _this.httpdata.pagesize) {
              _this.isHttp = false;
              _this.bottomShow = true;
            }
          }
        });
      }
    }
  },
  mounted() {
    this.getSerchData();
  },
  props: {
    bookcityClasshide: {},
    loaddata: {},
    httpurl: {}
  }
};
</script>
<style scoped>
.serchlist {
}
.serchlist > div {
  padding: 0 0.5rem;
  border-bottom: 1px solid #f5f5f5;
}
.serchlist > div > span {
  display: inline-block;
  font-size: 0.8rem;
  color: #f44336;
  margin: 0.7rem 0.1rem;
  padding: 0.3rem 0.5rem;
  border-radius: 0.2rem;
}
.serchlist > div > span.active {
  color: #ffffff;
  background-color: #f44336;
}
.bottomShow {
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  font-size: 0.6rem;
  color: #f44336;
  background-color: #f5f5f5;
}
</style>


