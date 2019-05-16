import Vue from 'vue'
import App from './App.vue'
/* vue-router */
import VueRouter from 'vue-router'
import routerConfig from './assets/js/router.config.js'
/* mint */
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
/* reset */
import './assets/css/style.css'
import './assets/css/icon.css'
import './assets/js/reset.js'
import Http from './assets/js/Http.js'
//定义全局变量
Vue.prototype.Http = Http;

Vue.config.productionTip = false

//公共js
import './common.js'

import { lastread,tips } from "./components/Tips";

Vue.use(tips);
Vue.use(lastread);

Vue.use(Mint);
Vue.use(VueRouter);

const router = new VueRouter(routerConfig);

//过滤器
import filters from './filters/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});


/* 返回书籍 */
var back_chapterId = '';
var back_bookid = '';
Http.post({
  action: 3009,
  showMessage: false,
  success: function (data) {
    back_chapterId = data.chapter_id;
    back_bookid = data.cartoon_id;
  }
});
var baseUrl = window.location.href;
var domain = baseUrl.split('/')[2];
function goBack() {
  back_chapterId = back_chapterId == '' ? 2237 : back_chapterId;
  back_bookid = back_bookid == '' ? 2065 : back_bookid;
  sessionStorage.setItem('isback', 1);
  sessionStorage.setItem('back_bookid', back_bookid);
  window.location.replace('http://' + domain + '/read/' + back_chapterId)
}
router.beforeEach((to, form, next) => {
  /*路由变化修改title*/
  window.document.title = to.meta.title;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  //每次跳转后删除渠道统计代码
  var sTotal = document.getElementById("isTotal");
  if (sTotal != null || sTotal == '' || sTotal == 'undefined') {
    sTotal.parentNode.removeChild(sTotal);
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  /* 是首页的时候返回拦截到指定书籍 */
  if (to.name == 'Home') {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', goBack, false);
    }
  } else {
    window.removeEventListener('popstate', goBack, false);
  }
  next();
  /* 
  *百度统计渠道----js只加载一次，所以每次路有跳转都加载渠道统计代码
  */
  Http.post({
    action: 3007,
    showMessage: false,
    success: function (data) {
      if (data) {
        var _hmt = _hmt || [];
        (function () {
          var hm = document.createElement("script");
          hm.setAttribute("id", "isTotal");;
          hm.src = "https://hm.baidu.com/hm.js?" + data.key;
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
      }
    }
  });
});

/* 
* 面对自己项目千奇百怪需求
*/

/* 百度统计 */
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?4224f28a30aa47a29742494c5c3677c6";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

/* 页面是否被iframe */
var intervalT = setInterval(function () {
  var obj = document.getElementsByTagName('iframe');
  var iframeL = obj.length;
  if (iframeL > 0) {
    for (var i in obj) {
      obj[i].className = 'iframe' + i;
      var paras = document.getElementsByClassName('iframe' + i);
      paras[i].parentNode.removeChild(paras[i]);
    }
  } else {
  }
}, 200);
setTimeout(function () { clearInterval(intervalT) }, 5000)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});