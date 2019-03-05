const dev = process.env.NODE_ENV.trim();
// 开发环境用http://z-stg4.pa18.com:1080/ptc-web
// const baseUrl = (dev === 'development') ? 'http://z-stg4.pa18.com:1080/ptc-web' : '/ptc-web';
// 请求mock服务器时
const baseUrl = (dev === 'development') ? '/' : '/';
// 开发环境
// const devUrl = 'http://z-stg4.pa18.com:1080/';
const devUrl = '';
const devUrlP = '/';
// 后端人员IP
// const devUrl = 'http://10.118.130.68:8080';
const serverIpAddress = (dev === 'development') ? devUrl : devUrlP;
export {
  baseUrl,
  serverIpAddress,
};
