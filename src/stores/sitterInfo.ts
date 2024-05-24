import { TPetSitter } from '@/api/types/commonTypes';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSitterInfoStore = defineStore('sitterInfo', () => {
  const sitterInfo = ref<TPetSitter | null>(null);
  const updateSitterInfo = (info: TPetSitter | null) => {
    sitterInfo.value = info;
  };
  return {
    sitterInfo,
    updateSitterInfo,
  };
});
