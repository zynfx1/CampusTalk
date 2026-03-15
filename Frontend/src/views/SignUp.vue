<script setup lang="ts">
import { computed, ref } from 'vue';
import type { userTypes } from '@/types/user';
import { authFunction } from '@/stores/authStore';
import router from '../router/index.ts';
const newUserName = ref('');
const newUserEmail = ref('');
const newUserPass = ref('');

const authStore = authFunction();

const signUpUser = () => {
  if (newUserName.value === '' && newUserEmail.value === '' && newUserPass.value === '') {
    return;
  }

  const user: userTypes = {
    id: Date.now(),
    userName: newUserName.value,
    userEmail: newUserEmail.value,
    userPass: newUserPass.value,
  };
  newUserName.value = '';
  newUserEmail.value = '';
  newUserPass.value = '';
  authStore.signUpUser(user);
};

const buttonDisabled = computed(() => ['disabled:opacity-50', 'disabled:cursor-not-allowed']);
</script>

<template>
  <section class="bg-dark-khaki-300/70 flex min-h-dvh w-full items-center justify-center">
    <div
      class="bg-dark-khaki-200 font-poppins m-5 h-full rounded-xl border border-black/6 drop-shadow-lg drop-shadow-black/20 sm:max-w-md md:max-w-lg"
    >
      <div class="my-5 flex w-full flex-col items-center justify-center">
        <img src="../assets/img/logo5.png" alt="" class="w-3/9" />
        <p class="px-5 text-center text-gray-800/50">Where students share campus life.</p>
      </div>
      <div class="flex w-full flex-col items-center justify-center gap-5 px-4 sm:px-8">
        <input
          class="focus:border-jungle-green-900 bg-user h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-12 shadow-lg shadow-black/15 focus:outline-none"
          type="text"
          placeholder="Username"
          v-model="newUserName"
        />
        <input
          class="focus:border-jungle-green-900 bg-email h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-12 shadow-lg shadow-black/15 focus:outline-none"
          type="text"
          placeholder="Email"
          v-model="newUserEmail"
        />
        <input
          class="focus:border-jungle-green-900 bg-password h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-12 shadow-lg shadow-black/15 focus:outline-none"
          type="text"
          placeholder="Password"
          v-model="newUserPass"
        />
        <button
          :disabled="authStore.isLoading"
          :class="buttonDisabled"
          @click.prevent="signUpUser"
          class="bg-jungle-green-900 h-15 w-full cursor-pointer rounded-xl border-2 border-white/10 text-white"
        >
          {{ authStore.isLoading ? 'Loading' : 'Sign Up' }}
        </button>
        <p class="mb-5 h-full w-full text-center text-sm text-black/60" href="#">
          Already have an account?
          <a href="/auth/signin" class="text-jungle-green-900 font-bold">Log In</a>
        </p>
      </div>
    </div>
  </section>
</template>
