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

<script setup lang="ts">
import { getPetSitters } from '@/api/index';
import PetSitterCard from '@/components/business/PetSitterCard.vue';
const dataSetter = async (offset: number) => {
  const petSitters = await getPetSitters({
    offset,
    limit: 20,
  });
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
