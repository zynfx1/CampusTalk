import type { RouteLocationNormalized } from 'vue-router';
import { authFunction } from '@/stores/authStore';

export const clearAuthHome = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const authStore = authFunction();

  if (to.path === '/') {
    if (authStore.user?.isDraft === true) {
      authStore.resetAuth();
      console.log('Cleared user data when navigating to home from auth page');
      return true;
    }
  }
};
