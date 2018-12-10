<template>
  <div>
    <!-- 将卖家数据传过去 -->
    <vue-header :maijia_shuju="maijia_shuju"></vue-header>
    <div class="tab border-1px-suofang">
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
    <router-view :maijia_shuju="maijia_shuju"></router-view>
  </div>
</template>

<script>
  // 引入header组件
  import header from './components/toubu_zujian_mulu/toubu_zujian.vue';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        maijia_shuju: {} // vue会为maijia_shuju自动添加 set/get方法
      };
    },
    created() {
      // 通过vue-resource发送ajax请求，获取json数据
      this.$http.get('/api/maijia').then(response => {
        // get body data
        response = response.body;
        // console.log(response);
        // 判断标识符=0，将获取到数据放到this.seller上
        if (response.cuowu_biaoshi === ERR_OK) {
          this.maijia_shuju = response.shuju;
          // console.log(this.maijia_shuju);
        }
      });
    },
    components: {
      'vue-header': header // 注册组件
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'tongyong_mulu/stylus_mulu/mixin';
    .tab
      display: flex;
      width 100%
      height 40px
      line-height 40px
      // border-bottom 1px solid rgba(7,17,27,0.2)
      border-1px-fangfa(rgba(7,17,27,0.2))
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
