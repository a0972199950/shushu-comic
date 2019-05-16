const Home = () => import('../../components/Home/Home.vue')
const Book = () => import('../../components/Book/Bookcity.vue')
const BookInfo = () => import('../../components/Book/Bookinfo.vue')
const BookInfoR = () => import('../../components/Book/BookinfoR.vue')
const Bookmulu = () => import('../../components/Book/Bookmulu.vue')
const Bookshelf = () => import('../../components/Book/Bookshelf.vue')
const Bookhistory = () => import('../../components/Book/Bookhistory.vue')
const Bookread = () => import('../../components/Book/Bookread.vue')
const Bookmore = () => import('../../components/Book/Bookmore.vue')
const Mine = () => import('../../components/Mine/Mine.vue')
const Recharge = () => import('../../components/Mine/Recharge.vue')
const Records = () => import('../../components/Mine/Records.vue')
const Service = () => import('../../components/Mine/Service.vue')
const Retrieve = () => import('../../components/Mine/Retrieve.vue')
const Switching = () => import('../../components/Mine/Switching.vue')
const Download = () => import('../../components/Mine/Download.vue')
const Login = () => import('../../components/Mine/Login.vue')
const Reg = () => import('../../components/Mine/Reg.vue')
const wechat = () => import('../../components/Error/wechat.vue')
export default{
    'mode':'history',
	routes: [

		{
			meta: {
				title: "首页",
				index:1,
				FooterShow:true
			},
			name:'Home',
			path:'/home',
			component:Home
		},

		{
			meta: {
				title: "书城",
				index:2,
				FooterShow:true
			},
			name:'Book',
			path:'/book',
			component:Book
		},
		{
			meta: {
				title: "书籍详情",
				index:3,
				FooterShow:false
			},
			name:'Bookinfo',
			path:'/book/:id',
			component:BookInfo
		},
		{
			meta: {
				title: "书籍详情",
				index:3,
				FooterShow:false
			},
			name:'BookinfoR',
			path:'/books/:id',
			component:BookInfoR
		},
		{
			meta: {
				title: "我的书架",
				index:4,
				FooterShow:true
			},
			name:'Bookshelf',
			path:'/Bookshelf',
			component:Bookhistory
		},
		{
			meta: {
				title: "阅读记录",
				index:5,
				FooterShow:true
			},
			name:'Bookhistory',
			path:'/Bookhistory',
			component:Bookshelf
		},
		{
			meta: {
				title: "书籍目录",
				index:6,
				FooterShow:false
			},
			name:'Bookmulu',
			path:'/cat/:id',
			component:Bookmulu
		},
		{
			meta: {
				title: "书籍阅读",
				index:7,
				FooterShow:false
			},
			name:'read',
			path:'/read/:id',
			component:Bookread
		},
		{
			meta: {
				title: "更多书籍",
				index:2,
				FooterShow:false
			},
			name:'Bookmore',
			path:'/Bookmore/:id',
			component:Bookmore
		},
		{
			meta: {
				title: "个人中心",
				index:4,
				FooterShow:true
			},
			name:'Mine',
			path:'/mine',
			component:Mine
		},
		{
			meta: {
				title: "充值中心",
				FooterShow:false
            },
			path: '/recharge',
			name:"recharge",
			component:Recharge
		},
		{
			meta: {
				title: "消费记录",
				FooterShow:false
            },
			path: '/records',
			name:"records",
			component:Records
		},
		{
			meta: {
				title: "客服",
				FooterShow:false
            },
			path: '/service',
			name:"service",
			component:Service
		},
		{
			meta: {
				title: "找回用户",
				FooterShow:false
            },
			path: '/retrieve',
			name:"retrieve",
			component:Retrieve
		},
		{
			meta: {
				title: "切换用户",
				FooterShow:false
            },
			path: '/switching',
			name:"switching",
			component:Switching
		},
		{
			meta: {
				title: "登陆",
				FooterShow:false
            },
			path: '/login',
			name:"login",
			component:Login
		},
		{
			meta: {
				title: "注册",
				FooterShow:false
            },
			path: '/reg',
			name:"reg",
			component:Reg
		},
		{
			meta: {
				title: "下载中心",
				FooterShow:false
            },
			path: '/download',
			name:"download",
			component:Download
		},
		{
			meta: {
				title: "错误页面",
				FooterShow:false
            },
			path: '/wechat',
			name:"wechat",
			component:wechat
		},
		{
			meta: {
                title: "首页"
            },
			path:'*',
			redirect:'/home'
		}
	]
}