<template>
  <div id="service">
    <MineTop title="客服中心"></MineTop>
    <h3 class="s-download">
      <!-- <router-link :to="({name:'download'})">点击下载APP</router-link> -->
    </h3>
    <!-- <h3>若您的账户、金币或VIP服务异常:</h3>
    <h2>添加小姐姐客服微信</h2>
    <div class="img">
      <img src="/src/assets/Img/qrcode.jpg" alt="1">
    </div>
    <h5>可截屏二维码微信中识别</h5>
    <h5>小姐姐24 小时客服QQ号码 <span>2503793729</span> </h5>
    <h5>若未能及时回复，可能小姐姐繁忙或正在休息</h5>
    <h5>小姐姐会逐一答复所有的用户反馈请您耐心等待哦</h5> -->
  </div>
</template>
<script>
  import MineTop from "../Book/Topbar.vue";
  export default {
    components:{
        MineTop
    },

  }
</script>

<style lang="scss" scoped>
  #service{
    text-align: center;
    .s-download{
      padding-top: 1rem;
      a{
         color:#f44336;
      }
    }
    .img{
      width: 8rem;
      height: 8rem;
      border: 1px solid #9c9c9c;
      border-radius: 0.2rem;
      background: #f4f4f4;
      padding: .4rem;
      margin: 1.4rem auto;
      img{
        width: 100%;
      }
    }
    h3{
       line-height: 2.6rem;
    }
    h5{
      line-height: 2rem;
      color:#9c9c9c;
      span{
        color:#000;
      }
    }
  }
</style>
