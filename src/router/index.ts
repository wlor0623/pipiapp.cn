import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/software',
    name: 'software',
    component: () => import('@/pages/SoftwarePage.vue'),
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/pages/ToolsPage.vue'),
  },
  {
    path: '/software/:slug',
    name: 'software-detail',
    component: () => import('@/pages/SoftwareDetailPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/pages/PrivacyPage.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/pages/TermsPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

export default routes
