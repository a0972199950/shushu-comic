
import qs from 'qs';
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import apiList from "./api.config";

const merge = require("webpack-merge");

var baseUrl = "http://apien.lookbywhile.com/v1"; //设置你的baseUrl


/**
* 根据环境设置接口请求 host
*/
switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "http://apien.lookbywhile.com/v1"; //设置你的baseUrl
    break;
  case "production":
    baseUrl = "/v1";
    break;
  case "test":
    baseUrl = "http://apien.lookbywhile.com/v1";
    break;
}

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
//设置token
function setToken() {
  if (2) {
    axios.defaults.headers.common['token'] = 0
  }
}
//请求验证拦截器
axios.interceptors.request.use(config => {
  //console.log('这里做请求拦截处理')
  return config;
});
//返回数据拦截器
axios.interceptors.response.use(res => {
  //console.log('这里做返回拦截处理')
  return res;
});

//获取token
var requestToken = window.localStorage.getItem('token');
if (!requestToken) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  for (var i = 0; i < 32; i++) uuid[i] = chars[0 | Math.random() * 62];
  requestToken = uuid.join('');
  window.localStorage.setItem("token", requestToken);
}

/*
    检测是否有refid，linkid
*/
const getParam = i => {
  var v = getQueryString(i);
  if (!v) v = '';
  return v;
}
const getQueryString = name => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
}

/*
*获取url是否含有参数,有则传递给后台
*/
var domain = window.location.href;
var isHas = true;
if (domain.indexOf('refid') != -1 || domain.indexOf('linkid') != -1) {
  isHas = false;
}
var getComData = () => {
  var ComData = {};
  if (!isHas) {
    //isHas = true;
    ComData = {
      'refid': getParam('refid'),
      'linkid': getParam('linkid'),
      'from': getParam('from')
    }
  }
  ComData.from && sessionStorage.setItem("from", ComData.from);
  return ComData;
}


//封装请求方法
function formatReq(options, requestOptions) {
  //查找接口地址
  var actionUrl = apiList[options.action];
  if (actionUrl) {
    //默认设置
    var defaults = {
      showLoading: true,
      showMessage: true,
      success: null,
      error: null,
      data: {}
    };
    options = merge(defaults, options);
    //请求loading效果
    if (options.showLoading) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    }
    //全局 共有参数 设置;
    var oComData = getComData();
    // console.log(oComData)
    options.data = merge(options.data, oComData);

    //axios请求默认设置
    var requestDefaults = {
      url: baseUrl + actionUrl,
      method: "post",
      responseType: "json",
      crossDomain: true,
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Access-Token": requestToken
      },
      data: qs.stringify(options.data)
    };
    requestOptions = merge(requestDefaults, requestOptions);

    return axios(requestOptions).then(function (res) {
      if (res.status != 200) {
        Toast("网络请求错误" + res.status);
        return false;
      }
      var result = res.data;
      Indicator.close();
      var ToastOptions = {
        type: 'text',
        message: "",
        duration: 3000,
        position: "middle"
      };
      switch (parseInt(result.errcode)) {
        case 0: //请求成功
          ToastOptions.type = "success";
          break;
        case 1000: //需要登录的错误码
        case 1001:
          Toast('请先绑定手机号码');
          break;
        default:
          ToastOptions.type = "text";
          ToastOptions.position = "bottom";
      }
      if (ToastOptions.type == "success" && typeof options.success == "function") {
        var callback = options.success(result.data, result);
        if (callback === false) {
          return;
        }
      }
      if (ToastOptions.type != "success" && typeof options.error == "function") {
        var callback = options.error(result);
        if (callback === false) {
          return;
        }
      }
      if (options.showMessage && result.msg) {
        ToastOptions.message = result.msg;
        //console.log(ToastOptions)
        //Indicator(ToastOptions);
      }
    });
  } else {
    Toast("出错了");
    return false;
  }
}


const Http = {
  post: (url, data) => formatReq(url, data)
};

export default Http;