<template>
  <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64" height="64" :src="maijia_shuju.avatar">
        </div>
        <!-- content(title(brand/name)/description/support(icon/text)) -->
        <div class="content">
          <div class="title">
            <div class="brand"></div>
            <div class="name">{{maijia_shuju.name}}</div>
          </div>
          <div class="description">
            {{maijia_shuju.description}}/{{maijia_shuju.deliveryTime}}分钟送达
          </div>
          <div v-if="maijia_shuju.supports" class="support">
            <div class="icon"></div>
            <div class="text">
              {{maijia_shuju.supports[0].description}}
            </div>
          </div>
        </div>
      </div>
      <div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 需要导出其它组件才能引用
  export default{
    props: { // 接收数据
      maijia_shuju: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    color rgb(255,255,255)
    background #333
    .content-wrapper
      padding  24px 12px 18px 24px
      .avatar
        display inline-block
      .content
        display inline-block

</style>