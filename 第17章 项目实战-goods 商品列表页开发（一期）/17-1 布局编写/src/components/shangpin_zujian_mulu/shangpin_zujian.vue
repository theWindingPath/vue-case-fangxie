<template>
    <!-- <div>i am goods</div> -->
    <!-- 两栏布局 goods(menu-wrapper/foods-wrapper) -->
    <div class="goods">
        <div class="menu-wrapper">menu</div>
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
    .foods-wrapper
      flex 1
</style>