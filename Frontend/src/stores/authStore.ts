import { defineStore } from 'pinia';
import type { userTypes } from '@/types/user';
import api from '@/api/router';
import { ref } from 'vue';
import router from '@/router';

const isErrorModalVisible = ref<boolean>(false);
export const authFunction = defineStore('authFunc', () => {
  const isLoading = ref<boolean>(false);

  const signUpUser = async (user: userTypes) => {
    try {
      isLoading.value = true;
      const response = await api.post('/auth/sign-up', user);
      console.log(response.data.res);
      await router.replace({ path: '/' });
    } catch (error) {
      isErrorModalVisible.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const signInUser = async (user: userTypes) => {
    try {
      const response = await api.post('/auth/sign-in', user);
      console.log(response.data.user.email);
      await router.replace({ path: '/' });
    } catch (error) {
      console.log(error);
    }
  };

  return { signUpUser, isLoading, isErrorModalVisible, signInUser };
});

export const errorWentWrongModal = defineStore('errorModal', () => {
  const openErrorModal = () => {
    isErrorModalVisible.value = true;
  };

  const closeErrorModal = () => {
    isErrorModalVisible.value = false;
  };

  return { isErrorModalVisible, openErrorModal, closeErrorModal };
});
