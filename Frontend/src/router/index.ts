import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Homepage from '@/views/HomePage.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import NotFound from '@/views/NotFound.vue';
import verifySignUp from '@/views/verifySignUp.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Homepage,
  },
  { path: '/auth/signin', component: SignIn },
  { path: '/auth/signup/otp', component: verifySignUp },
  { path: '/auth/signup', component: SignUp },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes });

export default router;
