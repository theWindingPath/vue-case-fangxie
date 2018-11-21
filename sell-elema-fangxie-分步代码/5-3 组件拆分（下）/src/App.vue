<template>
  <div id="app">
    <!-- <div class="header">
      i am header 哈哈哈
    </div> -->
    <!-- 使用vue-header组件来代替 上面div -->
    <vue-header></vue-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评价</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      i am content 哈哈哈
    </div>
  </div>
</template>

<script>
  // 引入header组件
  import header from './components/toubu_zujian_mulu/toubu_zujian.vue';
  export default {
    components: {
      'vue-header': header // 注册组件
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display: flex;
      width 100%
      height 40px
      line-height 40px
      .tab-item
        flex 1
        text-align center

</style>
