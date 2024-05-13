<script setup>
import { getPetSitters } from '@/api/index';
import PetSitterCard from '@/components/business/PetSitterCard.vue';
const dataSetter = async () => {
  const petSitters = (await getPetSitters()).data;
  return petSitters;
};
const gap = 20;
</script>
<template>
  <common-list
    :item-component="PetSitterCard"
    :data-setter="dataSetter"
    :item-height="PetSitterCard.height + gap"
  >
    <span>pet sitter list</span>
  </common-list>
</template>
