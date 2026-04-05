<script setup lang="ts">
import { Heart, HomeIcon, Plus, Search, UserIcon } from 'lucide-vue-next';
import { User2Icon } from 'lucide-vue-next';
import { authFunction } from '../stores/authStore';
const authStore = authFunction();

const handleLogout = () => {
  authStore.handleLogout();
};
</script>

<template>
  <div
    class="sm:hover:bg-jungle-green-900 font-poppins bg-dark-khaki-500 text-dark-khaki-300/0 text-opacity-0 fixed bottom-0 flex h-20 w-full flex-row items-center justify-center shadow-md shadow-black duration-200 ease-in-out hover:w-60 hover:text-white hover:opacity-100 sm:h-full sm:w-20 sm:flex-col"
  >
    <ul class="flex w-full sm:flex-col sm:gap-8">
      <li class="flex h-full w-full items-center justify-center gap-5 sm:w-36">
        <a href="#"><HomeIcon class="h-8 w-8 stroke-white stroke-1"></HomeIcon></a>
        <p class="hidden sm:block">Home</p>
      </li>
      <li class="flex h-full w-full items-center justify-center gap-5 sm:w-37">
        <a href="#"><Search class="h-8 w-8 stroke-white stroke-1"></Search></a>
        <p class="hidden sm:block">Search</p>
      </li>
      <li class="flex h-full w-full items-center justify-center gap-5 sm:w-37">
        <a href="#"
          ><Plus
            class="h-10 w-10 rounded-lg border border-black/5 bg-black/10 stroke-white stroke-1"
          ></Plus
        ></a>
        <p class="hidden sm:block">Create</p>
      </li>
      <li class="flex h-full w-full items-center justify-center gap-5 sm:w-50">
        <a href="#"><Heart class="h-8 w-8 stroke-white stroke-1"></Heart></a>
        <p class="hidden sm:block">Notifications</p>
      </li>
      <li class="flex h-full w-full items-center justify-center gap-5 sm:w-37">
        <a href="#"><UserIcon class="h-8 w-8 stroke-white stroke-1"></UserIcon></a>
        <p class="hidden sm:block">Profile</p>
      </li>
      <!--<li class="absolute bottom-20 flex w-30 items-center gap-5">
        <a href="#"><img src="../assets/img/settingNewWhite.png" alt="" class="h-8 w-8" /></a>
        <p class="">Setting</p>
      </li>-->
    </ul>
  </div>
  <section
    class="bg-dark-khaki-300/55 font-poppins flex min-h-screen w-screen items-center justify-center text-white"
  >
    <div class="flex h-screen w-full justify-center py-4">
      <h1 class="text-2xl font-medium text-black/50">Feed</h1>
      <div class=""></div>
    </div>
    <div
      class="fixed top-0 right-0 hidden w-3/15 py-4 drop-shadow-lg drop-shadow-black/20 sm:block"
    >
      <ul class="flex h-full w-full">
        <li class="flex w-full items-center justify-end gap-5">
          <div class="flex items-center justify-center">
            <img
              src="../assets/img/user.png"
              alt=""
              class="bg-amber-90 h-10 w-10 items-end drop-shadow-md drop-shadow-black/20"
            />
            <p class="cursor-pointer px-4 text-end text-nowrap drop-shadow-sm drop-shadow-black/30">
              user
            </p>
          </div>

          <p
            v-if="authStore.isLoggedIn"
            @click="handleLogout()"
            class="cursor-pointer px-4 text-end drop-shadow-sm drop-shadow-black/30"
          >
            Logout
          </p>
          <div v-else class="flex ">
            <p class="cursor-pointer px-4 text-end text-nowrap drop-shadow-sm drop-shadow-black/30">
              <a href="/auth/signup">Sign up</a>
            </p>
            <p class="cursor-pointer px-4 text-end text-nowrap drop-shadow-sm drop-shadow-black/30">
              <a href="/auth/signin">Sign in</a>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
