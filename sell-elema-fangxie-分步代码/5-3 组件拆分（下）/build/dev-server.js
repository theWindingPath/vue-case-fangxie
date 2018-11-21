var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// 从data_elema.json里获取数据
var elema_data = require('../data_elema.json');
var maijia_data = elema_data.seller; // 将json里seller数据放到seller_data上
var shangpin_data = elema_data.goods;
var pinglun_data = elema_data.ratings;

// 定义路由
var api_luyou = express.Router();

// 写一些接口
api_luyou.get('/maijia', function (req, res) { // get有一个回调函数（有两个参数）
  res.json({ // 返回json数据
    cuowu_biaoshi: 0, // 错误标识码
    shuju: maijia_data // 这里是seller里的数据
  });
});

// 获取goods数据
api_luyou.get('/shangpin', function (req, res) { // get有一个回调函数（有两个参数）
  res.json({ // 返回json数据
    cuowu_biaoshi: 0, // 错误标识码
    shuju: shangpin_data // 这里是seller里的数据
  });
});

api_luyou.get('/pinglun', function (req, res) { // get有一个回调函数（有两个参数）
  res.json({ // 返回json数据
    cuowu_biaoshi: 0, // 错误标识码
    shuju: pinglun_data // 这里是seller里的数据
  });
});

// 调用app的use方法
app.use('/api', api_luyou);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
