var express = require('express');
var app = express();
var os = require('os');
var mockList = require('../mock/index');

mockList.forEach((item) => {
  app[item.type || 'post'](item.url, function(req, res) {
    setTimeout(() => {
      res.status(200).json(item.result);
    }, item.delay || 0);
  });
});

// 获取本地ip地址
function getIPAddress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

var server = app.listen(3000, function() {
  console.log(`http://${getIPAddress()}:3000`);
})
/**
 * npm run mock-server   启动mock服务,和本地服务两个服务；mock数据更改生效要重启mock服务；
 * config/index.js 配置proxyTable代理跨域，都是本地域名但因为端口号不同，因此本地请求mock服务器的数据也是跨域
 */