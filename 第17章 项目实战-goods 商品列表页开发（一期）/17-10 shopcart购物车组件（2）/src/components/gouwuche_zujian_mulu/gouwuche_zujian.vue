<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logowrapper">
                  <div class="logo">
                      <i class="icon-shopping_cart"></i>
                  </div>
              </div>
              <div class="price">￥0</div>
              <div class="desc">desc</div>
          </div>
          <div class="content-right">content-right</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
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
                    .icon-shopping_cart
                      line-height 44px
                      font-size 24px
                      color #80858a
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
                  color #80858a
              .desc
                  display inline-block
                  vertical-align top
                  margin 12px 12px 0 12px
                  line-height 24px
                  font-size 12px
                  color #80858a
          .content-right
              flex 0 0 105px
              width 105px
</style>