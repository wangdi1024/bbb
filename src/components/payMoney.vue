<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row" v-for="(item, index) in orderlist" :key="item.id">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{item.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{item.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{item.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{item.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{item.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{item.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <qrcode :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+orderid " :options="{ size: 200 }"></qrcode>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 局部注册二维码组件
import VueQrcode from "@xkeshi/vue-qrcode";
export default {
  name: "payMoney",
  data: function() {
    return {
      // 订单ID
      orderid: "",
      // 订单
      orderlist: [],
      interid:0
    };
  },

  components: {
    //   js中对象的属性名 不能使用js语法编写 (早期的时候)
    // es6中支持动态生成属性名
    [VueQrcode.name]: VueQrcode
  },
  created() {
    this.orderid = this.$route.params.orderid;
    //    console.log(this.orderid);
    this.$axios
      .get(`site/validate/order/getorder/${this.orderid}`)
      .then(result => {
        console.log(result);
        this.orderlist = result.data.message;
      });
 this.interid=setInterval(()=> {
        //设置一个定时器 ,每2秒钟询问一次是否支付成功
      this.$axios
        .get(`site/validate/order/getorder/${this.orderid}`)
        .then(result => {
            //如果已经支付成功,就跳转到支付成功页面
            if(result.data.message[0].status==2){
                this.$Message.success('恭喜你,已经支付成功了')
                this.$router.push('/paysuccess')
                
            }
        });
    }, 2000);
  },
  //生命周期函数,在结束的时候调用
  destroyed(){
      clearInterval(this.interid)
  }
};
</script>
<style>
</style>
