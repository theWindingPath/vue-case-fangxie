<template>
    <!-- <div>i am goods</div> -->
    <!-- 两栏布局 goods(menu-wrapper/foods-wrapper) -->
    <div class="goods">
        <!-- v-el获取dom节点 -->
        <div class="menu-wrapper" v-el:menu-dom>
            <!-- ul/li(menu-item)(v-for/span(text/icon)/v-show/classMap)将左侧栏文字显示出来 -->
            <ul>
                <li v-for="shangpin in shangpin_shuju" class="menu-item" :class="{'current': xiabiao_dangqian === $index}">
                    <span class="text border-1px-suofang">
                        <span v-show="shangpin.type>0" class="icon" :class="classMap_shuzu[shangpin.type]"></span>{{shangpin.name}} {{xiabiao_dangqian}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" v-el:foods-dom>
            <!-- 右侧列表ul/li(food-list)/h1/title/(ul/li(food-item(icon(img)/content(h2/name/desc(p))extra(span/span)price))) -->
            <ul>
                <li v-for="shangpin in shangpin_shuju" class="food-list food-list-hook">
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
  import Gundong_chajian from 'better-scroll'; // 引入滚动第三方插件better-scroll

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
            shangpin_shuju: [],
            gaodu_qujian_shuzu: [], // 区间高度数组
            shishi_gundong_gaodu: 0 // 初始化为0
        };
    },
    computed: {
        xiabiao_dangqian() { // 将实时滚动高度shishi_gundong_gaodu和列表区间高度gaodu_qujian_shuzu映射，返回当前下标，
          for (let i = 0; i < this.gaodu_qujian_shuzu.length; i++) { // 遍历高度区间数组
            let height1 = this.gaodu_qujian_shuzu[i]; // 当前区间高度
            let height2 = this.gaodu_qujian_shuzu[i + 1]; // 当前元素下一个区间的高度
            // height1和height2形成区间，用滚动高度shishi_gundong_gaodu比较，看看滚动高度落在那个区间里，返回当前区间i
            if (!height2 || (this.shishi_gundong_gaodu >= height1 && this.shishi_gundong_gaodu < height2)) {
                return i;
            }
          }
          return 0;
        }
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
                    this._liebiaogaodu_hanshu();
                });
            }
        });
    },
    methods: {
        _chushihua_hanshu() {
            // Gundong_chajian() 第一个参数为dom节点
            this.menu_gundong = new Gundong_chajian(this.$els.menuDom, {}); // 实例化better-scroll

            this.foods_gundong = new Gundong_chajian(this.$els.foodsDom, {
                probeType: 3 // 实时返回滚动高度
            }); // 右侧foods列表滚动

            this.foods_gundong.on('scroll', (pos) => { // 监听scroll事件
              this.shishi_gundong_gaodu = Math.abs(Math.round(pos.y)); // pos.y有小数，是负数（需要转换为正整数）
            //   console.log(this.shishi_gundong_gaodu);
                // console.log(this.xiabiao_dangqian);
            });
        },
        _liebiaogaodu_hanshu() {
            let height = 0; // 临时变量，每个列表高度
            this.gaodu_qujian_shuzu.push(height); // 数组第一个元素为 0
            let foods_jiedian = this.$els.foodsDom.getElementsByClassName('food-list-hook'); // 获取每个li
            // console.log(foods_jiedian);
            for (let i = 0; i < foods_jiedian.length; i++) { // 遍历foods_jiedian，获得每个区间的高度，累加形成高度数组
              let yuansu_shuzu = foods_jiedian[i]; // 数组里每个元素
            //   console.log(yuansu_shuzu.clientHeight);
              height += yuansu_shuzu.clientHeight; // 每个元素高度
            //   console.log(height);
              this.gaodu_qujian_shuzu.push(height); // 放到数组里
            }
            //   console.log(this.gaodu_qujian_shuzu);
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
        &.current
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background-color #fff
          .text
            border-1px-none()
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