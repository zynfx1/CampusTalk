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
    const userNameError = ref<boolean>(false);
    const userEmailError = ref<boolean>(false);
    const invalidEmailError = ref<boolean>(false);

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

    const requestOtp = async (user: userTypes) => {
      try {
        isLoading.value = true;
        const response = await api.post('/auth/send-otp', {
          userName: user.userName,
          userEmail: user.userEmail,
        });
        await router.replace({ path: '/auth/signup/otp' });
        console.log('OTP sent successfully', response.data);
      } catch (error: any) {
        const errorType = error.response.data.msg;

        if (errorType === 'USERNAME_TAKEN') {
          userNameError.value = true;
          setTimeout(() => {
            userNameError.value = false;
          }, 2000);
        } else if (errorType === 'EMAIL_TAKEN') {
          userEmailError.value = true;
          setTimeout(() => {
            userEmailError.value = false;
          }, 2000);
        } else if (errorType === 'INVALID_EMAIL') {
          invalidEmailError.value = true;
          setTimeout(() => {
            invalidEmailError.value = false;
          }, 2000);
        }
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    };

    const signUpUser = async (users: userTypes) => {
      try {
        isLoading.value = true;
        const [response] = await Promise.all([
          api.post('/auth/sign-up', users),
          new Promise((resolve) => setTimeout(resolve, 5000)),
        ]);
        await router.replace({ path: '/auth/signup/otp' });

        user.value = response.data.res;

        //window.location.reload();
      } catch (error) {
        console.log(error);
        isErrorModalVisible.value = true;
        return;
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
      requestOtp,
      userNameError,
      userEmailError,
      invalidEmailError,
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
