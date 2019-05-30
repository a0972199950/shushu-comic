<!--更多书籍-->
<template>
  <div id="Bookmore">
    <Topbar :title="title" zIndex="-1"></Topbar>
    <Booklike title="猜你喜欢" pop class="newBook" :hotlist="Bookarr" hideClass="hide" :moreId="44" :rand="likeBookConfig"></Booklike>
    <Bookcity bookcityClasshide="hide" :loaddata="loaddata" :httpurl="httpurl" :freenav="freenav" v-if="freenav!==11"></Bookcity>
  </div>
</template>

<script>
import Vue from "vue";
import Topbar from "./Topbar.vue";
import Booklist from "../Common/Booklist.vue";
import Booklike from "../Common/Booklike.vue";
import Bookcity from "./Bookcity.vue";
export default {
  name: "Bookmore",
  components: {
    Booklist,
    Topbar,Booklike,Bookcity
  },
  data() {
    return {
      title: this.$route.params.title,
      moreId: this.$route.params.id,
      Bookarr: [],
      freenav:this.$route.params.id,
      likeBookConfig:{isrand: 1, weight: 20, target: 78, high: 77},
      httpurl:2009,
      loaddata:{
        num:'20',
        sortField:'rate_order',
        sort:'desc',
        lang:1,
        page:1
      }
    };
  },
  computed: {},
  methods: {
    getData() {
      var _this = this;
      this.Http.post({
        action: 3001,
        data: {
          ids: _this.moreId
        },
        success: function(result) {
          _this.Bookarr = result[_this.moreId];
          return false;
        }
      });
    }
  },
  mounted() {
    this.getData();
    console.log(this.moreId)
  },
  props: {},
  watch: {
    $route(to, form) {
      this.title = this.$route.params.title,
      this.moreId = this.$route.params.id,
      this.getData();
    },
    immediate: true
  }
};
</script>

