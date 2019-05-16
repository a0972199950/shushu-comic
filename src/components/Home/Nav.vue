<!---->
<template>
  <div id="NavHome" class="flex">
        <router-link :to="{name:val.name,params:{id:val.moreId,title:val.info}}" v-for="(val,index) in navHome" :key="index">
            <img :src="val.images" :alt="val.info">
            <div>{{val.info}}</div>
        </router-link>
        <a href="javascript:;" class="" @click="jump_free()">
            <img src="/src/assets/Img/Free.png" alt="VIP免费"> 
            <div>VIP免费</div>
        </a>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import "vant/lib/index.css";
Vue.use(Dialog);
export default {
  name:'',
    data(){
      return{
          navlist:[
              
          ],
          free:{
                    images:'./src/assets/Img/Free.png',
                    name:'Bookmore',
                    info:'VIP免费',
                    moreId:11
                },
            userInfo: {}
      }
    },
    computed:{
        navHome:function(){
            return[
                {
                    images:'./src/assets/Img/Top.png',
                    name:'Bookmore',
                    info:'榜单',
                    moreId:10
                },
                
                {
                    images:'./src/assets/Img/Recond.png',
                    name:'Bookmore',
                    info:'推荐',
                    moreId:3
                },
                {
                    images:'./src/assets/Img/Pay.png',
                    name:'recharge',
                    info:'充值'
                }
            ]
        }
    },
    methods:{
        DialogInfo(info){
            var that = this;
            Dialog.confirm({
            title: '温馨提示',
            message: info + '<span style="color:#f00;font-size:16px;">VIP免费激情漫画</span>，请充值成为VIP，激情漫画看不停！！',
            }).then(() => {
                that.$router.push({
                    name: "recharge"
                });
            }).catch(() => {
            // on cancel
            });
        },
        jump_free(){
            var that = this;
            var is_vip = this.userInfo.is_vip;
            if(is_vip == 0 || is_vip == '0'){
                this.DialogInfo('非VIP用户不能查看')
            }else{
                that.$router.push({
                    name: that.free.name,
                    params: {
                        id:that.free.moreId,
                        title:that.free.info
                    }
                });
            }
        }
    },
    mounted(){
        this.getUserInfo();
    },
    props: {}
}
</script>
<style scoped>
#NavHome{
    height: 4rem;
    align-items: center;
    justify-content: center;
    text-align: center;
}
#NavHome > a{
    flex: 1;
    -webkit-flex:1;
}
#NavHome > a img{
    width: 2rem;
    height: 2rem;
    margin-bottom: .1rem;
}
#NavHome > a div{
    font-size: .8rem;
}
</style>


