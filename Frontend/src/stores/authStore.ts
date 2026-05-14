import { defineStore } from 'pinia';
import type { userTypes } from '@/types/user';
import api from '@/api/router';
import { computed, next, ref } from 'vue';
import router from '@/router';
import { nextTick } from 'vue';

export const authFunction = defineStore('authFunc', () => {
  const getInitialUser = (): userTypes | null => {
    const storedUser = localStorage.getItem('user-auth');
    return storedUser ? JSON.parse(storedUser) : null;
  };

  const user = ref<userTypes | null>(getInitialUser());
  const isLoading = ref<boolean>(false);
  const isLoggedIn = computed(() => !!user.value);
  const isErrorModalVisible = ref<boolean>(false);
  const userNameError = ref<boolean>(false);
  const userEmailError = ref<boolean>(false);
  const invalidEmailError = ref<boolean>(false);
  const invalidOtpError = ref<boolean>(false);
  const isDraftUser = ref<boolean>(false);

  const resetAuth = async () => {
    user.value = null;
    localStorage.removeItem('user-auth');
    console.log('User data reset successfully');
  };

  const checkAuthProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      user.value = response.data.res;
      await router.replace({ path: '/' });
      console.log(user.value);
    } catch (error) {
      //user.value = null;
    }
  };

  const csrfVerification = async () => {
    try {
      const response = await api.get('/auth/csrf-token');
    } catch (error) {
      console.log(error);
    }
  };

  const requestOtp = async (userData: userTypes) => {
    try {
      isLoading.value = true;
      const response = await api.post('/auth/send-otp', userData);

      localStorage.setItem(
        'user-auth',
        JSON.stringify({
          userEmail: userData.userEmail,
          userName: userData.userName,
          isDraft: (userData.isDraft = true),
        }),
      );

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
        new Promise((resolve) => setTimeout(resolve, 10000)),
      ]);
      await router.replace({ path: '/' });

      user.value = response.data.res;
      csrfVerification();
      console.log('User signed up successfully', response.data.res);
    } catch (error: any) {
      console.log(error);
      //isErrorModalVisible.value = true;

      const errorType = error.response.data.msg;
      if (errorType === 'INVALID_OTP') {
        invalidOtpError.value = true;
        setTimeout(() => {
          invalidOtpError.value = false;
        }, 1000);
      } else if (errorType === 'SERVER_ERROR') {
        isErrorModalVisible.value = true;
        await router.replace({ path: '/auth/signup/otp' });
      }
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
      csrfVerification();
      localStorage.setItem(
        'user-auth',
        JSON.stringify({ userEmail: users.userEmail, userName: users.userName }),
      );
      await router.replace({ path: '/' });
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
      user.value = null;

      localStorage.removeItem('user-auth');
      console.log('successfully logged out', response.data);
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
    invalidOtpError,
    resetAuth,
    isDraftUser,
  };
});
