import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: { name: 'Background' }
  },
  {
    path: '/background',
    name: 'Background',
    redirect: { name: 'Home' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/',
        redirect: { name: 'Home' }
      },
      {
        name: 'Home',
        path: 'home',
        component: () => import('../views/home/Index.vue'),
        // a meta field
        meta: { requiresAuth: true }
      },
      {
        name: 'Intention',
        path: 'intention',
        component: () => import('../views/workbench/Intention.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Invite',
        path: 'invite',
        component: () => import('../views/workbench/Invite.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Onjob',
        path: 'onjob',
        component: () => import('../views/workbench/Onjob.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'PersonFirst',
        path: 'pfirst',
        component: () => import('../views/persondb/First.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'PersonSecond',
        path: 'psecond',
        component: () => import('../views/persondb/Second.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'CoFirst',
        path: 'cofirst',
        component: () => import('../views/codb/First.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'CoSecond',
        path: 'cosecond',
        component: () => import('../views/codb/Second.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'ReportList',
        path: 'reportlist',
        component: () => import('../views/workreport/List.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'RpShare',
        path: 'rpshare',
        component: () => import('../views/workreport/Share.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'CoList',
        path: 'colist',
        component: () => import('../views/cobrochure/List.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'CoCulture',
        path: 'coculture',
        component: () => import('../views/coculture/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'CompanyAnalysis',
        path: 'coanls',
        component: () => import('../views/analysis/Company.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'StaffAnalysis',
        path: 'stfanls',
        component: () => import('../views/analysis/Staff.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'ApplicantAnalysis',
        path: 'appanls',
        component: () => import('../views/analysis/Applicant.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'EnterpriseAnalysis',
        path: 'entanls',
        component: () => import('../views/analysis/Enterprise.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'ChannelAnalysis',
        path: 'chananls',
        component: () => import('../views/analysis/Channel.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'AllyAnalysis',
        path: 'allyanls',
        component: () => import('../views/analysis/Ally.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'ReportCenter',
        path: 'rpcenter',
        component: () => import('../views/reportcenter/Index.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Revenue',
        path: 'revenue',
        component: () => import('../views/financial/Revenue.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'ChannelFeedback',
        path: 'channelfb',
        component: () => import('../views/financial/ChannelFeedback.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'AttrCheck',
        path: 'attrcheck',
        component: () => import('../views/financial/AttrCheck.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Refund',
        path: 'refund',
        component: () => import('../views/financial/Refund.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Wage',
        path: 'wage',
        component: () => import('../views/financial/Wage.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'AuthManagement',
        path: 'authmgt',
        component: () => import('../views/system/AuthManagement.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'HomePageConfig',
        path: 'hpcfg',
        component: () => import('../views/system/HomePageConfig.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'ArticleRecommend',
        path: 'articlercmd',
        component: () => import('../views/system/ArticleRecommend.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'FinancialManagement',
        path: 'Financialmgt',
        component: () => import('../views/system/FinancialManagement.vue'),
        meta: { requiresAuth: true }
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/background/enterprise/:id',
    name: 'EntDetail',
    component: () => import('../views/detail/Enterprise.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/background/share/:id',
    name: 'ShareDetail',
    component: () => import('../views/detail/Share.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/background/dynamic/:id',
    name: 'DynamicDetail',
    component: () => import('../views/detail/Dynamic.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/error/404.vue')
  },
]

// createWebHistory --history ??????
// createWebHashHistory --hash ??????
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // ??????????????????
  let userInfo = localStorage.getItem("userInfo");
  let userToken = '';
  if (userInfo) {
    userToken = JSON.parse(userInfo).token;
  }

  // ????????????????????? next()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!userToken) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    if (userToken && to.name === 'Login') {
      next({
        name: 'Background'
      })
    } else {
      next()
    }
  }
});

export default router
