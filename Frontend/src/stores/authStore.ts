import { defineStore } from 'pinia';
import type { userTypes } from '@/types/user';
import api from '@/api/router';

export const authFunction = defineStore('authFunc', () => {
  const signUpUser = async (user: userTypes) => {
    try {
      const response = await api.post('/auth/sign-up-user', user);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { signUpUser };
});
