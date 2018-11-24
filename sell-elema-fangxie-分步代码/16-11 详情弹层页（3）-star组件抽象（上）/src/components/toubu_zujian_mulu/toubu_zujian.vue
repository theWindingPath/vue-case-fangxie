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
        <!-- 右下角5个按钮，support-count(count(span)/icon-keyboard_arrow_right(i)) -->
        <div v-if="maijia_shuju.supports" class="support-count" @click="showDetail_hanshu">
          <span class="count">{{maijia_shuju.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail_hanshu">
        <!-- 公告(bulletin-title(span)/bulletin-text/icon(i)) -->
        <span class="bulletin-title"></span><span class="bulletin-text">{{maijia_shuju.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!-- 背景模糊 background -->
      <div class="background">
        <img :src="maijia_shuju.avatar" width="100%" height="100%" >
      </div>
      <div v-show="detailShow_show" class="detail">
        <!-- 弹层页(detail-wrapper(detail-main/clearfix)/detial-close(icon-close(i))) -->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{maijia_shuju.name}}</div>
            <!-- <xingxing></xingxing> -->
            <div class="star-wrapper">
              <xingxing></xingxing>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close"></i>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xingxing_zujian from 'components/xingxing_zujian_mulu/xingxing_zujian';

  // 需要导出其它组件才能引用
  export default{
    props: { // 接收数据
      maijia_shuju: {
        type: Object
      }
    },
    data() {
      return {
        detailShow_show: false
      };
    },
    methods: {
      showDetail_hanshu () {
        this.detailShow_show = true;
      }
    },
    created() {
      this.classMap_shuzu = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; // 和supports.type(01234)对应
    },
    components: {
      xingxing: xingxing_zujian
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../tongyong_mulu/stylus_mulu/mixin.styl"; // 引入mixin.styl文件

  .header
    position relative
    overflow hidden
    color rgb(255,255,255)
    background-color rgba(7,17,27,0.5)
    .content-wrapper
      position relative
      padding  24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
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
      .support-count
        position absolute
        right 12px
        bottom 14px
        height 24px
        padding 0 8px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background-color rgba(7,17,27,0.2)
      // font-size 0
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image-hanshu ('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        top 9px
        font-size 10px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      z-index 100
      top 0
      left 0
      width 100%
      height 100%
      overflow auto
      background-color rgba(7,17,27,0.8)
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 16px
            padding 2px 0
            text-align center
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px

</style>