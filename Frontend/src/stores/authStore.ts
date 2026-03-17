import { defineStore } from 'pinia';
import type { userTypes } from '@/types/user';
import api from '@/api/router';
import { ref } from 'vue';
import router from '@/router';

export const authFunction = defineStore('authFunc', () => {
  const isLoading = ref<boolean>(false);

  const signUpUser = async (user: userTypes) => {
    try {
      isLoading.value = true;
      const response = await api.post('/auth/sign-up', user);
     
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;  
      router.push({ path: '/' });
    }
  };

  return { signUpUser, isLoading };
});
