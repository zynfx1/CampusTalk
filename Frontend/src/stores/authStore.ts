import { defineStore } from 'pinia';
import type { userTypes } from '@/types/user';
import api from '@/api/router';
import { computed, ref } from 'vue';
import router from '@/router';

export const authFunction = defineStore(
  'authFunc',
  () => {
    const user = ref<userTypes | null>(null);
    const isLoading = ref<boolean>(false);
    const isLoggedIn = computed(() => !!user.value);
    const isErrorModalVisible = ref<boolean>(false);

    const checkAuthProfile = async () => {
      try {
        const response = await api.get('/user/profile');
        user.value = response.data.res;
        await router.replace({ path: '/' });
        console.log(response.data.res);
      } catch (error) {
        user.value = null;
      }
    };

    const csrfVerification = async () => {
      try {
        const response = await api.get('/auth/csrf-token');
      } catch (error) {
        console.log(error);
      }
    };

    const signUpUser = async (users: userTypes) => {
      try {
        isLoading.value = true;
        await router.replace({ path: '/auth/signup/otp' });
        const [response] = await Promise.all([
          //api.post('/auth/sign-up', users),
          new Promise((resolve) => setTimeout(resolve, 5000)),
        ]);
        //user.value = response.data.res;
        //console.log(response.data.res);
        //window.location.reload();
      } catch (error) {
        isErrorModalVisible.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const signInUser = async (users: userTypes) => {
      try {
        isLoading.value = true;
        const [response] = await Promise.all([
          api.post('/auth/sign-in', users),
          new Promise((resolve) => setTimeout(resolve, 2000)),
        ]);
        user.value = response.data.user;
        console.log(response.data.user.email);
        await router.replace({ path: '/' });
        window.location.reload();
        csrfVerification();
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };

    const handleLogout = async () => {
      try {
        isLoading.value = true;
        const response = await api.delete('/auth/logout');
        console.log('successfully logged out', response.data);
        user.value = null;
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };

    const openErrorModal = () => {
      isErrorModalVisible.value = true;
    };

    const closeErrorModal = () => {
      isErrorModalVisible.value = false;
    };

    const buttonDisabled = computed(() => ['disabled:opacity-50', 'disabled:cursor-not-allowed']);

    return {
      handleLogout,
      isLoggedIn,
      checkAuthProfile,
      signUpUser,
      isLoading,
      isErrorModalVisible,
      signInUser,
      csrfVerification,
      user,
      openErrorModal,
      buttonDisabled,
      closeErrorModal,
    };
  },
  {
    persist: {
      key: 'my-app-auth', // Custom key in localStorage
      storage: localStorage, // Explicitly define storage
      pick: ['user'], // Optional: ONLY persist the user, not 'isLoading'
    },
  },
);
