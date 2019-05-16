<!---->
<template>
  <div id="Swiper">
    <mt-swipe ref="swipe" :auto="0" :showIndicators="false">
      <mt-swipe-item v-for="(val,index) in banner" :key="index">
        <img :src="val.book_img" alt>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name:'',
    data(){
      return{

      }
    },
    computed:{

    },
    methods:{

    },
    mounted(){

    },
    props: {}
}
</script>

