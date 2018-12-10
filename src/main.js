import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 导入element-ui框架
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到Vue上
Vue.use(ElementUI);

// 导入IView框架
import iView from "iview";
import "iview/dist/styles/iview.css";
// 注册到Vue上
Vue.use(iView);

// 放大镜组件
import ProductZoomer from "vue-product-zoomer";
Vue.use(ProductZoomer);

// 导入 axios
// 类似于 vue-resource this.$http
import axios from "axios";
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;
// 使用axios的方式设置基础地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
// 让axios携带cookie
axios.defaults.withCredentials=true
// 抽取基础地址
// Vue.prototype.$baseUrl = 'http://111.230.232.110:8899/'

// 导入 路由
import VueRouter from "vue-router";
// 如果实在模块化的开发环境下
Vue.use(VueRouter);
// 导入 全局的样式
import "./assets/site/css/style.css";

// 导入每一个页面的 组件
import index from "./components/index.vue";
import detail from "./components/02.detail.vue";
import shopCart from "./components/03.shopCart.vue";
import order from "./components/04.order.vue";
import login  from './components/05.login.vue';
import payMoney from './components/payMoney.vue';
import paysuccess from './components/paysuccess.vue';
import vipCenter from './components/vipCenter.vue';
import orderList from './components/orderList.vue';
import orderDetil from './components/orderDetil.vue';
import vipindex from './components/vipindex.vue';
// 写路由规则
let routes = [
  {
    path: "/",
    // 重定向到 首页/index
    redirect: "/index"
  },
  {
    path: "/index",
    component: index,
    meta:{
      isLogin:false
    }
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
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
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

// 注册全局过滤器 方便使用
// 导入 moment
import moment from "moment";
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  // console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY🚲MM🚲DD🚲");
});
Vue.filter("shortTimePlus", value => {
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});

// Vuex的使用
import Vuex from "vuex";
Vue.use(Vuex);

// let data = JSON.parse(window.localStorage.getItem('hm24'));
// if(!data){
//   data = {
//     90:6,
//     84:7
//   }
// }
// 实例化仓库对象
const store = new Vuex.Store({
  // 状态
  state: {
    // count: 0
    // 购物车数据对象
    // 短路运算 || 如果没有数据 左边的值是 false 去获取 || 右边的值
    cartData: JSON.parse(window.localStorage.getItem("hm24")) || {},
    // cartData:data
    isLogin:false
  },
  // Vuex的计算属性
  getters: {
    totalCount(state) {
      // console.log(state);
      // 通过state 获取 内部的数据
      // 计算并返回
      // return 998;
      let num = 0;
      for (const key in state.cartData) {
        // 循环累加
        num += state.cartData[key];
      }
      return num;
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // state就是 上面的 数据 state
    // 测试用方法
    // increment (state,obj) {
    //   console.log('触发了')
    //   console.log(state);
    //   console.log(obj);
    //   // state.count+=n
    //   // state.count+=m;
    // }
    // 往购物车添加数据的方法 2->two
    // 约定 对象的属性名  goodId(商品id)  goodNum(商品个数)
    add2Cart(state, obj) {
      // console.log(obj);
      // 商品已经存在{goodId:90,goodNum:6}
      if (state.cartData[obj.goodId] != undefined) {
        // 累加即可 state.carData.goodId +=10
        // state.cartData[obj.goodId]+=obj.goodNum;

        // 上面代码的 扩写
        let oldNum = state.cartData[obj.goodId];
        oldNum += obj.goodNum;
        state.cartData[obj.goodId] = oldNum;
      } else {
        // 商品不存在
        // 动态增加键值对
        // state.cartData[obj.goodId] = obj.goodNum;
        // 如果是动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 添加的属性名 参数3 属性的值
        Vue.set(state.cartData, obj.goodId, obj.goodNum);
      }
      // 打印内容
      // console.log(state);
    },
    // 增加一个修改数据的方法
    updateCartData(state, obj) {
      // console.log(obj);
      // 接收到数据直接赋值 因为 在03.shopCart.vue中 已经把数据处理好了
      state.cartData = obj;
    },
    // 删除某一条数据的方法
    // 已经被 watch中的代码 实现  只是为了 演示 Vue.delete这个方法
    delGoodsById(state, id) {
      // console.log(id);
      // 根据id 删除state中的数据
      // delete state.cartData[id];
      // delete 删除的属性 Vue无法跟踪
      // 参数1 对象 参数2 删除的属性
      // 必须使用Vue.delete才可以同步更新视图
      Vue.delete(state.cartData, id);
    },
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  }
});

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
    axios.get("site/account/islogin").then(result => {
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
