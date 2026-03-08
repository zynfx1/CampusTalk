<script setup lang="ts">
import SignUp from './SignUp.vue';
</script>

<template>
  <section
    class="bg-dark-khaki-300/70 flex min-h-screen w-screen items-center justify-center overflow-y-auto"
  >
    <div
      class="bg-dark-khaki-200 font-poppins fixed w-full rounded-xl border border-black/6 drop-shadow-lg drop-shadow-black/20 sm:max-w-sm md:max-w-sm lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
    >
      <div class="my-5 flex w-full flex-col items-center justify-center">
        <img src="../assets/img/logo5.png" alt="" class="w-3/9" />
        <p class="text-gray-800/50">Where students share campus life.</p>
      </div>
      <div class="flex w-full flex-col items-center justify-center gap-5 px-20">
        <input
          class="focus:border-jungle-green-900 bg-user h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-10 shadow-lg shadow-black/15 focus:outline-none"
          type="text"
          placeholder="Username"
        />
        <input
          class="focus:border-jungle-green-900 bg-email h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-10 shadow-lg shadow-black/15 focus:outline-none"
          type="text"
          placeholder="Email"
        />
        <input
          class="focus:border-jungle-green-900 bg-password h-15 w-full rounded-xl border-2 border-black/10 bg-size-[auto_25px] bg-position-[left_10px_center] bg-no-repeat px-10 shadow-lg shadow-black/15 focus:outline-none"
          type="text"
          placeholder="Password"
        />
        <button
          class="bg-jungle-green-900 h-15 w-full cursor-pointer rounded-xl border-2 border-white/10 text-white"
        >
          Sign Up
        </button>
        <p class="mb-5 h-full w-full text-center text-sm text-black/60" href="#">
          Already have an account?
          <a href="/signin" class="text-jungle-green-900 font-bold">Log In</a>
        </p>
      </div>
    </div>
  </section>
</template>
