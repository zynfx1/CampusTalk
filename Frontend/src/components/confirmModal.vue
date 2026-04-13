<script setup lang="ts">
import { authFunction } from '../stores/authStore';
import { confirmModalStore } from '../stores/modalStore';
const authStore = authFunction();
const confirmModal = confirmModalStore();

defineProps<{
  showModal: boolean;
}>();

const handleLogout = () => {
  authStore.handleLogout();
  confirmModal.closeConfirmModal();
};
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
        class="fixed inset-0 z-50 hidden items-center justify-center bg-black/10 sm:flex"
      >
        <div
          class="bg-dark-khaki-400 font-poppins relative flex h-50 w-100 flex-col items-center justify-center gap-4 rounded-lg border border-gray-100/30 text-white"
        >
          <h1 class="w-full text-center text-2xl font-semibold">
            Are you sure you want <br />
            to log out?
          </h1>
          <div class="flex w-full items-center justify-center gap-5">
            <button
              @click="$emit('close')"
              class="bg-dark-khaki-300 hover:bg-dark-khaki-500 rounded-lg px-12 py-4 text-xl transition duration-200"
            >
              Cancel
            </button>
            <button
              @click="handleLogout"
              class="bg-dark-khaki-300 rounded-lg border-2 border-red-500/80 px-12 py-4 text-xl text-red-500/80 transition duration-200 hover:bg-red-800/10"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
