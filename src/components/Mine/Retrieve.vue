<template>
  <div id="retrieve">
    <MineTop title="找回账号"></MineTop>
    <div class="content">
      <p>请查看您支付宝或微信支付记录中的订单信息，复制
        <b>商户单号（CT*******）</b>,粘贴至下方输入框，点击找回账号。
      </p>
      <p>您的账号为:</p>
    </div>
    <div class="container">
      <input type="text" placeholder="商户单号">
      <div class="loginBtn">
        <a href="">找回账号</a>
      </div>
    </div>
    <div class="footer">
      <h2 class="f14">有关账户异常说明:</h2>
      <p class="f12">1、点击个人中心- <span>切换登录</span> 即可使用您找回的账号登录，请您及时
        <span>绑定手机</span> ，避免账户信息再次失败。
      </p>
      <p class="f12">2、若通过订单号仍未找回账号，可联系 <span>客服QQ:2503793729</span> 为您找回您的账号 </p>
    </div>
  </div>
</template>
<script>
import MineTop from "../Book/Topbar.vue";
export default {
   components:{
      MineTop
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  #retrieve{
    .content{
      padding: 0 .6rem ;
      p{
        padding: 0.6rem;
        margin-top: 0.5rem;
        // padding: .24rem!important;
        color: #af7326;
        background-color: #fdf4e8;
        border: 1px solid #f4ebda;
        font-size: 16px;
        line-height: 1.2rem;
      }
    }
    .container{
      padding: 0 .6rem ;
      input{
        display: block;
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-top: 15px;
        border: 1px solid #cbcbcb;
        border-radius: 2px;
        font-size: 14px;
        color: #000;
        outline: none;
        text-indent: .4rem;
      }
      .loginBtn{
        margin-top: 14px;
        background: #f44336;
        text-align: center;
        height: 2.5rem;
        line-height: 2.5rem;
        width: 100%;
        font-size: 16px;
        display: block;
        border-radius: 2px;
        border: 1px solid #f44336;
        a{
          color:#ffffff;
        }
      }
    }
    .footer{
     padding:.6rem ;
      h2{
        line-height: 2rem;
        color: #e63740;
        font-weight: 700;
      }
      p{
        margin-top: .8rem;
        line-height: 1rem;
        span{
          color: #e63740;

        }
      }
    }
  }
</style>

