export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    flatMenu: true,
    component: '@/layouts/AuthorityToken',
    routes: [
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
    ],
  },
];
