<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logowrapper">
                  <div class="logo">
                      <i class="icon-shopping_cart"></i>
                  </div>
              </div>
              <div class="price"></div>
              <div class="desc"></div>
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
      height 48px // 116-12-16=96,96/2=48px
      background-color #ccc
</style>