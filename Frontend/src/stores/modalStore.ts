import { defineStore } from 'pinia';
import { ref } from 'vue';

export const profileModalStore = defineStore('profileModal', () => {
  const isProfileModalVisible = ref<boolean>(false);

  const openProfileModal = () => {
    isProfileModalVisible.value = !isProfileModalVisible.value;
  };
  const closeProfileModal = () => {
    isProfileModalVisible.value = false;
  };

  return { isProfileModalVisible, openProfileModal, closeProfileModal };
});
