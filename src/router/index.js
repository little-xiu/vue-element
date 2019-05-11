import Vue from 'vue'
import Router from 'vue-router';
import { EWOULDBLOCK } from 'constants';
// 按需加载模块
const Home = () => import('@/pages/Home');
const Login = () => import('@/pages/login');
const ReportCenter = () => import('@/view/ReportCenter');
const TestTabs = () => import('@/pages/testTabs/testTabs');
const TestCase = () => import('@/pages/components/TestCase');
const TestDetail = () => import('@/pages/components/testDetail');
const ProblemDetail = () => import('@/pages/probleDetail/ProblemDetail');
const ManCheck = () => import('@/pages/manCheck/manCheck');
const Container = () => import('@/view/remoteDevice/container');
const RemoteDevice = () => import('@/view/remoteDevice/remoteDevice');
const CheckRecord = () => import('@/view/remoteDevice/checkRecord');
const RemoteDetail = () => import('@/view/remoteDevice/remoteDetail');
const Ebook = () => import('@/view/ebook/ebook');
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {name: 'appManger'},
      children: [
        {
          path: 'appManger',
          name: 'appManger',
          component: () => import('@/view/appManger'),
        },
        {
          path: 'remote',
          name: 'remote',
          component: Container,
          redirect: {name: 'remoteDevice'},
          children: [
            {
              path: 'remoteDevice',
              name: 'remoteDevice',
              component: RemoteDevice,
            },
            {
              path: 'checkRecord',
              name: 'CheckRecord',
              component: CheckRecord,
            },
            {
              path: 'remoteDetail',
              name: 'remoteDetail',
              component: RemoteDetail,
            },
          ],
        },
        {
          path: 'reportCenter',
          name: 'reportCenter',
          component: ReportCenter,
        },
        {
          path: 'ebook',
          name: 'ebook',
          component: Ebook,
        },
        {
          path: '/testtabs',
          name: 'testtabs',
          component: TestTabs,
          redirect: { name: 'ReportCenter_Profile' },
          children: [
            {
              path: 'profile',
              name: 'ReportCenter_Profile',
              component: TestCase,
            },
            {
              path: 'detail',
              name: 'ReportCenter_Detail',
              component: TestDetail,
            },
            {
              path: 'check',
              name: 'ReportCenter_Check',
              component: ManCheck,
            },
          ],
        },
        {
          path: 'problemDetail',
          name: 'problemDetail',
          component: ProblemDetail,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
});

router.beforeEach((to, from, next) => {
  let userinfo = localStorage.getItem('userinfo') || '{}';
  userinfo = JSON.parse(userinfo);
  if (to.path === '/register') {
    return next();
  }
  if (to.path !== '/login' && (!userinfo.name)) {
    localStorage.removeItem('userinfo');
    return next('/login');
  }
  return next();
})

export default router