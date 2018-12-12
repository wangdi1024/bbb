import Vue from "vue";
import App from "./App.vue";
import router from "./lib/router"
import store from "./lib/vuex"
import "./lib/fitters"
Vue.config.productionTip = false;
// 导入插件
import  "./lib/chajian"



// 导入 全局的样式
import "./assets/site/css/style.css";










// 浏览器关闭保存数据
window.onbeforeunload = function() {
  window.localStorage.setItem("hm24", JSON.stringify(store.state.cartData));
};
// 实例化Vue
new Vue({
  render: h => h(App),
  // 传入路由对象
  router,
  // 需要把store传递给 Vue实例 这样在子组件中才可以使用$store
  store,
  created() {
    Vue.prototype.$axios.get("site/account/islogin").then(result => {
      //   console.log(result);
      if (result.data.code == "nologin") {
        // 提示用户
        Vue.prototype.$Message.warning("请先登录");
        // 跳转页面(路由)
        router.push("/login");
      }else{
        store.state.isLogin = true;
      }
    });
  },
}).$mount("#app");
