<template>
  <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64" height="64" :src="maijia_shuju.avatar">
        </div>
        <!-- content(title(brand/name)/description/support(icon/text)) -->
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{maijia_shuju.name}}</span>
          </div>
          <div class="description">
            {{maijia_shuju.description}} / {{maijia_shuju.deliveryTime}}分钟送达
          </div>
          <div v-if="maijia_shuju.supports" class="support">
            <!-- 动态绑定class -->
            <span class="icon" :class="classMap_shuzu[maijia_shuju.supports[0].type]"></span>
            <span class="text">{{maijia_shuju.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 需要导出其它组件才能引用
  export default{
    props: { // 接收数据
      maijia_shuju: {
        type: Object
      }
    },
    created() {
      this.classMap_shuzu = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 和supports.type(01234)对应
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../tongyong_mulu/stylus_mulu/mixin.styl"; // 引入mixin.styl文件

  .header
    color rgb(255,255,255)
    background #333
    .content-wrapper
      padding  24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
      .content
        display inline-block
        margin-left  16px
        font-size 14px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            // background-image url(brand@2x.png)
            bg-image-hanshu('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            line-height 18px
            font-size 16px
            font-weight bold
            margin-left 6px
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            // bg-image-hanshu('decrease_1')
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image-hanshu('decrease_1')
            &.discount
              bg-image-hanshu('discount_1')
            &.guarantee
              bg-image-hanshu('guarantee_1')
            &.invoice
              bg-image-hanshu('invoice_1')
            &.special
              bg-image-hanshu('special_1')
          .text
            line-height 12px
            font-size 10px
            vertical-align top

</style>