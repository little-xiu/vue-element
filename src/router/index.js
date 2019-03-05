import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home';
import Login from '@/pages/login';
import ReportCenter from '@/view/ReportCenter';
import appManger from '@/view/appManger';
import deviceManger from '@/view/deviceManger';
import TestTabs from '@/pages/testTabs/testTabs';
import TestCase from '@/pages/components/TestCase';
import TestDetail from '@/pages/components/testDetail';
import ProblemDetail from '@/pages/probleDetail/ProblemDetail';
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
          component: appManger,
        },
        {
          path: 'deviceManger',
          name: 'deviceManger',
          component: deviceManger,
        },
        {
          path: 'reportCenter',
          name: 'reportCenter',
          component: ReportCenter,
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