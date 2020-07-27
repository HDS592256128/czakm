export default {
  routes: [
    {
      path: '/',
      redirect: '/unit'
    },
    {
      path: '/unit',
      component: () => import('../views/unit'),
      meta: {
        title: '考勤单位管理',
        showCrumb: false  // true隐藏Crumb
      }
    },
    {
      path: '/record',
      component: () => import('../views/record'),
      meta: {
        title: '考勤记录管理',
        showCrumb: false  // true隐藏Crumb
      }
    }
  ]
};
