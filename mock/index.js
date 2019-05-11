var mockList = [
  ...require('./taxDeduction'),
  ...require('./appManger'),
]
module.exports = mockList;

/**
 * 1. //build/mock-server.js 文件中用express搭建服务；
 * 2. config/index.js 配置proxyTable代理跨域，都是本地域名但因为端口号不同，因此本地请求mock服务器的数据也是跨域
 * 3. npm run mock-server   启动mock服务,和本地服务两个服务；mock数据更改生效要重启mock服务；
 * 4. addr.js改域名和端口号；
 * 
 */
