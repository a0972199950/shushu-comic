<template>
  <div id="mine-content">
    <div class="c-top">
      <div class="c-top-i">
        <p>
          <img src="/src/assets/Img/icon08.png" alt>
          金币
        </p>
        <p>
          <span class="f20">{{userinfo.book_bean}}</span>
          <span class="f12">剩余金币</span>
        </p>
      </div>
      <div class="c-top-i">
        <p>
          <img src="/src/assets/Img/icon09.png" alt>
          VIP
        </p>
        <p>
          <span id="ff" class="f16">{{vip.name}}</span>
          <span class="f12" v-html="vip.info">{{}}</span>
        </p>
      </div>
    </div>
    <div class="card-content">
      <div class="billboards" :style="billBoards" @click="gopay()">
        <h4 class="title">咻咻VIP</h4>
        <p class="desc f12">
          开通后免费畅读千部VIP漫画
          <span class="c-btn bold f12">
            立即开通
            <i class="fa fa-angle-right"></i>
          </span>
        </p>
      </div>
      <ul id="card-list">
        <li
          class="list-item"
          v-for="(val,index) in list"
          :key="index"
          :class="[{'line':isLine(index)},{'orange':index==3}]"
          v-show="val.show"
          @click="skip(val)"
        >
          <div class="list-item-l">
            <i class="fa facolor" :class="val.icon"></i>
            {{val.text}}
          </div>
          <div class="list-item-r">
            <span>{{val.address}}</span>
            <i class="fa fa-angle-right"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      billBoards: {
        backgroundImage: "url(./src/assets/Img/vip.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      },
      show: false
    };
  },
  computed: {
    list: function() {
      var isBool = true;

      if (this.userinfo.phone !== "游客") {
        isBool = false;
      }
      return [
        {
          text: "手机注册",
          icon: "fa-phone",
          name: "reg",
          show: isBool
        },
        {
          text: "充值中心",
          icon: "fa-briefcase",
          name: "recharge",
          show: true
        },
        {
          text: "消费记录",
          icon: "fa-file-text",
          name: "records",
          show: true
        },
        {
          text: "下载APP",
          icon: "fa-arrow-circle-down",
          name: "download",
          show: this.isAndroid()
        },
        {
          text: "切换用户",
          icon: "fa-cogs",
          name: "login",
          show: false
        },
        {
          text: "找回用户",
          icon: "fa-check-square",
          name: "retrieve",
          show: true
        },
        {
          text: "联系客服",
          icon: "fa-comment",
          name: "service",
          show: true
        }
      ];
    },
    vip: function() {
      var vipinfo = {
        name: "未开通",
        info: "有效期至"
      };

      if (this.userinfo.is_vip != 0) {
        vipinfo.name = "会员";
        var time = this.userinfo.vip_endtime;
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
  methods: {
    gopay() {
      this.$router.push({ name: "recharge" });
    },
    skip(val) {
      this.$router.push({ name: val.name });
    },
    isLine(val) {
      if (val == 0 || val == 3 || val == 5) {
        return true;
      }
      return false;
    },

    toAddress() {
      this.show = true;
      MessageBox("Notice", "You clicked the button");
      //  MessageBox.alert('Success!').then(action => {

      // });
      // MessageBox.confirm('Are you sure?').then(action => {
      // });
      MessageBox.prompt("Please tell me your name").then(
        ({ value, action }) => {
          MessageBox.confirm("Are you sure?").then(action => {});
        }
      );
    }
  },
  mounted() {
    console.log(this.isAndroid())
    
  },
  props: {
    userinfo: {}
  }
};
</script>
<style lang="scss" scoped>
#mine-content {
  margin-top: -2.7rem;
  border-radius: 1rem;
  z-index: 999;
  background: #ffffff;
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
        font-size: 12px;
        &:first-child {
          padding: 0 1.1rem;
        }
        img {
          width: 1rem;
          height: 1rem;
        }
        > span:first-child {
          color: #9c9c9c;
        }
        > span:last-child {
          margin-top: 0.04rem;
        }
      }
    }
  }
  .card-content {
    border-top: 1px solid #f1f1f1;
    margin: 0.6rem;
    .billboards {
      height: 4.6rem;
      padding: 0 0 0 4.6rem;
      color: #ffffff;
      display: none;
      .title {
        padding-top: 1.3rem;
        line-height: 1rem;
      }
      .desc {
        font-size: 0.6rem;
        line-height: 1rem;
        // display: flex;
        // justify-content: space-between;s
        .c-btn {
          float: right;
          line-height: 1rem;
          padding: 0.06rem 0.6rem;
          background: #ffffff;
          border-radius: 0.5rem;
          color: #000;
          margin-right: 1rem;
        }
      }
    }
    #card-list {
      z-index: 0;
      padding: 0.3rem 0 0 0;

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        padding: 0.5rem 0.4rem;
        &.line {
          padding-bottom: 0.6rem;
          margin-bottom: 0.2rem;
          border-bottom: 1px solid #f1f1f1;
        }
        &.orange {
          color: rgb(244, 141, 116);
        }
        .list-item-l {
          font-size: 14px;
          height: 1.5rem;
          line-height: 1.5rem;
          .facolor {
            font-size: 1rem;
            color: #f56336;
            margin-right: 0.3rem;
          }
          img {
            width: 1.1rem;
            height: auto;
            margin-right: 0.3rem;
          }
        }

        .list-item-r {
          display: flex;
          align-items: center;
          font-size: 10px;
          color: #9c9c9c;
          .fa-angle-right {
            padding-left: 0.3rem;
            font-size: 18px !important;
          }
        }
      }
    }
  }
}
</style>


