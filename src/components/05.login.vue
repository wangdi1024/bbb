<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input
                id="txtUserName"
                name="txtUserName"
                type="text"
                placeholder="用户名/手机/邮箱"
                maxlength="50"
                v-model.trim="user_name"
              >
            </div>
            <div class="input-box">
              <input
                id="txtPassword"
                name="txtPassword"
                type="password"
                placeholder="输入登录密码"
                maxlength="16"
                v-model.trim="user_password"
              >
            </div>
            <div class="btn-box">
              <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click="login">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        name:'login',
        data:function(){
            return {
                user_name:'',
                user_password:''
            }
        },
        methods:{
            login(){
                if(this.user_name==''||this.user_password==""){
                    this.$Message.warning('请输入账号名和密码')
                }else{
                    this.$axios.post('site/account/login',{
                        user_name:this.user_name,
                        password:this.user_password
                    })
                    .then(result=>{
                        // console.log(result);
                        if(status==1){
                            // 登录失败
                             this.$Message.warning(result.data.message)
                        }else{
                             this.$Message.warning(result.data.message)
                             this.$router.go(-1)
                            this.$store.commit('changeLogin',true);
                        }
                    })
                }
               
            }
        }
    }
</script>
<style>
</style>