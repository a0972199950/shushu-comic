<template>
  <div id="switching">
    <img class="title" src="/src/assets/Img/tingxiang.png" alt="">
    <form class="s-form">
      <ul class="s-list">
        <li class="s-item">
          <div class="s-item-l">
            <i class="fa fa-user-circle"></i>
          </div>
          <div class="s-item-r">
            <p> 用户</p>
            <input type="text" placeholder="请输入手机号码">
          </div>
        </li>
        <li class="s-item">
          <div class="s-item-l">
            <i class="fa fa-unlock-alt faa"></i>
          </div>
          <div class="s-item-r">
            <p> 密码</p>
            <input type="text" placeholder="请输入密码">
          </div>
        </li>
      </ul>
    </form>
    <div class="login">登录</div>
  </div>
</template>
<style lang="scss" scoped>
  #switching{
    padding:2rem 1.4rem;
    .title{
      display: block;
      height: 2rem;
      margin: 0 auto;
    }
    .s-form{
      .s-list{
        padding-top: 2rem;
        .s-item{
          display: flex;
          align-items: center;
          .s-item-l{
            width: 3.4rem;
            text-align: center;
            i{
              font-size: 1rem;
              color:#f56336;
            }
            .faa{
              font-size: 1.2rem;
            }
          }
          .s-item-r{
            width: 98%;
            display: block;
            position: relative;
            border-bottom: 1px solid #f5f5f5!important;
            padding-left: 2%;
            padding: .4rem 0 0;
            font-size: 16px;
            p{
              color: #f44336;
              font-size: 14px;
              line-height: 2rem;
            }
            input{
              width: 100%;
              height: 2.2rem;
            }
          }
        }
      }
    }
    .login{
      margin-top: 3rem;
      display: block;
      width: 100%;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      text-align: center;
      background-color: #f44336;
      color: #fff;
    }
  }
</style>

