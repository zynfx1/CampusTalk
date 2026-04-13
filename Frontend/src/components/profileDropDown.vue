<script setup lang="ts">
import { LogOut, LogOutIcon, User } from 'lucide-vue-next';
import { authFunction } from '../stores/authStore';
import { profileModalStore, confirmModalStore } from '../stores/modalStore';
const authStore = authFunction();
const profileModal = profileModalStore();
const confirmModal = confirmModalStore();

const handleLogout = () => {
  confirmModal.openConfirmModal();
  profileModal.closeProfileModal();
};
defineProps<{
  showModal: boolean;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition
      name="fade"
      enter-active-class="duration-150 ease-in"
      enter-from-class="opacity-0 "
      leave-active-class="duration-150 ease-out"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        @click.self="$emit('close')"
        class="fixed inset-x-20 inset-y-0 bg-black/0"
      >
        <div
          class="bg-custom-gray font-poppins fixed top-15 right-0 mr-2 flex h-30 w-60 items-center justify-center rounded-2xl border border-white/40 text-white"
        >
          <ul class="flex h-full w-full items-center justify-center">
            <li class="flex h-full w-full flex-col p-2">
              <div
                class="flex h-full cursor-pointer items-center justify-start gap-4 rounded-lg transition duration-50 ease-in-out hover:bg-gray-400"
              >
                <User class="ml-2"></User>
                <p>View profile</p>
              </div>
              <div
                @click="handleLogout"
                class="flex h-full cursor-pointer items-center justify-start gap-4 rounded-lg transition duration-50 ease-in-out hover:bg-gray-400"
              >
                <LogOutIcon class="ml-2"></LogOutIcon>
                <p>Log out</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
