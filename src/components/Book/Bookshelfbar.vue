<!---->
<template>
  <div id="Bookshelfbar">
    <div class="bookshelfbar flex">
      <router-link class="ta" :class="{'active' : isactive == 2}" :to="{name:'Bookshelf'}">阅读记录</router-link>
      <router-link class="ta" :class="{'active' : isactive == 1}" :to="{name:'Bookhistory'}">我的书架</router-link>
    </div>
    <div style="width:100%;height:2.5rem;"></div>
    <div class="bookedit flex">
      <div class="fl">
        <i class="fa fa-file"></i>
        <span>{{title}}&nbsp;&nbsp;({{length.length}})</span>
      </div>
      <div class="fr tr">
        <p class="fr" @click="editBook()">{{edit}}</p>
      </div>
    </div>
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
    edit: {
      get: function() {
          if(this.delBool){
              return '完成'
          }else{
              return '编辑'
          }
      },
      set: function() {
        return this.delBool;
      }
    }
  },
  methods: {
    //
    clickedit() {
      this.$emit("clickedit");
    },
    editBook() {
      this.$emit("clickedit");
    }
  },
  mounted() {},
  props: {
    title: {
      type: String
    },
    delBool: {
      type: Boolean
    },
    isactive:{
      type:Number
    },
    length: {
      type: Array
    }
  }
};
</script>
<style scoped>
.bookedit div:nth-of-type(2) > p {
  color: #9e9e9e;
  height: 2.5rem;
  line-height: 2.5rem;
  width: 3rem;
}
.bookedit div span {
  color: #3e3e3e;
}
.bookedit div i {
  color: #9e9e9e;
  margin-right: 0.3rem;
  font-size: 0.7rem;
}
.bookedit div {
  flex: 1;
  -webkit-flex: 1;
}
.bookedit {
  position: relative;
  height: 2.5rem;
  padding: 0 0.8rem;
  width: 18.4rem;
  align-items: center;
  font-size: 0.7rem;
  border-bottom: 1px solid #f1f1f1;
}
#Bookshelfbar {
  /* height: 2.5rem; */
  position: relative;
}
.bookshelfbar {
  position: fixed;
  width: 20rem;
  max-width: 640px;
  height: 2.5rem;
  background-color: #ffffff;
  line-height: 2.5rem;
  z-index: 2;
}
.bookshelfbar a {
  width: 50%;
  color: #f44336 !important;
  font-size: 0.8rem;
}
.bookshelfbar a.active {
  color: rgba(244, 67, 54, 0.7) !important;
  border-bottom: 2px solid #f44336;
}
.bookshelfbar::after {
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
</style>


