import { defineStore } from 'pinia';
import type { userTypes } from '@/types/user';
import api from '@/api/router';
import { computed, ref } from 'vue';
import router from '@/router';

const isErrorModalVisible = ref<boolean>(false);
export const authFunction = defineStore('authFunc', () => {
  const user = ref<userTypes | null>(null);
  const isLoading = ref<boolean>(false);
  const isLoggedIn = computed(() => !!user.value);

  const checkAuthProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      user.value = response.data.res;
      console.log(response.data.res);
    } catch (error) {
      user.value = null;
    }
  };

  const signUpUser = async (users: userTypes) => {
    try {
      isLoading.value = true;
      const response = await api.post('/auth/sign-up', users);
      user.value = response.data.res;
      console.log(response.data.res);
      await router.replace({ path: '/' });
    } catch (error) {
      isErrorModalVisible.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  const signInUser = async (users: userTypes) => {
    try {
      const response = await api.post('/auth/sign-in', users);
      user.value = response.data.user;
      console.log(response.data.user.email);
      await router.replace({ path: '/' });
    } catch (error) {
      console.log(error);
    }
  };

  return { isLoggedIn, checkAuthProfile, signUpUser, isLoading, isErrorModalVisible, signInUser };
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
