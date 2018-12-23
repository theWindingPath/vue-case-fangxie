<template>
  <div class="cart-control">
      <div class="kongjian-jianshao">
          <span class="icon-remove_circle_outline"></span>
      </div>
      <div class="kongjian-shuliang">1</div>
      <div class="kongjian-zengjia">
          <span class="icon-add_circle"></span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
      props: {
          food_meige: {
              type: Object
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