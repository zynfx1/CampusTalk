<script setup lang="ts">
import { Heart, HomeIcon, Plus, Search, UserIcon } from 'lucide-vue-next';
import { User2Icon } from 'lucide-vue-next';
import { authFunction } from '../stores/authStore';
import { profileModalStore, confirmModalStore } from '../stores/modalStore';
import profileDropDown from '@/components/profileDropDown.vue';
import ConfirmModal from '@/components/confirmModal.vue';
const authStore = authFunction();
const profileModal = profileModalStore();
const confirmModal = confirmModalStore();
</script>

<template>
  <ConfirmModal
    @close="confirmModal.closeConfirmModal"
    :showModal="confirmModal.isConfirmModalVisible"
  ></ConfirmModal>
  <div
    class="font-poppins bg-dark-khaki-500 sm:bg-dark-khaki-300/0 text-dark-khaki-300/0 text-opacity-0 fixed bottom-0 z-50 flex h-20 w-full flex-row items-center justify-center duration-200 ease-in-out hover:w-60 hover:text-white hover:opacity-100 sm:h-full sm:w-50 sm:flex-col"
  >
    <ul class="flex w-full sm:flex-col sm:gap-2">
      <li class="flex h-full w-full items-center justify-start px-2 sm:w-full">
        <a
          href="#"
          class="flex h-full w-full flex-row items-center justify-start gap-5 rounded-lg p-3 pl-4 hover:bg-gray-400/25"
          ><HomeIcon class="h-8 w-8 stroke-white stroke-1"></HomeIcon>
          <p class="hidden sm:block">Home</p></a
        >
      </li>
      <li class="flex h-full w-full items-center justify-start px-2 sm:w-full">
        <a
          href="#"
          class="flex h-full w-full flex-row items-center justify-start gap-5 rounded-lg p-3 pl-4 hover:bg-gray-400/25"
          ><Search class="h-8 w-8 stroke-white stroke-1"></Search>
          <p class="hidden sm:block">Search</p></a
        >
      </li>
      <li class="flex h-full w-full items-center justify-start px-2 sm:w-full">
        <a
          href="#"
          class="flex h-full w-full flex-row items-center justify-start gap-4 rounded-lg p-2 pl-3 hover:bg-gray-400/25"
          ><Plus
            class="h-10 w-10 rounded-lg border border-black/5 bg-black/10 stroke-white stroke-1"
          ></Plus>
          <p class="hidden sm:block">Create</p></a
        >
      </li>
      <li class="flex h-full w-full items-center justify-start px-2 sm:w-full">
        <a
          href="#"
          class="flex h-full w-full flex-row items-center justify-start gap-5 rounded-lg p-3 pl-4 hover:bg-gray-400/25"
          ><Heart class="h-8 w-8 stroke-white stroke-1"></Heart>
          <p class="hidden sm:block">Notifications</p></a
        >
      </li>
      <li class="flex h-full w-full items-center justify-start px-2 sm:w-full">
        <a
          href="#"
          class="flex h-full w-full flex-row items-center justify-start gap-5 rounded-lg p-3 pl-4 hover:bg-gray-400/35"
          ><UserIcon class="h-8 w-8 stroke-white stroke-1"></UserIcon>
          <p class="hidden sm:block">Profile</p></a
        >
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
  </section>

  <div class="fixed top-0 right-0 mr-2 w-60 py-4">
    <profileDropDown
      @close="profileModal.closeProfileModal"
      :showModal="profileModal.isProfileModalVisible"
    ></profileDropDown>
    <ul class="font-poppins flex h-full w-full text-white drop-shadow-lg drop-shadow-black/20">
      <li class="fixed flex w-full items-center justify-end gap-2">
        <!--<p
            v-if="authStore.isLoggedIn"
            @click="handleLogout()"
            class="cursor-pointer text-end drop-shadow-sm drop-shadow-black/30"
          >
            Logout
          </p>-->

        <div
          v-if="authStore.isLoggedIn === false"
          class="mr-2 hidden w-full items-center justify-end gap-3 text-lg underline-offset-3 md:flex lg:gap-5 xl:mr-5"
        >
          <p
            class="cursor-pointer text-end text-nowrap drop-shadow-sm drop-shadow-black/30 hover:underline"
          >
            <a href="/auth/signup">Sign up</a>
          </p>
          <p
            class="cursor-pointer text-end text-nowrap drop-shadow-sm drop-shadow-black/30 hover:underline"
          >
            <a href="/auth/signin">Sign in</a>
          </p>
        </div>
        <div v-else class="ml-50 hidden w-full items-center justify-end md:block">
          <img
            @click="profileModal.openProfileModal"
            src="../assets/img/user.png"
            alt=""
            class="h-10 w-10 items-end rounded-2xl p-0.5 drop-shadow-md drop-shadow-black/20 transition duration-150 ease-in-out hover:bg-gray-500/40"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
