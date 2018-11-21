<template>
  <div>
    <vue-header></vue-header>
    <div class="tab">
      <div class="tab-item">
        <!-- 使用路由组件来导航 v-link -->
        <a v-link="{path:'/shangpin_luyou'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/pingjia_luyou'}">评价</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/shangjia_luyou'}">商家</a>
      </div>
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
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
    .tab
      display: flex;
      width 100%
      height 40px
      line-height 40px
      .tab-item
        flex 1
        text-align center
        & > a
          display block
          font-size 14px
          color rgb(77,85,93)
          // &.v-link-active
          //   color rgb(240,20,20)
          &.active_luyou
            color rgb(240,20,20)
</style>
