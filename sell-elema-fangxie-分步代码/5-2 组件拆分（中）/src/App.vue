<template>
  <div id="app">
    <!-- <div class="header">
      i am header 哈哈哈
    </div> -->
    <!-- 使用vue-header组件来代替 上面div -->
    <vue-header></vue-header>
    <div class="tab">
      i am tab 哈哈哈
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

<style>
</style>
