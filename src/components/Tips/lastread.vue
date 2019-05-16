<template>
    <div id="lastread">

    </div>
</template>
<script>
    import Vue from "vue";
    import { Dialog } from "vant";
    import "vant/lib/index.css";
    Vue.use(Dialog);
    export default {
        data(){
            return{
                name:'',
                chapter:'',
                bookid:''
            }
        },
        methods:{
            lastread(name,chapter,bookid){
                var that = this;
                Dialog.confirm({
                title: '继续阅读',
                message: '您上次阅读到<span style="color:#f00;">《'+ name +'》--'+ chapter +'</span>，是否继续阅读！！'
                }).then(() => {
                    that.$router.push({
                        name: "read",
                        params:{
                            id:bookid
                        }
                    });
                }).catch(() => {

                });
            },
            lastdata(){
                var that = this;
                this.Http.post({
                    action: 1008,
                    showLoading: false,
                    showMessage: false,
                    success: function(data){
                        //console.log(data)
                        if(data){
                            that.name = data[0].book_title;
                            //console.log(that.name)
                            that.chapter = data[0].chapter_name;
                            that.bookid = data[0].chapter_id;
                            that.lastread(data[0].book_title,data[0].chapter_name,data[0].chapter_id)
                        }else{

                        }
                    },
                    error: function(){

                    }
                });
            }
        },
        mounted(){
            this.lastdata();
        }
    }
</script>

