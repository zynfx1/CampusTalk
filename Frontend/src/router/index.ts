import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Homepage from '@/views/HomePage.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import NotFound from '@/views/NotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Homepage,
  },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

export default router;
