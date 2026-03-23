<script setup lang="ts">
defineProps<{
  showModal: boolean;
}>();
</script>
<template>
  <Teleport to="body">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/20">
      <div
        class="bg-custom-light-brown2 font-poppins m-4 flex flex-col items-center justify-center gap-5 rounded-xl border border-gray-500/60 p-4"
      >
        <img src="../assets/img/warning2.png" alt="" class="h-15 w-15" />
        <h1 class="text-2xl font-medium text-black/70">Something went wrong</h1>

        <p class="text-md text-gray-800/70">
          We were unable to process this request. <br />
          Please try again.
        </p>
        <button
          @click="$emit('close')"
          class="border-jungle-green-900 text-jungle-green-900/90 h-full w-full rounded-sm border-2 p-4 text-lg font-medium transition duration-300 hover:bg-gray-800/10"
        >
          Try again
        </button>
      </div>
    </div>
  </Teleport>
</template>
