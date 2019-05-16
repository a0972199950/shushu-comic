<!--轮播-->
<template>
  <div id="Swiper">
    <div class="Swiper_top">
      <img src="/src/assets/Img/swiperBj.png" alt class="Swiper_top_img">
    </div>
    <div class="titleName">
      <img src="/src/assets/Img/new_logo.png" alt>
    </div>

    <mt-swipe ref="swipe" :auto="3000" :showIndicators="false">
      <mt-swipe-item v-for="(val,index) in bannerlist" :key="index">
        <!-- <router-link :to="{name: 'Bookinfo', params: {id: val.bookid}}">
          <img :src="val.thumb" alt>
        </router-link>-->
        <a href="javascript:;" @click.stop="jump_bookinfo(val.bookid,val.isread,val.chapter_id)" class="swiperImgBox">
          <img :src="val.thumb" alt>
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
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
             console.log("随机",result);
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
          _this.loadLastRead(id);
        }
      }
    }
  },
  mounted() {},
  props: {
    bannerlist: {
      type: Array,
      default: function() {
        return [];
      }
    },
    moreId: {
      type: Number
    },
    rand: {}
  }
};
</script>

<style scoped>
#Swiper {
  height: 10.5rem !important;
  max-height: 10.5rem;
  overflow: hidden;
  position: relative;
  padding: 0 2%;
}
.Swiper_top {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  height: 7rem;
  background-color: #f44336 !important;
}
#Swiper img.Swiper_top_img {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  height: 2.5rem;
  bottom: 0;
}
.swiperImgBox{
  width: 100%;
  height: 8.5rem;
  display: block;
  border-radius: .3rem;
}
.swiperImgBox img{
  border-radius: .3rem;
}
#Swiper img {
  width: 100%;
  height: 100%;
}
.titleName {
  height: 1.5rem;
  padding: 0.25rem 0.8rem;
}
#Swiper .titleName img {
  position: absolute;
  z-index: 3;
  height: 1.5rem;
  width: 4rem;
}
</style>


