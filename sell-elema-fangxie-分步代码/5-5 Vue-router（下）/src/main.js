import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'; // 引入
import shangpin_zujian from './components/shangpin_zujian_mulu/shangpin_zujian'; // 引入商品组件
import pingjia_zujian from './components/pingjia_zujian_mulu/pingjia_zujian';
import shangjia_zujian from 'components/shangjia_zujian_mulu/shangjia_zujian'; // 可以直接使用components相对路径

Vue.use(VueRouter); // 安装路由功能

let app_genshili = Vue.extend(App); // 创建根实例

let router_luyou = new VueRouter({
  linkActiveClass: 'active_luyou'
}); // 创建 router 实例

router_luyou.map({ // 定义路由
  '/shangpin_luyou': { // 商品路由
    component: shangpin_zujian // 商品组件
  },
  '/pingjia_luyou': { // 评论路由
    component: pingjia_zujian
  },
  '/shangjia_luyou': {
    component: shangjia_zujian
  }
});

router_luyou.start(app_genshili, '#app'); // 启动router
// 这行下面需要空一行  Newline required at end of file but not found

// 需求进入页面，默认路由到商品页面
router_luyou.go('/shangpin_luyou');
