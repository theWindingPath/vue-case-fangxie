<template>
  <div class="cart-control">
      <!-- v-show控制减号-显示隐藏，根据food.count -->
      <!-- 点击减号，减1 -->
      <div class="kongjian-jianshao" v-show="food_meige.shuliangGoumai>0" @click="jianshao_method($event)">
          <span class="icon-remove_circle_outline"></span>
      </div>
      <div class="kongjian-shuliang" v-show="food_meige.shuliangGoumai>0">{{food_meige.shuliangGoumai}}</div>
      <!-- 绑定点击事件，点击一次count加1，手动添加count -->
      <div class="kongjian-zengjia" @click="zengjia_shuliang_method($event)">
          <span class="icon-add_circle"></span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'; // 引入Vue,使用Vue.set(target, key , value)

  export default{
      props: {
          food_meige: {
              type: Object
          }
      },
      methods: {
          zengjia_shuliang_method(event) { // 点击加号，增加购买数量
                // 阻止浏览器派发的点击事件
                if (!event._constructed) {
                    return;
                }
                // console.log('click');
                // this.food_meige.shuliangGoumai++;
                // console.log(this.food_meige); // 没有shuliang_goumai属性
                // console.log(this.food_meige.shuliangGoumai); // NaN（第一次点击）
                // 使用vue提供的set()为响应式对象添加一个属性，为food添加count属性，并初始化赋值
                // Vue.set(this.food_meige, 'shuliangGoumai', 1);
                // 增加判断
                if (!this.food_meige.shuliangGoumai) { // 如果count为undefined
                   Vue.set(this.food_meige, 'shuliangGoumai', 1); // 为响应式对象添加属性
                } else { // 已经存在
                    this.food_meige.shuliangGoumai++; // 点击加1
                }
                // console.log(this.food_meige.shuliangGoumai);
          },
          jianshao_method(event) { // 点击减号，每次减一，直到0
                // 阻止浏览器派发的点击事件
                if (!event._constructed) {
                    return;
                }
                if (this.food_meige.shuliangGoumai) { // count>0，购买数量有才可以减
                    this.food_meige.shuliangGoumai--; // 每次减1
                }
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size 0
    .kongjian-jianshao
        display inline-block
        padding 6px
        line-height 24px
        color rgb(0, 160, 220)
        font-size 24px
    .kongjian-shuliang
        display inline-block
        vertical-align top
        margin-top 6px
        line-height 24px
        width 12px
        text-align center
        font-size 10px
        color rgb(147, 153, 159)
    .kongjian-zengjia
        display inline-block
        padding 6px
        line-height 24px
        color rgb(0, 160, 220)
        font-size 24px

</style>