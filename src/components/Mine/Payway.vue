<template>
  <div id="payway">
    <transition-group name="fade">
      <div v-show="payShow" class="paywayPop" :key="1"></div>
      <div v-show="payShow" class="container" :key="2">
        <div class="paywayBox">
          <p>请选择您的支付方式</p>
          <img src="/src/assets/Img/close.png" alt id="closepayway" @click="close_payway()">
          <div class="paywayInfo">
            <div class="payway_IMgbox">
              <div @click="go_pay('weixin')">
                <img src="/src/assets/Img/weixin.png" alt>
                <br>
                <span>微信支付</span>
              </div>
              <!-- <div @click="go_pay('Alipay')">
                <img src="/src/assets/Img/alipay.png" alt>
                <br>
                <span>支付宝</span>
              </div> -->
            </div>
            <div class="paywaysay">
              <img src="/src/assets/Img/safe_img.png" alt>&nbsp;&nbsp;&nbsp;&nbsp;温馨提示：软件已经官方授权，保护支付环境，保障财产安全，请放心使用。
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "mint-ui";
export default {
  name: "Payway",
  data() {
    return {
      payShow66: true
    };
  },
  computed: {
    /* 返回数据 */
    is_back: function() {
      var data_back = +sessionStorage.getItem("isback");
      if (data_back == 1) {
        return 1;
      } else {
        return 0;
      }
    },
    payShow: {
      get: function() {
        return this.paywayShow;
      },
      set: function() {
        return this.paywayShow;
      }
    },
    price: function() {
      return this.pay_price;
    }
  },
  methods: {
    /* 关闭弹框 */
    close_payway() {
      this.$emit("closepayway");
    },
    clearShow() {
      this.$emit("closepayway");
    },
    go_pay(payment) {
      if (this.price > 0) {
        this.placeOrder(parseInt(this.price * 100), 1, 1, payment,this.is_back);
      } else {
        Toast.fail("请选择金额");
      }
    }
  },
  props: {
    paywayShow: {
      type: Boolean,
      default: false
    },
    pay_price: {
      default: ""
    }
  },
  mounted() {},
  activated() {}
};
</script>

<style scoped>
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 85%;
  max-width: 500px;
  font-size: 16px;
  overflow: hidden;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 4px;
  background-color: #fff;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 2;
  height: 15rem;
  overflow: hidden;
}
.paywayPop {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  background-color: rgba(00, 0, 0, 0.3);
  z-index: 2;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s all ease;
}
.fade-enter-active {
  bottom: 0;
  opacity: 1;
}
.fade-leave-active {
  opacity: 0;
  bottom: -2.5rem;
}

.fade-enter,
.fade-leave {
  bottom: -2.5rem;
  opacity: 0;
}
.paywayBox {
  position: relative;
  text-align: center;
}
.paywayBox > p {
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: rgb(88, 88, 88);
}
.payway_IMgbox {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.6rem;
  padding: 0 1.5rem;
}
.payway_IMgbox > div {
  flex: 1;
  -webkit-flex: 1;
  text-align: center;
}
.payway_IMgbox > div > img {
  pointer-events: auto;
  width: 4rem;
  margin-bottom: 0.2rem;
}
#closepayway {
  pointer-events: auto;
  position: absolute;
  width: 1.6rem;
  right: 0.6rem;
  top: 0.4rem;
}
.payway_IMgbox > div > span {
  font-size: 0.85rem;
}
.paywayBox {
  padding: 2.5rem 1.5rem 3rem;
}
.paywaysay {
  position: relative;
  color: #bdc0bf;
  font-size: 0.6rem;
  line-height: 1rem;
}
.paywaysay > img {
  position: absolute;
  top: 0.15rem;
  width: 0.7rem;
  height: 0.7rem;
}
</style>


