<script setup lang="ts">
import { ref } from 'vue';
import type { userTypes } from '../types/user';
import { authFunction } from '../stores/authStore';

const auth = authFunction();
const currentUserEmail = ref('');
const currentUserPass = ref('');

const signInUser = () => {
  if (currentUserEmail.value === '' || currentUserPass.value === '') {
    return;
  }

  const user: userTypes = {
    id: Date.now(),
    userName: '',
    userEmail: currentUserEmail.value,
    userPass: currentUserPass.value,
  };
  currentUserEmail.value = '';
  currentUserPass.value = '';
  auth.signInUser(user);
};
</script>
<template>
  <section class="bg-dark-khaki-300/55 flex min-h-dvh w-full items-center justify-center">
    <div
      class="bg-dark-khaki-200 font-poppins m-5 h-full rounded-xl border border-black/6 drop-shadow-lg drop-shadow-black/20 sm:max-w-md md:max-w-lg"
    >
      <div class="my-5 flex w-full flex-col items-center justify-center">
        <img src="../assets/img/logo5.png" alt="" class="w-3/9" />
        <p class="px-5 text-center text-gray-800/50">Drop your campus experience.</p>
      </div>
      <div class="flex w-full items-center justify-center px-4 sm:px-8">
        <form class="flex h-full w-full flex-col gap-5">
          <input
            class="focus:border-jungle-green-900 bg-email h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-12 shadow-lg shadow-black/15 focus:outline-none"
            type="text"
            placeholder="Email"
            required
            v-model="currentUserEmail"
          />
          <input
            class="focus:border-jungle-green-900 bg-password h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-12 shadow-lg shadow-black/15 focus:outline-none"
            type="text"
            placeholder="Password"
            required
            v-model="currentUserPass"
          />
          <button
            :disabled="auth.isLoading"
            :class="auth.buttonDisabled"
            @click="signInUser"
            class="bg-jungle-green-900 flex h-15 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-white/10 text-white"
          >
            <video v-if="auth.isLoading" loop autoplay class="h-35 w-35">
              <source src="../assets/animated icons/loading2.webm" />
            </video>
            {{ auth.isLoading ? '' : 'Sign in' }}
          </button>
          <a class="text-jungle-green-800 h-full w-full text-center text-sm" href="#"
            >Forgot Password?</a
          >
          <div class="flex h-full w-full items-center justify-center">
            <div class="h-px flex-1 bg-black/20"></div>
            <span class="text-md mx-4 text-black/60">OR</span>
            <div class="h-px flex-1 bg-black/20"></div>
          </div>
          <button
            :disabled="auth.isLoading"
            class="border-jungle-green-600 text-jungle-green-900 h-15 w-full cursor-pointer rounded-xl border-2"
          >
            Continue with google
          </button>
          <p class="mb-5 h-full w-full text-center text-sm text-black/60" href="#">
            Don't have an account?
            <a href="/auth/signup" class="text-jungle-green-900 font-bold">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
