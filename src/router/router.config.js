// 定义前端访问路由
const routes = [
  {
    path: '/',
    redirect: "/index",
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../pages/index/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/login.vue')
  }
];

export {
  routes
};
