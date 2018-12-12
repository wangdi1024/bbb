
// 导入 路由
import VueRouter from "vue-router";
import Vue from "vue";
import axios from "axios";

// 如果实在模块化的开发环境下
Vue.use(VueRouter);
// 导入每一个页面的 组件
import index from "../components/index.vue";
import detail from "../components/02.detail.vue";
import shopCart from "../components/03.shopCart.vue";
import order from "../components/04.order.vue";
import login  from '../components/05.login.vue';
import payMoney from '../components/payMoney.vue';
import paysuccess from '../components/paysuccess.vue';
import vipCenter from '../components/vipCenter.vue';
import orderList from '../components/orderList.vue';
import orderDetil from '../components/orderDetil.vue';
import vipindex from '../components/vipindex.vue';
//写路由规则
let routes = [
    {
      path: "/",
      // 重定向到 首页/index
      redirect: "/index"
    },
    {
      path: "/index",
      component: index,
      // meta:{
      //   isLogin:false
      // }
    },
    // 使用动态路由匹配 传递参数
    {
      path: "/detail/:artID",
      component: detail
    },
    // 购物车的跳转 不需要带数据
    {
      path: "/shopCart",
      component: shopCart
    },
    // 去订单确认页面
    {
      path: "/order/:ids",
      component: order
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/payMoney/:orderid",
      component: payMoney,
      meta:{
        checkLogin:true
      }
    },
    {
      path: "/paysuccess",
      component: paysuccess,
      //这里的字段可以随便添加 在meta.xxx就可以获取到
      meta:{
        checkLogin:true
      }
    },
    {
      path: "/vipCenter",
      component: vipCenter,
      //这里的字段可以随便添加 在meta.xxx就可以获取到
      meta:{
        checkLogin:true,
      },
      children:[
        {
          path: "",
          // 重定向到 首页/index
          redirect: "vipindex",
        },
        {
          // 当 /vipCenter/profile 匹配成功，
           // UserProfile 会被渲染在 User 的 <router-view> 中
           path: 'vipindex',
           component:vipindex,
           meta:{
             checkLogin:true,
              currentName:'中心首页',
           }
          },
        {
          // 当 /vipCenter/profile 匹配成功，
           // UserProfile 会被渲染在 User 的 <router-view> 中
           path: 'orderList',
           component:orderList,
           meta:{
             checkLogin:true,
             currentName:'订单中心',
           }
       }, 
       {
        // 当 /vipCenter/profile 匹配成功，
         // UserProfile 会被渲染在 User 的 <router-view> 中
         path: 'orderDetil/:detailId',
         component:orderDetil,
         meta:{
           checkLogin:true,
           currentName:'订单详情',
         }
     }, 
      ],
  
    },
  
  ];

  // 实例化路由对象
let router = new VueRouter({
    routes,
    scrollBehavior () {
      return {x:0,y:0}
    }
  });
// 增加导航守卫 回调函数(每次路由改变的时候 触发)
router.beforeEach((to, from, next) => {
    // console.log("守卫啦!!!!");
    // console.log(to);
    // console.log(from);
    // 导航守卫的判断条件 如果去meta.checkLogin等于true 就要先登陆
    if (to.meta.checkLogin==true) {
      // 正要去订单页
      // 必须先判断登录
      axios.get("site/account/islogin").then(result => {
        //   console.log(result);
        if (result.data.code == "nologin") {
          // 提示用户
          Vue.prototype.$Message.warning("请先登录");
          // 跳转页面(路由)
          router.push("/login");
        }else{
          next();
        }
      });
    } else {
      // next 如果不执行 就不会路由跳转
      next();
    }
  })
  //全局后置钩子 页面完成后出现的守卫
// router.afterEach((to, from) => {
//   window.scroll(0,0)//将滚动条设置为0 的一个方法
// })

  //全局后置钩子 页面完成后出现的守卫
  // router.afterEach((to, from) => {
  //   window.scroll(0,0)//将滚动条设置为0 的一个方法
  // })
  //把router暴露出去,可以放到vue的实例对象里面
  export default router;