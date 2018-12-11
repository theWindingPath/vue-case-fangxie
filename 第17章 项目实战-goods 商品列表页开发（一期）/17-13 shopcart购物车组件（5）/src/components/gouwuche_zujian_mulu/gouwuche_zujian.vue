<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logowrapper">
                  <!-- 数量count大于0，高亮显示 -->
                  <div class="logo" :class="{highLight:zonggeshu_computed>0}">
                      <i class="icon-shopping_cart" :class="{highLight:zonggeshu_computed>0}"></i>
                  </div>
                  <div class="num" v-show="zonggeshu_computed>0">{{zonggeshu_computed}}</div>
              </div>
              <div class="price" :class="{highLight:jiage_zongshu_computed>0}">￥{{jiage_zongshu_computed}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <div class="pay">
                  ￥{{minPrice}}起送
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          xuanzhe_shangpin_props: { // 维护选择商品数组，来获得商品数量
              type: Array, // 数组
              default() {
                  return [
                      {
                          danjia_shuxing: 12, // 单价
                          shuliang_shuxing: 1 // 数量
                      },
                      {
                          danjia_shuxing: 10,
                          shuliang_shuxing: 0
                      }
                  ];
              }
          },
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
          }
      },
      computed: {
          jiage_zongshu_computed() { // 计算价格总数的函数
              let zongjiage_bianliang = 0;
              this.xuanzhe_shangpin_props.forEach((shangpin_xingcan) => { // 遍历数组xuanzhe_shangpin，获得所有元素里的price和count
                zongjiage_bianliang += shangpin_xingcan.danjia_shuxing * shangpin_xingcan.shuliang_shuxing; // 累加单价*数量，获得总价
              });
              return zongjiage_bianliang;
          },
          zonggeshu_computed() { // 选择的总个数
            let zonggeshu_bianliang = 0;
            this.xuanzhe_shangpin_props.forEach((shangpin_xingcan) => { // 获得每个food对象
              zonggeshu_bianliang += shangpin_xingcan.shuliang_shuxing; // 累加每个选中的数量count
            });
            return zonggeshu_bianliang;
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
      position fixed
      left 0
      bottom 0
      z-index 50
      width 100%
      height 48px // 48+24*2=96,96/2=48
      background-color #ccc
      .content
          display flex
          font-size 0
          background-color #141d27
          color #80858a
          .content-left
              flex 1
              .logowrapper
                  display inline-block
                  vertical-align top
                  position relative
                  top -10px
                  margin 0 12px
                  padding 6px
                  width 56px
                  height 56px
                  box-sizing border-box
                  border-radius 50%
                  background-color #141d27
                  // font-size 24px
                  .logo
                    width 100%
                    height 100%
                    text-align center
                    border-radius 50%
                    background-color #2b343c
                    &.highLight
                      background-color rgb(0, 160, 220)
                    .icon-shopping_cart
                      line-height 44px
                      font-size 24px
                      &.highLight
                        color #fff
                  .num
                    position absolute
                    top 0
                    right 0
                    width 24px
                    height 16px
                    line-height 16px
                    text-align center
                    border-radius 16px
                    font-size 9px
                    font-weight 700
                    color #fff
                    background-color rgb(240, 20, 20)
                    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
              .price
                  display inline-block
                  vertical-align top
                  margin-top 12px
                  padding-right 12px
                  box-sizing border-box
                  border-right 1px solid rgba(255, 255, 255, 0.1)
                  line-height 24px
                  font-size 16px
                  font-weight 700
                  &.highLight
                    color #fff
              .desc
                  display inline-block
                  vertical-align top
                  margin 12px 12px 0 12px
                  line-height 24px
                  font-size 10px
          .content-right
              flex 0 0 105px
              width 105px
              .pay
                height 48px
                line-height 48px
                text-align center
                font-size 12px
                font-weight 700
                background-color #2b333b
                
</style>