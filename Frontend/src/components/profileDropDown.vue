<script setup lang="ts">
import { LogOut, LogOutIcon, User } from 'lucide-vue-next';
import { authFunction } from '../stores/authStore';
const authStore = authFunction();

const handleLogout = () => {
  authStore.handleLogout();
};
defineProps<{
  showModal: boolean;
}>();
</script>

<template to="body">
  <div @click.self="$emit('close')" class="fixed inset-0 bg-black/0">
    <div
      v-if="showModal"
      class="bg-custom-gray font-poppins fixed top-15 right-0 mr-2 flex h-30 w-60 items-center justify-center rounded-2xl border border-white/40 text-white"
    >
      <ul class="flex h-full w-full items-center justify-center">
        <li class="flex h-full w-full flex-col p-2">
          <div
            class="flex h-full items-center justify-start gap-4 rounded-lg transition duration-50 ease-in-out hover:bg-gray-400"
          >
            <User class="ml-2"></User>
            <p>View profile</p>
          </div>
          <div
            @click="handleLogout"
            class="flex h-full items-center justify-start gap-4 rounded-lg transition duration-50 ease-in-out hover:bg-gray-400"
          >
            <LogOutIcon class="ml-2"></LogOutIcon>
            <p>Log out</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
