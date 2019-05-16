import Vue from "vue";
import { Toast } from 'mint-ui';
const merge = require("webpack-merge");

/* 全局定义cookie 操作方法 */

/* 设置cookie */
Vue.prototype.setCookie = function (key, val, time) {
    var date = new Date(); //获取当前时间
    var expiresHour = time;  //将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresHour * 24 * 3600 * 1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ";path=/";  //设置cookie
}
/* 读取cookie */
Vue.prototype.getCookie = function (key, val, time) {
    /*获取cookie参数*/
    var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips = false;  //声明变量tips
    for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
        var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
        if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
            tips = arr[1];   //将cookie的值赋给变量tips
            break;   //终止for循环遍历
        }
    }
    return tips;
}

/* 全局定义判断安卓ios */
Vue.prototype.isAndroid = function () {
    let u = navigator.userAgent;
    let app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return true;
    } else {
        return false;
    }
};


/* 全局定义判断微信 */
Vue.prototype.isWechat = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
};


//全局定义获取用户信息

Vue.prototype.getUserInfo = function (options) {
    var that = this;
    var defaults = {
        action: 1003,
        success: function (data) {
            that.userInfo = data;
        }
    };
    options = merge(defaults, options);
    that.Http.post(options);
};

//全局定义 加入书架

Vue.prototype.joinBookrack = function (bookid, callback) {
    var _this = this;
    this.Http.post({
        action: 1006,
        data: {
            bookid: bookid
        },
        success: function (data, result) {
            if (result.errcode == 0) {
                _this.isAdd = true;
                Toast({
                    message: '加入书架成功',
                    iconClass: 'fa fa-check'
                });
            }
            return false;
        },
        error: function (result) {

            if (parseInt(result.errcode) == 1008) {
                Toast({
                    message: '移除书架成功',
                    iconClass: 'fa fa-check'
                });
            }
            return false;
        }
    });
};

/**
 * 全局定义  下订单 获取订单号
 */
var baseUrl = window.location.href;
var domain = baseUrl.split('/')[2];
var backUrl = 'http://' + domain + '/Index/User/isSuccess';

Vue.prototype.placeOrder = function (money, app, lang, payment, isback) {
    var _this = this;
    this.Http.post({
        action: 3003,
        data: {
            money: money,
            app: app,
            lang: lang,
            payment:payment,
            isback: isback
        },
        success: function (data) {
            var iorder = data.out_trade_no;
            window.sessionStorage.setItem('orderid', iorder);
            var payurl = data.payurl;
            if (payurl) {
                //payurl(iorder)
                window.location.href = payurl + '?callbackurl=' + encodeURIComponent(domain);
            }
            return false;
        }
    });
};