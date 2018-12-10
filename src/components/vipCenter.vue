<template>
    <div class="el-row">
        <div class="el-col el-col-24">
            <div class="comp">
                <div class="tmpl routeanimate">
                    <div class="section">
                        <div class="location">
                            <span>当前位置：</span>
                            <a href="/index.html">首页</a> &gt;
                            <a href="/user/center/index.html">会员中心</a>&gt;
                            <a href="/user/center/index.html">{{currentName}}</a>
                        </div>
                    </div>
                    <div class="section clearfix">
                        <div class="left-260">
                            <div class="bg-wrap">
                                <div class="avatar-box">
                                    <a href="/user/center/avatar.html" class="img-box">
                                        <router-link to="/vipCenter/vipindex" class="img-box">
                                            <!-- <i class="iconfont icon-user-full"></i> -->
                                            <img src="../assets/site/css/img/1.jpg" alt="">
                                        </router-link>
                                    </a>
                                    <h3>

                                        ivanyb

                                    </h3>
                                    <p>
                                        <b>注册会员</b>
                                    </p>
                                </div>
                                <div class="center-nav">
                                    <ul>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-order"></i>
                                                <span>订单管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <router-link to="/vipCenter/orderList">
                                                        <i class="iconfont icon-arrow-right"></i>交易订单
                                                    </router-link>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-user"></i>
                                                <span>账户管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <a href="#/site/member/center" class="router-link-exact-active ">
                                                        <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="router-link-exact-active ">
                                                        <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="router-link-exact-active ">
                                                        <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                </p>
                                                <p>
                                                    <a href="javascript:void(0)" @click="logout">
                                                        <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 路由出口 -->
</template>

 
<script>
export default {
  name: "vipCenter",
  data: function() {
    return {
        currentName:"",
    };
  },
  created() {
    //  console.log(this.$route);
     this.currentName=this.$route.meta.currentName
    //  console.log(this.currentName);
  },
  methods: {
    logout() {
      this.$confirm("确定要退出登陆吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          // 调用登出接口即可
          this.$axios.get("site/account/logout").then(result => {
            //   console.log(result);
            if (result.data.status === 0) {
              this.$Message.success(result.data.message);
              // 编程式导航 去首页
              this.$router.push("/index");
              // 修改Vuex中的 登录字段 为false
              this.$store.commit("changeLogin", false);
            }
          });
        })
        .catch(() => {
          return;
        });
    }
  },
  //侦听器
  watch: {
    $route(val,oldvue){
      console.log(val);
      this.currentName=val.meta.currentName
    },
  }
};
</script>

<style>
.bg-wrap > .sub-tit,
.bg-wrap > .avatar-box {
  padding-top: 0;
}
</style>

