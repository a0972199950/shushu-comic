/**
 * 接口地址设置表
 */
var apiList = {
    //测试接口地址
    1001: "/auth/register", //获取公众号信息
    1002: '/login/index',//会员登陆
    1003: "/fans/info", //会员信息
    1004: "/fans/sign", //签到
    1005: "/fav/lists", //个人收藏夹
    1006: "/fav/add", //收藏或移出收藏漫画
    1007: "/history/join", //写入阅读记录
    1008: "/history/lists", //历史记录列表
    1009: "/history/remove", //移除历史记录
    1010: "/trade/lists", //消费记录列表
    1011: "/fav/isfav", //书籍是否收藏
    1012: "/history/last", //某本书的最后一次阅读
    1013: "/fans/find", //找回账号
    1014: "/fans/countorder", //用户付款次数


    2001: "/category/lists", //漫画分类列表
    2002: "/category/name", //获取漫画分类名称
    2003: "/book/info", //漫画详情信息
    2004: "/book/catalog", //漫画目录
    2005: "/book/chapter", //漫画内容
    2006: "/book/search", //漫画搜索
    2007: "/book/lists", //漫画搜索
    2008: "/book/chapter", //获取章节内容
    2009: "/book/minlist", //排序加载
    2010: "/picture/err",


    3001: "/index/data", //获取推荐位数据
    3002: "/price/lists", //价格列表
    3003: "/order/confirm", //创建订单
    3004: "/order/payurl", //微信h5支付
    3005: "/order/status", //订单状态查询接口
    3006: "/index/download",  //下载APP
    3007: "/tongji/show",  //注入统计代码
    3008: "/tongji/referer",  //记录来源
    3009: "/index/reback", //返回推荐漫画数据
    3015: "/recommend/lists", //获取推荐位内容（带随机跳转）
    3016: "/recommend/rand"  //随机跳转书籍
};

export default apiList;