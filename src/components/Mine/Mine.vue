<template>
  <div id="Mine">
    <header id="mine-header" :style="backgroundDiv">
      <!-- <div id="theme" :style="themeDiv">
        <img src="/src/assets/Img/icon10.png" alt="">
      主题</div>-->
      <div class="content">
        <img class="content-l" src="/src/assets/Img/user.png" alt>
        <div class="content-r">
          <p class="username">{{user.phone}}</p>
          <p class="userid f12">用户ID: {{user.id}}</p>
        </div>
      </div>
    </header>
    <List :userinfo="userInfo"></List>
    <router-link v-show="loginShow" class="exit" :to="{name:'login'}">登录</router-link>
    <div style="width:100%;height:2rem;"></div>
    <tabFooter tab="Mine"></tabFooter>
  </div>
</template>

<script>
import List from "./List.vue";
import tabFooter from "../Common/Footer.vue";
export default {
  name: "mine",
  components: {
    List,tabFooter
  },
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(/src/assets/Img/bg-red1.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      userInfo: {}
    };
  },
  computed: {
    loginShow:function(){
      if(this.userInfo.phone == '游客'){
        return true
      }else{
        return false
      }
    },
    user: function() {
      if (!this.userInfo.phone) {
        this.userInfo.phone = "游客";
      }else if(this.userInfo.phone){
        this.userInfo.id = this.userInfo.uid;
      }

      return this.userInfo;
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#mine-header {
  height: 10rem;
  background: #f44336;
  #theme {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #f44336;
    color: #ffffff;
    border: 1px solid #ffffff;
    width: 4rem;
    height: 1.35rem;
    border-radius: 13px;
    text-align: center;
    line-height: 1.35rem;
    font-size: 13px;
    img {
      width: 1rem;
    }
  }
  .content{
    padding:  2.5rem .65rem 0rem;
    display: flex;
    .content-l{
       width: 2.86rem;
       height: 2.86rem;
       margin-right: 1rem;
       border:2px solid white;
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
}
.exit {
  display: block;
  height: 2.4rem;
  border: 1px solid gainsboro;
  border-radius: 0.3rem;
  color: #f44336;
  text-align: center;
  line-height: 2.4rem;
  margin: 0 0.4rem .5rem;
}

// #mine-content{
//   margin-top: -2rem;
//   height: 10rem;
//   border:1px solid red;
//   border-radius: 1rem;
//   z-index: 999;
// }

// .top {
//   height: 6.25rem;
//   padding-top: 1.625rem;
//   padding-bottom: 1.31rem;
//   img {
//     height: 3.6875rem;
//     height: 3.6875rem;
//     border-radius: 50%;
//     margin-bottom: 0.75rem;
//   }
//   .userName {
//     font-size: 0.75rem;
//     color: #2d2528;
//     margin-bottom: 0.5rem;
//   }
//   .userID {
//     font-size: 0.65rem;
//     color: #9d9498;
//   }
// }
// .MineInfo {
//   padding: 1rem;
//   li {
//     height: 2.5625rem;
//     line-height: 2.5625rem;
//     align-items: center;
//     color: #2d2528;
//     font-size: 0.8rem;
//     .left {
//       width: 6.25rem;
//       img {
//         width: 1rem;
//         height: 1rem;
//         margin-right: 0.5rem;
//       }
//     }
//     .right {
//       flex: 1;
//       -webkit-flex: 1;
//       margin-left: 1rem;
//       font-size: 0.625rem;

//       span {
//         color: #9d9498;
//         em {
//           color: #ff4778;
//         }
//       }
//     }
//   }
// }
</style>
