<script setup lang="ts">
import { HomeIcon } from 'lucide-vue-next';
</script>
<template>
  <div
    class="hover:bg-jungle-green-900 font-poppins bg-dark-khaki-500 text-dark-khaki-300/0 text-opacity-0 absolute flex h-full w-20 items-center px-4 shadow-md shadow-black duration-200 ease-in-out hover:w-60 hover:text-white hover:opacity-100"
  >
    <ul class="flex flex-col gap-8">
      <li class="flex w-30 items-center gap-5">
        <a href="#"><img src="../assets/img/home3.png" alt="" class="h-8.5 w-8.5" /></a>
        <p class="">Home</p>
      </li>
      <li class="flex w-30 items-center gap-5">
        <a href="#"><img src="../assets/img/searchWhite.png" alt="" class="h-8 w-8" /></a>
        <p class="">Search</p>
      </li>
      <li class="flex w-30 items-center gap-5">
        <a href="#"
          ><img
            src="../assets/img/plusWhite.png"
            alt=""
            class="h-9 w-9 rounded-lg border border-black/5 bg-black/10 p-1.5"
        /></a>
        <p class="">Create</p>
      </li>
      <li class="flex w-50 items-center gap-5">
        <a href="#"><img src="../assets/img/heartNewWhite.png" alt="" class="h-8 w-8" /></a>
        <p class="">Notifications</p>
      </li>
      <li class="absolute bottom-20 flex w-30 items-center gap-5">
        <a href="#"><img src="../assets/img/settingNewWhite.png" alt="" class="h-8 w-8" /></a>
        <p class="">Setting</p>
      </li>
    </ul>
  </div>
  <section
    class="bg-dark-khaki-300/55 font-poppins flex min-h-screen w-screen items-center justify-center text-white"
  >
    <div class="h-full w-3/15"></div>
    <div class="flex h-screen w-full justify-center py-4">
      <h1 class="text-2xl font-medium text-black/50">Feed</h1>
      <div class=""></div>
    </div>
    <div class="bg-dark-khaki-500 flex h-screen w-3/15 px-4 py-4 shadow-md shadow-black">
      <ul>
        <li class="flex items-center gap-19">
          <img
            src="../assets/img/user.png"
            alt=""
            class="h-10 w-10 drop-shadow-lg drop-shadow-black/30"
          />
          <p class="">Logout</p>
        </li>
      </ul>
    </div>
  </section>
</template>
