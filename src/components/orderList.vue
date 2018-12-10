<template>
    <div class="right-auto">
        <div class="bg-wrap" style="min-height: 765px;">
            <div class="sub-tit">
                <ul>
                    <li class="selected">
                        <a href="/user/order-list.html">交易订单</a>
                    </li>
                </ul>
            </div>
            <div class="table-wrap">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                    <tbody>
                        <tr>
                            <th width="16%" align="left">订单号</th>
                            <th width="10%">姓名</th>
                            <th width="12%">订单金额</th>
                            <th width="11%">下单时间</th>
                            <th width="10%">状态</th>
                            <th width="12%">操作</th>
                        </tr>
                        <tr v-for="(item, index) in goodsList" :key="item.id">
                            <td>{{item.order_no}}</td>
                            <td align="left">{{item.accept_name}}</td>
                            <td align="left">
                                <strong style="color: red;">￥{{item.payable_amount}}</strong>
                                <br> {{item.paymentTitle}}
                            </td>
                            <td align="left">{{item.add_time}}</td>
                            <td align="left">
                                {{item.statusName}}
                            </td>
                            <td align="left">
                                <router-link :to="'/vipCenter/orderDetil/'+item.id">查看订单</router-link>
                                <br>
                                <router-link v-show="item.status==1" :to="'/payMoney/'+item.id">
                                    |去付款
                                </router-link>
                                <br>
                                <a href="javascript:void(0)" v-if="item.statusName=='待付款'">|取消</a>
                                <br>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page-foot">
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="400">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "orderList",
  data: function() {
    return {
      goodsList: [],
      //   当前页
      currentPage4: 1,
      // 页容量
      pagesize: 10,
      // 总条数
      totalcount: 0,
      interid: 0,
      orderid: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.initdata();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.initdata();
    },
    initdata() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${
            this.currentPage4
          }&pageSize=${this.pagesize}`
        )
        .then(result => {
          // console.log(relust);
          this.goodsList = result.data.message;
          this.totalcount = result.data.totalcount;
          this.orderid = this.$route.params.orderid;
        });
    }
  },
  created() {
    this.initdata();
  }
};
</script>

<style>
td:nth-child(2) {
  display: block;
}
.page-foot {
  text-align: center;
}
</style>
