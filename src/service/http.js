import axios from 'axios';
import { Message } from 'element-ui';
import router from '@/router';
import { baseUrl } from './addr';
const instance = axios.create({
  baseURL: baseUrl,
});
instance.interceptors.request.use((config) => config
, (error) => Promise.reject(error)
);
// add a respanse interceptor
instance.interceptors.response.use((response) => {
  // console.log(response, '***');
  if (response.data.responseCode === '10001') {
    return response.data;
  } else if (response.data.responseCode === '10004') {
    Message({
      message: '用户未登陆',
      type: 'error',
    });
    localStorage.removeItem('userinfo');
    router.push('/login');
  } else {
    Message({
      message: response.data.msg,
      type: 'error',
    });
    return Promise.reject(response.data.msg);
  }
}, (error) => {
  if (error.response) {
    Message({
      message: '服务器错误，请稍后重试',
      type: 'error',
    });
  } else if (error.request) {
    Message({
      message: '网络错误，请稍后重试',
      type: 'error',
    });
  } else {
    Message({
      message: '网络错误，请稍后重试',
      type: 'error',
    });
  }
  return Promise.reject(error);
});
export default instance;