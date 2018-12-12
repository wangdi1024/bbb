//引入vue
import Vue from "vue"
// 导入element-ui框架
// import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到Vue上
// Vue.use(ElementUI);
import {InputNumber,
        Switch,
        Button,
        Carousel,
        CarouselItem,
        Pagination,
        Notification,
        Form,
        Radio,
        Input,
        FormItem,
         } from 'element-ui';
  import { Affix , 
        BackTop,
        Page,
        Message
} from 'iview';
// 导入IView框架
// import iView from "iview";
import "iview/dist/styles/iview.css";
// 注册到Vue上
// Vue.use(iView);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(Input);
Vue.prototype.$notify = Notification;
Vue.prototype.$Message =  Message;
Vue.component('Affix', Affix);
Vue.component('BackTop', BackTop);
Vue.component('Page', Page);


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
Vue.prototype.$axios.defaults.baseURL = "http://111.230.232.110:8899/";
// 让axios携带cookie
Vue.prototype.$axios.defaults.withCredentials=true
// 抽取基础地址
// Vue.prototype.$baseUrl = 'http://111.230.232.110:8899/'