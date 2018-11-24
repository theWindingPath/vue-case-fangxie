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
        let class_shuzu = ['on', 'on', 'half', 'off', 'off'];
        return class_shuzu;
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