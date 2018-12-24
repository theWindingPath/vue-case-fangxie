<template>
  <!-- 星星组件 star(star-item(on/half/off)/star-48/36/24) -->
  <!-- <div class="star star-48">
      <span class="star-item on"></span>
      <span class="star-item on"></span>
      <span class="star-item half"></span>
      <span class="star-item off"></span>
      <span class="star-item off"></span>
  </div> -->

  <!-- 动态添加class (size/score) -->
  <div class="star" :class="starType_hanshu">
    <span v-for="class_tianjia in class_hanshu_shuzu" :class="class_tianjia" class="star-item" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  // 定义常量
  const zonggeshu_changliang = 5;
  const quanxing_class = 'on';
  const banxing_class = 'half';
  const wuxing_class = 'off';

  export default {
    props: {
      daxiao_tupian: {
          type: Number
      },
      pingfen_xingxing: {
          type: Number
      }
    },
    computed: {
      starType_hanshu () {
        return 'star-' + this.daxiao_tupian;
      },
      class_hanshu_shuzu () {
        // let class_shuzu = ['on', 'on', 'half', 'off', 'off'];
        // return class_shuzu;

        // 根据score 动态返回数组
        let class_shuzu = [];
        // 0.5倍数取整，4.6取4.5, 4.4取4.0
        let pingfen_quzheng = Math.floor(this.pingfen_xingxing * 2) / 2;
        // 整数部分 4.5为4
        let zhengshu_bufen = Math.floor(pingfen_quzheng);
        // 根据整数部分，添加全星
        for (let i = 0; i < zhengshu_bufen; i++) {
          class_shuzu.push(quanxing_class);
        }
        // 小数部分（有或没有）%1 是否为0，不为0则有小数，如4.5%1=0.5,0.5不等于0，为true
        let xiaoshu_you = (pingfen_quzheng % 1) !== 0;
        // 根据是否有0.5，添加半星
        if (xiaoshu_you) {
          class_shuzu.push(banxing_class);
        }
        // 根据当前数组的长度，添加剩下的无颜色星星
        while (class_shuzu.length < zonggeshu_changliang) {
          class_shuzu.push(wuxing_class);
        }

        return class_shuzu; // 返回数组
      }
     }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../tongyong_mulu/stylus_mulu/mixin.styl"; // 引入mixin.styl文件

  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px  // 372/2=186,186-20*5=86,86/4=21.5
        background-size 20px 20px
        &.last-child
          margin-right 0
        &.on
          bg-image-hanshu ('star48_on')
        &.half
          bg-image-hanshu ('star48_half')
        &.off
          bg-image-hanshu ('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &.last-child
          margin-right 0
        &.on
          bg-image-hanshu ('star36_on')
        &.half
          bg-image-hanshu ('star36_half')
        &.off
          bg-image-hanshu ('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &.last-child
          margin-right 0
        &.on
          bg-image-hanshu ('star24_on')
        &.half
          bg-image-hanshu ('star24_half')
        &.off
          bg-image-hanshu ('star24_off')
               

</style>