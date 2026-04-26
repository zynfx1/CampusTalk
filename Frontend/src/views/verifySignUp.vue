<script setup lang="ts">
import { ref } from 'vue';
const otpValue = ref('');
</script>

<template>
  <section class="bg-dark-khaki-300/55 flex min-h-dvh w-full items-center justify-center">
    <div
      class="bg-dark-khaki-200 font-poppins m-5 h-full rounded-xl border border-black/6 drop-shadow-lg drop-shadow-black/20 sm:max-w-md md:max-w-lg"
    >
      <div class="my-5 flex w-full flex-col items-center justify-center gap-5">
        <!--<img src="../assets/img/logo5.png" alt="" class="w-3/15" />-->
        <img
          src="../assets/img/emailGray.png"
          alt=""
          class="w-3/10 sm:w-3/14  rounded-4xl bg-gray-500/20 p-6 opacity-80"
        />
        <p class="px-5 text-center text-xl font-semibold text-gray-800/90">Verify Your Email</p>
        <p class="text-md px-5 text-center text-gray-800/50">
          We have sent a 4 digit verification code to dummy.acc@gmail.com
        </p>
      </div>
      <div class="flex w-full items-center justify-center px-4 sm:px-8">
        <form class="flex h-full w-full flex-col gap-4">
          <div class="flex h-15 w-full items-center justify-center">
            <input
              v-model="otpValue"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              maxlength="4"
              class="z-50 h-full w-full cursor-default opacity-0"
            />
            <div class="absolute flex h-15 w-full justify-center gap-4 px-4 md:gap-8 md:px-2">
              <div
                v-for="i in 4"
                :key="i"
                :class="otpValue.length === i - 1 ? 'border-b-sky-600' : 'border-b-gray-500'"
                class="h-ull flex w-15 items-center justify-center rounded-t-md border-b-2 bg-gray-500/40 text-center text-3xl"
              >
                {{ otpValue[i - 1] }}
              </div>
            </div>
          </div>
          <button
            class="bg-jungle-green-900 flex h-15 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-white/10 text-white"
          >
            Verify
          </button>
          <p class="text-jungle-green-800 mb-4 h-full w-full text-center text-sm">
            Did not receive OTP? <a href="#" class="font-medium underline">Resend</a>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
