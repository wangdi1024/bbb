<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a>&gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车
                        </h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>

                        <div id="orderForm" name="orderForm" url>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input v-model="ruleForm.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="area">
                                    <v-distpicker @selected="selectedArea" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile">
                                    <el-input v-model="ruleForm.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" prop="email">
                                    <el-input v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码" prop="post_code">
                                    <el-input v-model="ruleForm.post_code"></el-input>
                                </el-form-item>

                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>&nbsp;&nbsp;
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="ruleForm.express_id" label="1" @change="ruleForm.expressMoment=24">顺丰快递</el-radio>
                                            <em>&nbsp;&nbsp;费用：24.00元</em>
                                            &nbsp;&nbsp;
                                            <el-radio v-model="ruleForm.express_id" label="2" @change="ruleForm.expressMoment=10">韵达快递</el-radio>
                                            <em>&nbsp;&nbsp;费用：10.00元</em>
                                            &nbsp;&nbsp;
                                            <el-radio v-model="ruleForm.express_id" label="3" @change="ruleForm.expressMoment=8">圆通快递</el-radio>
                                            <em>&nbsp;&nbsp;费用：8.00元</em>
                                            &nbsp;&nbsp;
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">￥{{item.sell_price}}</span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">￥{{item.sell_price*item.buycount}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;"
                                                v-model="ruleForm.message"
                                                ></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalcount}}</label>件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label>元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label>元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" class="btn submit" @click="submit('ruleForm')">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VDistpicker from "v-distpicker";
export default {
  name: "order",
  data: function() {
    var validatemobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validateemail = (rule, value, callback) => {
      //  console.log(value)
      // 空值判断
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 用正则判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的邮箱地址！"));
        }
      }
    };
    var validatePostCode = (rule, value, callback) => {
      //  console.log(value)
      // 空值判断
      if (value === "") {
        callback(new Error("请输入邮编"));
      } else {
        // 非空 格式验证
        // 正则表达式的规则
        let reg = /^[1-9]\d{5}(?!\d)$/;
        // 用正则判断对错
        if (reg.test(value) == true) {
          callback();
        } else {
          // 格式不对
          callback(new Error("请输入正确的邮编！"));
        }
      }
    };

    return {
      totalcount: 0,
      totalPrice: 0,
      goodList: [],
      ids: "",
      ruleForm: {
        accept_name: "小明",
        address: "就哈怂大赛",
        mobile: "15876554602",
        email: "88@qq.com",
        post_code: "433113",
    
       
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
         payment_id: "6",
        // 快递编码
        express_id: "1",
        // 运费
        expressMoment: 24,
        // 备注信息
        message: "记得按时发货哦, (づ￣ 3￣)づ"
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入收货人地址", trigger: "change" },
          {
            min: 5,
            max: 100,
            message: "长度在 5 到 100 个字符",
            trigger: "change"
          }
        ],
        mobile: [{ validator: validatemobile, trigger: "change" }],
        email: [{ validator: validateemail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    selectedArea(newArea) {
      // console.log(newArea);
      this.ruleForm.area = newArea;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.ruleForm.goodsAmount = this.totalPrice;
          // 商品id们
          this.ruleForm.goodsids = this.ids;
          let obj = {};
          this.goodList.forEach(v => {
            obj[v.id] = v.buycount;
          });
          this.ruleForm.cargoodsobj = obj;
          this.$axios
            .post("site/validate/order/setorder", this.ruleForm)
            .then(result => {
              console.log(result);
              this.$Message.success("订单提交成功");
              // 跳转路由
              this.$router.push("/payMoney/" + result.data.message.orderid);
              this.goodList.forEach(v=>{
                this.$store.commit('delGoodsById',v.id)
              })
             
            });
        } else {
          this.$Message.warning("数据不完整,请检查");
          return false;
        }
      });
    }
  },
  created() {
    this.ids = this.$route.params.ids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(result => {
        // console.log(result);
        this.goodList = result.data.message;
        result.data.message.forEach(v => {
          v.buycount = this.$store.state.cartData[v.id];
          this.totalcount += v.buycount;
          // 累加总金额
          this.totalPrice += v.buycount * v.sell_price;
        });
      });
  },
  components: { VDistpicker }
};
</script>
<style >
</style>