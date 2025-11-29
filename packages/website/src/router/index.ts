import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ChapterView from '@/views/ChapterView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/gebrauchsanweisung',
  },
  {
    path: '/:slug',
    name: 'chapter',
    component: ChapterView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
