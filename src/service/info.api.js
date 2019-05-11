import http from './http';
export const getLogin = (params) => http.post('/tax/user/signin.do', params);
export const getTestCase1 = (params) => http.post('/tax/user/getMateInfo.do', params);
export const getTestCase2 = (params) => http.post('/tax/user/getTestCase.do', params);
