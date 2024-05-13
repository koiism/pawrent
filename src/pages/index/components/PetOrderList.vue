<script setup>
import { getPetOrders } from '@/api/index';
import PetOrderCard from '@/components/business/PetOrderCard.vue';
const dataSetter = async () => {
  const petOrders = (await getPetOrders()).data;
  return petOrders;
};
const gap = 20;
</script>
<template>
  <common-list
    :item-component="PetOrderCard"
    :data-setter="dataSetter"
    :item-height="PetOrderCard.height + gap"
  >
  </common-list>
</template>
