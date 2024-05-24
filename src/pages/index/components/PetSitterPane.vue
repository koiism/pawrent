<template>
  <common-list
    :item-component="PetSitterCard"
    :data-setter="dataSetter"
    :gap="gap"
  >
    <template #header>
      <button-become-sitter></button-become-sitter>
    </template>
  </common-list>
</template>

<script setup>
import { getPetSitters } from '@/api/index';
import PetSitterCard from '@/components/business/PetSitterCard.vue';
const dataSetter = async () => {
  const petSitters = await getPetSitters();
  return petSitters;
};
const gap = 20;
</script>

<style lang="scss">
.pet-sitter-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}
</style>
