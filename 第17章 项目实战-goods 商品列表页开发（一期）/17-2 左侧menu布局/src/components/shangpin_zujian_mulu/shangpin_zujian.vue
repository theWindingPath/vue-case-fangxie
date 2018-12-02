<template>
    <!-- <div>i am goods</div> -->
    <!-- 两栏布局 goods(menu-wrapper/foods-wrapper) -->
    <div class="goods">
        <div class="menu-wrapper">
            <!-- ul/li(menu-item)(v-for/span(text/icon)/v-show/classMap)将左侧栏文字显示出来 -->
            <ul>
                <li v-for="shangpin in shangpin_shuju" class="menu-item">
                    <span class="text border-1px-suofang">
                        <span v-show="shangpin.type>0" class="icon" :class="classMap_shuzu[shangpin.type]"></span>{{shangpin.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">foods</div>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  // 接收卖家数据，获取goods数据
  export default {
    props: {
        maijia_shuju: {
            type: Object
        }
    },
    data() {
        return {
            shangpin_shuju: []
        };
    },
    created() {
        this.classMap_shuzu = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        this.$http.get('/api/shangpin').then((response) => {
            response = response.body;
            // console.log(response);
            if (response.cuowu_biaoshi === ERR_OK) {
                this.shangpin_shuju = response.shuju;
                // console.log(this.shangpin_shuju);
            }
        });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../tongyong_mulu/stylus_mulu/mixin.styl";

  .goods
    display flex
    position absolute
    top 174px // 134+40
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        padding 0 12px
        width 56px
        height 54px
        line-height 14px
        .text
          display table-cell
          vertical-align middle
          width 56px
          font-size 12px
          border-1px-fangfa(rgba(7, 17, 27, 0.1))
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 2px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image-hanshu('decrease_3')
            &.discount
              bg-image-hanshu('discount_3')
            &.special
              bg-image-hanshu('special_3')
            &.invoice
              bg-image-hanshu('invoice_3')
            &.guarantee
              bg-image-hanshu('guarantee_3')
    .foods-wrapper
      flex 1
</style>