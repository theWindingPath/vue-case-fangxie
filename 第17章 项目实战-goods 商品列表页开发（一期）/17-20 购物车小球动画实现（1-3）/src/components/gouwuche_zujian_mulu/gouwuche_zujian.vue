<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logowrapper">
                  <!-- 数量count大于0，高亮显示 -->
                  <div class="logo" :class="{highLight:zonggeshu_computed>0}">
                      <i class="icon-shopping_cart" :class="{highLight:zonggeshu_computed>0}"></i>
                  </div>
                  <div class="num" v-show="zonggeshu_computed>0">{{zonggeshu_computed}}</div>
              </div>
              <div class="price" :class="{highLight:jiage_zongshu_computed>0}">￥{{jiage_zongshu_computed}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <!-- payDesc描述有三种状态，返回三种字符串，根据价格，介于0-20元 -->
              <!-- 根据总价动态添加class，大于20绿色高亮 -->
              <div class="pay" :class="jiesuan_class_computed">
                  {{jiesuan_miaoshu_computed}}
              </div>
          </div>
          <!-- 小球动画步骤
               1、定义balls[]，遍历v-for到HTML，写样式css
               2、在cartControl组件里将加号dom节点dispatch传到父组件goods，在goods调用shopcart组件的drop方法$ref
               3、shopcart定义drop，将加号dom放到balls[]元素对象里，使用dropBalls保存
               4、transition钩子函数，beforeEnter，取得加号位置getBounding，动画运动距离x/y
               5、enter，浏览器重绘，动画移动回原本位置(0,0,0)
               6、afterEnter设置false、display:none隐藏小球-->
          <div class="balls-wrapper">
              <!-- 动画transition要和v-show配合 -->
              <!-- 不推荐同时使用v-for和v-if -->
              <div transition="dropDonghua" v-for="ball in balls" v-show="ball.show" class="ball">
                  <div class="inner inner-hook"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          xuanzhe_shangpin_props: { // 维护选择商品数组，来获得商品数量，从父组件里传过来
              type: Array, // 数组
              default() {
                  return [
                    //   {
                    //       danjia_shuxing: 12, // 单价
                    //       shuliangGoumai: 2 // 数量
                    //   },
                    //   {
                    //       danjia_shuxing: 10,
                    //       shuliang_shuxing: 0
                    //   }
                  ];
              }
          },
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
          }
      },
      data() {
          return {
              balls: [
                  {
                      show: false
                  },
                  {
                      show: false
                  },
                  {
                      show: false
                  },
                  {
                      show: false
                  },
                  {
                      show: false
                  }
              ],
              dropBalls: [] // 第三方，中间放小球的变量
          };
      },
      computed: {
          jiage_zongshu_computed() { // 计算价格总数的函数
              let zongjiage_bianliang = 0;
              this.xuanzhe_shangpin_props.forEach((shangpin_xingcan) => { // 遍历数组xuanzhe_shangpin，获得所有元素里的price和count
                zongjiage_bianliang += shangpin_xingcan.price * shangpin_xingcan.shuliangGoumai; // 累加单价*数量，获得总价
              });
              return zongjiage_bianliang;
          },
          zonggeshu_computed() { // 选择的总个数
            let zonggeshu_bianliang = 0;
            this.xuanzhe_shangpin_props.forEach((shangpin_xingcan) => { // 获得每个food对象
              zonggeshu_bianliang += shangpin_xingcan.shuliangGoumai; // 累加每个选中的数量count
            });
            return zonggeshu_bianliang;
          },
          jiesuan_miaoshu_computed() { // 结算描述
              if (this.jiage_zongshu_computed === 0) { // 总价格为0
                  // es6语法
                  return `￥${this.minPrice}起送`; // 变量放到${}里
              } else if (this.jiage_zongshu_computed < this.minPrice) { // 总价大于0，小于20
                  let chajia_bianliang = this.minPrice - this.jiage_zongshu_computed; // 最低价20-当前总价 = 差价
                  return `还差￥${chajia_bianliang}起送`;
              } else { // 大于20
                  return '去结算';
              }
          },
          jiesuan_class_computed() { // 结算class
              if (this.jiage_zongshu_computed >= this.minPrice) { // 总价大于20
                  return 'goule-gaoliang'; // 绿色高亮class
              } else {
                  return 'bugou-class'; // 价格不够
              }
          }
      },
      methods: {
          xialuo_methods_shopcart(target_dom) { // 父组件调用这个函数，传target进来
            //   console.log(target_dom);
            //   变量balls，取出show: false的小球，将target_dom放到对象属性上
            // let length_balls = this.balls.length; // 小球数组长度
            for (var i = 0; i < this.balls.length; i++) { // for遍历
                let ball_dange = this.balls[i]; // 取出小球
                if (!ball_dange.show) { // 如果小球show为false
                  ball_dange.show = true; // 设为true
                  ball_dange.el_target = target_dom; // dom节点放到小球对象上
                  this.dropBalls.push(ball_dange); // 在after里取出来
                //   console.log(ball_dange);
                  return; // 点击一次，只遍历一次，取到show为false的小球后return
                }
            }
            // console.log(this.balls);
          }
      },
      transitions: {
          dropDonghua: {
              beforeEnter(el) { // 在动画开始前，将小球移动加号地方
                //   console.log(el);
                let count_balls = this.balls.length; // 遍历计数
                while (count_balls--) { // 遍历
                    let ball_before = this.balls[count_balls]; // 取出单个小球
                    if (ball_before.show) { // 小球的show在drop函数里设置为true，
                      let rect_object = ball_before.el_target.getBoundingClientRect(); // getBoundingClientRect()方法。它返回一个对象，其中包含了left、right、top、bottom四个属性，分别对应了该元素的左上角和右下角相对于浏览器窗口（viewport）左上角的距离。
                    //   console.log(rect_object);
                      let x_offset = rect_object.left - 32; // 小球动画x轴偏移距离
                      el.style.display = ''; // 在移动前将display设为空
                      el.style.webkitTransform = `translate3d(${x_offset}px,0,0)`;
                      el.style.transform = `translate3d(${x_offset}px,0,0)`; // 移动向量的横坐标
                    //   y轴偏移距离,浏览器窗口内部高 window.innerHeight
                      let y_offset = -(window.innerHeight - rect_object.top - 22); // 向上偏移所有加上负号-
                      let inner_el = el.getElementsByClassName('inner-hook')[0]; // 获取子节点，内部做y轴动画
                      inner_el.style.display = '';
                      inner_el.style.webkitTransform = `translate3d(0,${y_offset}px,0)`; // 纵轴偏移
                      inner_el.style.transform = `translate3d(0,${y_offset}px,0)`;
                    }
                }
              },
              enter(el) { // 进行动画
                //   手动触发浏览器重绘
                /* eslint-disable no-unused-vars */
                let chonghui = el.offsetTop;
                // 动画到小球原本的位置
                this.$nextTick(() => {
                      el.style.webkitTransform = 'translate3d(0,0,0)'; // 移动到原来地方
                      el.style.transform = 'translate3d(0,0,0)';
                      let inner_el = el.getElementsByClassName('inner-hook')[0];
                      inner_el.style.webkitTransform = 'translate3d(0,0,0)'; // 纵轴偏移
                      inner_el.style.transform = 'translate3d(0,0,0)';
                });
              },
              afterEnter(el) { // 动画完毕后将小球隐藏，设置show为false
                // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
                console.log(this.balls);
                let ball_after = this.dropBalls.shift();
                if (ball_after) {
                    ball_after.show = false;
                    el.style.display = 'none'; // 手动隐藏小球
                }
              }
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
      position fixed
      left 0
      bottom 0
      z-index 50
      width 100%
      height 48px // 48+24*2=96,96/2=48
      background-color #ccc
      .content
          display flex
          font-size 0
          background-color #141d27
          color #80858a
          .content-left
              flex 1
              .logowrapper
                  display inline-block
                  vertical-align top
                  position relative
                  top -10px
                  margin 0 12px
                  padding 6px
                  width 56px
                  height 56px
                  box-sizing border-box
                  border-radius 50%
                  background-color #141d27
                  // font-size 24px
                  .logo
                    width 100%
                    height 100%
                    text-align center
                    border-radius 50%
                    background-color #2b343c
                    &.highLight
                      background-color rgb(0, 160, 220)
                    .icon-shopping_cart
                      line-height 44px
                      font-size 24px
                      &.highLight
                        color #fff
                  .num
                    position absolute
                    top 0
                    right 0
                    width 24px
                    height 16px
                    line-height 16px
                    text-align center
                    border-radius 16px
                    font-size 9px
                    font-weight 700
                    color #fff
                    background-color rgb(240, 20, 20)
                    box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
              .price
                  display inline-block
                  vertical-align top
                  margin-top 12px
                  padding-right 12px
                  box-sizing border-box
                  border-right 1px solid rgba(255, 255, 255, 0.1)
                  line-height 24px
                  font-size 16px
                  font-weight 700
                  &.highLight
                    color #fff
              .desc
                  display inline-block
                  vertical-align top
                  margin 12px 12px 0 12px
                  line-height 24px
                  font-size 10px
          .content-right
              flex 0 0 105px
              width 105px
              .pay
                height 48px
                line-height 48px
                text-align center
                font-size 12px
                font-weight 700
                // background-color #2b333b
                &.goule-gaoliang // 钱够了
                  background-color #00b43c
                  color #fff
                &.bugou-class // 钱不够20
                  background-color #2b333b
          .balls-wrapper
            .ball
              position fixed
              left 32px // 88-16*2=56,56/2=28(padding-left),28+36=64,64/2=32(left)
              bottom 22px
              z-index 200
              &.dropDonghua-transition 
                transition all 0.6s linear // 使用贝塞尔曲线
                .inner
                    width 16px
                    height 16px
                    border-radius 50%
                    background-color rgb(0, 160, 220)
                    transition all 0.6s cubic-bezier(0.28, -0.51, 0.78, 0.29)
                
</style>