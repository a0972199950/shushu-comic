<template>
  <div id="recharge">
    <Topbar title="充值中心" zIndex="-1"></Topbar>
    <div class="content">
      <img class="content-l" src="/src/assets/Img/user.png" alt>
      <div class="content-r">
        <p class="username">{{user.phone}}</p>
        <p class="userid">用户ID: {{user.id}}</p>
      </div>
    </div>
    <div class="c-top">
      <div class="c-top-i">
        <p>
          <img src="/src/assets/Img/icon08.png" alt>
          金币
        </p>
        <p>
          <span class="f20">{{user.book_bean}}</span>
          <span>剩余数量</span>
        </p>
      </div>
      <div class="c-top-i">
        <p>
          <img src="/src/assets/Img/icon09.png" alt>
          VIP
        </p>
        <p>
          <span id="ff">{{vip.name}}</span>
          <span v-html="vip.info"></span>
        </p>
      </div>
    </div>
    <div class="h16"></div>
    <!-- 充值列表 -->
    <div class="r-box">
      <p class="title">
        <img src="/src/assets/Img/icon08.png" alt>
        金币充值
      </p>
      <img class="rebillboards" src="/src/assets/Img/rebillboards.jpg" alt>
      <ul class="r-list">
        <li
          v-for="(val,index) in list1"
          :key="index"
          :class="[{'checked':val.sort==sort},{'f-hot':isFirst(val.sort)}]"
          @click="handelClick(val)"
        >
          <div class="ov">
            <p class="scolor f16">{{val.price}}</p>
            <p class="f12">
              {{val.text1}}
              <span class="scolor">{{val.text2}}</span>
            </p>
            <p class="tage_name">{{val.tag.label}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="h16"></div>
    <div class="r-box">
      <p class="title">
        <img src="/src/assets/Img/icon09.png" alt>
        VIP充值
      </p>
      <ul class="r-list">
        <li
          v-for="(val,index) in list2"
          :key="index"
          @click="handelClick(val)"
          :class="[{'checked':val.sort==sort},{'f-hot':isFirst(val.sort)}]"
        >
          <div class="ov">
            <p class="scolor f16">{{val.price}}</p>
            <p class="f12">
              {{val.description.split('|')[0]}}
              <span
                class="scolor"
              >{{val.description.split('|')[1]}}</span>
            </p>
            <p class="tage_name" v-if="val.tag.label!==''">{{val.tag.label}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="h16"></div>
    <div class="r-tips">
      <p>温馨提示：</p>
      <p>VIP用户可免费阅读所有VIP作品!</p>
      <!-- <p>储值遇到问题请联系歪歪客服QQ2503793729。</p> -->
      <p>欢迎您使用支付宝/微信储值金币或开通VIP。</p>
    </div>
    <payway :paywayShow="isshow" @closepayway="closepayway" :pay_price="selectPrice"/>
  </div>
</template>
<script>
import Vue from "vue";
import payway from "./Payway.vue";
import Topbar from "../Book/Topbar.vue";
export default {
  name: "recharge",
  components: {
    payway,
    Topbar
  },
  data() {
    return {
      userInfo: {},
      sort: 1,
      isshow: false,
      selectPrice: 29, //默认金额
      list1: [],
      list2: []
    };
  },
  computed: {
    user: function() {
      if (!this.userInfo.phone) {
        this.userInfo.phone = "游客";
      } else if (this.userInfo.phone) {
        this.userInfo.id = this.userInfo.uid;
      }

      return this.userInfo;
    },
    vip: function() {
      var vipinfo = {
        name: "未开通",
        info: "有效期至"
      };
      if (this.userInfo.is_vip != 0) {
        vipinfo.name = "会员";
        var time = this.userInfo.vip_endtime;
        var nowTime = Math.ceil(new Date().getTime() / 1000);
        var iday = Math.ceil((time - nowTime) / 86400);
        vipinfo.info =
          '剩余<span style="color:#f44336;font-size:.75rem;margin:0 2px;">' +
          iday +
          "</span>天";
      }
      return vipinfo;
    }
  },
  mounted() {
    this.getData();
    this.getUserInfo();
  },
  methods: {
    /* 关闭支付方式 */
    closepayway() {
      this.isshow = false;
    },
    getData() {
      var _this = this;
      this.Http.post({
        action: 3002,
        data: {
          sort: 0,
          app: 1
        },
        success: function(result) {
          result.forEach(obj => {
            obj.text1 = obj.description.split("|")[0];
            obj.text2 = obj.description.split("|")[1];
          });
          _this.list1 = result.slice(0, 4);
          _this.list2 = result.slice(4, 7);
          return false;
        }
      });
    },
    handelClick(val) {
      let from = sessionStorage.getItem("from");
      if (from == 2 && this.isAndroid()) {
        this.$router.replace({
          name: "download"
        });
      }
      this.sort = val.sort;
      this.selectPrice = val.price;
      this.isshow = true;
    },
    isFirst(val) {
      if (val == 2 || val == 3 || val == 5) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
#recharge {
  .content {
    padding: 0.6rem 1rem 0rem;
    display: flex;
    .content-l {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
      border: 2px solid white;
      border-radius: 50%;
    }
    .content-r {
      .username {
        font-size: 20px;
        line-height: 2rem;
      }
      .userid {
        font-size: 14px;
      }
    }
  }
  .c-top {
    padding: 0.8rem;
    display: flex;
    &-i {
      width: 50%;
      display: flex;
      &:last-child:before {
        content: "";
        height: 1.8rem;
        width: 1px;
        background: gainsboro;
      }
      > p {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        &:first-child {
          padding: 0 0.8rem;
        }
        img {
          width: 1rem;
          height: 1rem;
        }
        > span:first-child {
          font-size: 16px;
          color: #9c9c9c;
        }
        > span:last-child {
          font-size: 9px;
          margin-top: 0.04rem;
        }
      }
    }
  }
  .r-box {
    padding: 0.4rem 0.8rem 0;
    .title {
      display: inline-block;
      position: relative;
      margin: 0.8rem 0;
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before,
      &::after {
        position: absolute;
        display: inline-block;
        content: "";
        width: 1rem;
        height: 1px;
        background: #f4f4f4;
      }
      &::before {
        left: 5.4rem;
      }
      &::after {
        right: 5.4rem;
      }
      img {
        width: 1rem;
        height: 1rem;
        padding-right: 0.2rem;
      }
    }
    .rebillboards {
      width: 100%;
      margin-bottom: 0.8rem;
    }

    .r-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
        border: 1px solid #ffffff;
        position: relative;
        width: 47%;
        max-width: 47%;
        margin-bottom: 0.8rem;
        text-align: center;
        padding-bottom: 0.35rem;
        box-shadow: 0rem 0.16rem 0.4rem 0.01rem rgba(0, 0, 0, 0.3);
        p:first-child {
          padding-top: 0.35rem;
          padding-bottom: 0.35rem;
        }
        div {
          overflow: hidden;
          position: relative;
          .tage_name {
            position: absolute;
            top: 0.4rem;
            right: -1.3rem;
            left: auto;
            width: 4rem;
            height: 1rem;
            background: #f44336;
            text-align: center;
            line-height: 1rem;
            font-size: 0.6rem;
            color: #fff;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
        p {
          line-height: 20px;
        }
        .scolor {
          color: #f44336;
        }
      }
      .checked {
        border: 1px solid #f44336;
        background-color: #fcc7c3;
      }

      .f-hot::before {
        position: absolute;
        left: -0.3rem;
        top: -0.5rem;
        width: 1.2rem;
        height: 1.2rem;
        content: "";
        background: url(/src/assets/Img/hot.png) no-repeat;
        background-size: cover;
      }
    }
  }
  .r-tips {
    padding: 1rem;
    p {
      font-size: 12px;
      color: #9c9c9c;
      line-height: 1.4rem;
      text-align: center;
    }
  }
}
</style>


