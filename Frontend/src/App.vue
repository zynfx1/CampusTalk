<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { authFunction } from './stores/authStore';

const authStore = authFunction();

onMounted(() => {
  authStore.checkAuthProfile();
});
</script>

<template>
  <div class="bg-dark-khaki-300/70">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
