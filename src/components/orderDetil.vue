<template>
    <div class="right-auto">
        <div class="bg-wrap" style="min-height: 765px;">
            <div class="sub-tit">
                <a href="javascript:void(0)" class="add" @click="$router.go(-1)">
                    <i class="iconfont icon-reply"></i>返回</a>
                <ul>
                    <li class="selected">
                        <a href="javascript:;">查看订单</a>
                    </li>
                </ul>
            </div>
            <div class="order-progress">
                <ul>
                    <li class="first" :class="{active:orderinfo.status>=1}">
                        <div class="progress">下单</div>
                        <div class="info">{{orderinfo.add_time | shortTimePlus}}</div>
                    </li>
                    <li class="" :class="{active:orderinfo.status>=2}">
                        <div class="progress">已付款</div>
                        <div class="info">{{orderinfo.confirm_time | shortTimePlus}}</div>
                    </li>
                    <li class="" :class="{active:orderinfo.status>=2}">
                        <div class="progress">已经发货</div>
                        <div class="info">{{orderinfo.payment_time | shortTimePlus}}</div>
                    </li>
                    <li class="last" :class="{active:orderinfo.status>=4}">
                        <div class="progress">已完成</div>
                        <div class="info">{{orderinfo.payment_time | shortTimePlus}}</div>
                    </li>
                </ul>
            </div>
            <div class="form-box accept-box form-box1">
                <dl class="head form-group">
                    <dd>
                        {{orderinfo.order_no}}

                        <router-link :to="'/payMoney/'+orderinfo.id" class="btn-pay" v-show='orderinfo.status==1'>去付款</router-link>
                        <a v-show="orderinfo.status==2||orderinfo.status==3" class="btn-pay" @click="receiveGoods">
                            确认收货
                        </a>
                        <a v-show="orderinfo.status==4" class="btn-pay">
                            待评价
                        </a>
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt>订单状态：</dt>
                    <dd>
                        {{orderinfo.statusName}}
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt>快递单号：</dt>
                    <dd>
                        {{orderinfo.expressTitle}}43223545346356547
                    </dd>
                </dl>
                <dl class="form-group">
                    <dt>支付方式：</dt>
                    <dd>{{orderinfo.paymentTitle}}</dd>
                </dl>
            </div>
            <div class="table-wrap">
                <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                    <tbody>
                        <tr>
                            <th align="left">商品信息</th>
                            <th width="60%">名称</th>
                            <th width="10%">单价
                            </th>
                            <th width="10%">数量</th>
                            <th width="10%">金额</th>
                        </tr>
                        <tr v-for="(item, index) in goodslist" :key="item.id">
                            <td width="60">
                                <img :src="item.imgurl" class="img">
                            </td>
                            <td align="left">
                                <router-link :to="'/detail/'+item.goods_id">{{item.goods_title}}</router-link>
                            </td>
                            <td align="center">
                                <s>￥{{item.real_price}}</s>
                                <p>￥{{item.real_price}}</p>
                            </td>
                            <td align="center">{{item.quantity}}</td>
                            <td align="center">￥{{item.real_price*item.quantity}}</td>
                        </tr>
                        <tr>
                            <td colspan="7" align="right">
                                <p>商品金额：
                                    <b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                    <b class="red">￥{{orderinfo.express_fee}}</b>
                                </p>
                                <p style="font-size: 22px;">应付总金额：
                                    <b class="red">￥{{orderinfo.order_amount}}</b>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="form-box accept-box">
                <dl class="head form-group">
                    <dd>收货信息</dd>
                </dl>
                <dl class="form-group">
                    <dt>顾客姓名：</dt>
                    <dd>{{orderinfo.accept_name}}}</dd>
                </dl>
                <dl class="form-group">
                    <dt>送货地址：</dt>
                    <dd>{{orderinfo.area+orderinfo.address}}</dd>
                </dl>
                <dl class="form-group">
                    <dt>联系电话：</dt>
                    <dd>{{orderinfo.mobile}} </dd>
                </dl>
                <dl class="form-group">
                    <dt>电子邮箱：{{orderinfo.email}}</dt>
                    <dd> </dd>
                </dl>
                <dl class="form-group">
                    <dt>备注留言：{{orderinfo.message}}</dt>
                    <dd></dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "detil",
  data: function() {
    return {
      //订单id
      detailId: "",
      //联系人信息
      orderinfo: [],
      // 商品信息
      goodslist: []
    };
  },
  methods: {
    //确认收货
    receiveGoods() {
      this.$confirm("是否确定收到货?", "提示", {
        confirmButtonText: "收到",
        cancelButtonText: "未收到",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$axios
            .get(`site/validate/order/complate/+${this.detailId}`)
            .then(result => {
              // console.log(result);
              this.$message.success(result.data.message);
              //确认收货成功后重新调用产品详情接口
              this. getgoodslist()
            });
        })
        .catch(() => {
          return;
        });
    },
    //产品详情接口
    getgoodslist() {
      //  this.$route.params.detailId  可以获取url里面的id
      this.detailId = this.$route.params.detailId;
      this.$axios
        .get(`site/validate/order/getorderdetial/+${this.detailId}`)
        .then(result => {
          console.log(result);
          this.orderinfo = result.data.message.orderinfo;
          this.goodslist = result.data.message.goodslist;
        });
    }
  },
  created() {
      this.getgoodslist()
  }
};
</script>

<style>
</style>
