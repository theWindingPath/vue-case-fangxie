<template>
    <!-- <div>i am goods</div> -->
    <!-- 两栏布局 goods(menu-wrapper/foods-wrapper) -->
    <div class="goods">
        <!-- v-el获取dom节点 -->
        <div class="menu-wrapper" v-el:menu-dom>
            <!-- ul/li(menu-item)(v-for/span(text/icon)/v-show/classMap)将左侧栏文字显示出来 -->
            <ul>
                <li v-for="shangpin in shangpin_shuju" class="menu-item">
                    <span class="text border-1px-suofang">
                        <span v-show="shangpin.type>0" class="icon" :class="classMap_shuzu[shangpin.type]"></span>{{shangpin.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" v-el:foods-dom>
            <!-- 右侧列表ul/li(food-list)/h1/title/(ul/li(food-item(icon(img)/content(h2/name/desc(p))extra(span/span)price))) -->
            <ul>
                <li v-for="shangpin in shangpin_shuju" class="food-list">
                    <h1 class="title">{{shangpin.name}}</h1>
                    <ul>
                        <li v-for="food_meige in shangpin.foods" class="food-item border-1px-suofang">
                            <div  class="icon">
                                <img width="57px" height="57px" :src="food_meige.icon">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food_meige.name}}</h2>
                                <p class="desc">{{food_meige.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food_meige.sellCount}}份</span><span>好评率{{food_meige.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="newPrice">￥{{food_meige.price}}</span><span class="oldPrice" v-show="food_meige.oldPrice">￥{{food_meige.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Gundong_chajian from 'better-scroll'; // 引入
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
                // 在$nextTick()里初始化 () => {} 箭头函数
                this.$nextTick(() => {
                    this._chushihua_hanshu(); // 调用初始化函数
                });
            }
        });
    },
    methods: {
        _chushihua_hanshu() {
            this.menu_gundong = new Gundong_chajian(this.$els.menuDom, {}); // 实例化better-scroll

            this.foods_gundong = new Gundong_chajian(this.$els.foodsDom, {}); // 右侧foods列表滚动
        }
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
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background-color #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px-fangfa(rgba(7, 17, 27, 0.1))
        &:last-child // 最后一个没有下边框
            border-1px-none()
            margin-bottom 0
        .icon
            flex 0 0 57px
            margin-right 10px
        .content
            flex 1
            .name
              margin 2px 0 8px 0
              height 14px
              line-height 14px
              color rgb(7, 17, 27)
              font-size 14px
            .desc, .extra
              line-height 10px
              color rgb(147, 153, 159)
              font-size 10px
            .desc
              margin-bottom 8px
              line-height 12px
            .extra
                .count
                  margin-right 12px
            .price
              line-height 24px
              font-weight 700
              .newPrice
                  margin-right 8px
                  font-size 14px
                  color rgb(240, 20, 20)
              .oldPrice
                  text-decoration line-through
                  font-size 10px
                  color rgb(147, 153, 159) 
              

</style>