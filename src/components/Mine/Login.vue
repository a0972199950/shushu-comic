<template>
  <div class="new_login">
    <div id="personal" class="page-content tab tab-active">
      <div class="page" data-name="readerLogin">
        <div class="page-content login-screen-content">
          <div class="login-screen-title">
            <div class="padding-vertical">
              <div class="reader-login-title"></div>
            </div>
          </div>
          <form class="list no-hairlines">
            <ul>
              <li class>
                <div class="item-content item-input">
                  <div class="item-media">
                    <i class="fa fa-user"></i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title item-floating-label">用户</div>
                    <div class="item-input-wrap" :class="{activeFocus:0==getAct}">
                      <input
                        type="number"
                        name="phone"
                        placeholder="请输入手机号码"
                        v-model="phone"
                        @focus="changeBottom(0)"
                      >
                      <span class="input-clear-button"></span>
                    </div>
                  </div>
                </div>
              </li>
              <li class>
                <div class="item-content item-input">
                  <div class="item-media">
                    <i class="fa fa-unlock-alt faa"></i>
                  </div>
                  <div class="item-inner">
                    <div class="item-title item-floating-label">密码</div>
                    <div class="item-input-wrap" :class="{activeFocus:1==getAct}">
                      <input
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        v-model="password"
                        @focus="changeBottom(1)"
                      >
                      <span class="input-clear-button"></span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
          <div style="width:100%;height:.2rem"></div>
          <div class="list">
            <a
              class="margin margin-vertical-lg button button-round button-fill login"
              href="#"
              @click="login()"
            >登陆</a>
          </div>
        </div>
      </div>
      <div class="ishave">
        <router-link :to="{name: 'reg'}">没有账号，去注册</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      tableHeight: "",
      phone: "",
      password: "",
      getSlot: [{ id: 0 }, { id: 1 }],
      getAct: -1,
      httpdata: {
        phone: "",
        password: "",
        lang:1,
        reg:0
      }
    };
  },
  mounted() {
    this.tableHeight = document.body.clientHeight;
  },
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  methods: {
    changeBottom(i) {
      this.getAct = i;
    },
    promte(val) {
      var info = "";
      if (val == "0") {
        info = "登陆成功";
      } else if (val == "1") {
        info = "请输入手机号码";
      } else if (val == "2") {
        info = "手机号码格式不正确";
      } else if (val == "3") {
        info = "密码的长度应6位到18位";
      } else {
        info = val;
      }
      MessageBox({
        title: "提示",
        message: info
      }).then(() => {
        if (val == "0") {
          this.$router.push({ name: "Home" });
        }
      });
    },
    Verify() {
      //验证手机号码和格式
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == "") {
        this.promte("1");
        return false;
      } else if (!reg.test(this.phone)) {
        this.promte("2");
        return false;
      }
      //验证密码长度
      var length = this.password.length;
      if (length < 6 || length > 18) {
        this.promte("3");
        return false;
      }
      return true;
    },
    login() {
      var islogin = this.Verify();
      if (!islogin) {
        return;
      }
      this.httpdata.phone = this.phone;
      this.httpdata.password = this.password;
      this.Http.post({
        action: 1002,
        data: this.httpdata,
        showMessage: false,
        success: function(res, res2) {
          if (res2.errcode == 0) {
            this.promte("0");
          } else if (res2.errcode == 1004) {
            this.promte(res.msg);
          }
        }.bind(this),
        error: function(res) {
          this.promte(res.msg);
        }.bind(this)
      });
    }
  }
};
</script>
<style scoped>
.new_login {
  padding: 3rem 1.2rem;
}
.login-screen-title {
  margin-bottom: 2.2rem;
}
.reader-login-title {
  display: block;
  margin: auto;
  text-align: center;
  width: 6.7rem;
  height: 2.7rem;
  background: transparent url("/src/assets/Img/new_logo.png") no-repeat 50%/100%;
}
.list {
  margin: 1.5rem 0;
}
li {
  margin-bottom: 1rem;
}
.list li,
.item-content {
  position: relative;
  display: flex;
  display: -webkit-flex;
  height: 3.5rem;
  flex: 1;
}
.item-media {
  width: 1.5rem;
  height: 3.5rem;
  font-size: 1.2rem;
  color: #737373;
  text-align: center;
  line-height: 3.5rem;
  margin-right: 1rem;
}
.item-inner {
  flex: 1;
}
input {
  width: 98%;
  display: block;
  height: 2.2rem;
  position: relative;
  border-bottom: 1px solid #f5f5f5 !important;
  padding-left: 2%;
  font-size: 16px;
}
input[type="number"] {
  background-color: transparent;
  border: none;
  color: #565656;
}
input[type="password"] {
  background-color: transparent;
  border: none;
  color: #565656;
}
.item-input-wrap {
  position: relative;
}
.activeFocus span {
  position: absolute;
  height: 2px;
  width: 100%;
  background-color: #f44336;
  transition: all 0.5s linear;
  -webkit-transform: scale(1, 1);
}
.input-clear-button {
  -webkit-transform: scale(1, 0);
}
.item-floating-label {
  color: #f44336;
  font-size: 0.7rem;
}
.login {
  display: block;
  width: 100%;
  height: 0.2.4rem;
  line-height: 2.4rem;
  border-radius: 2.4rem;
  text-align: center;
  background-color: #f44336;
  color: #fff;
}
.ishave {
  text-align: center;
  font-size: 0.3rem;
}
.ishave a {
  color: #f44336;
  font-size: 0.75rem;
}
</style>


