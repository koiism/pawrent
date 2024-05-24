<template>
  <common-list
    :item-component="PetOrderCard"
    :data-setter="dataSetter"
    :gap="gap"
  >
    <template #header>
      <button-add-order></button-add-order>
    </template>
  </common-list>
</template>

<script setup>
import { getPetOrders } from '@/api/index';
import PetOrderCard from '@/components/business/PetOrderCard.vue';
const dataSetter = async () => {
  const petOrders = await getPetOrders();
  return petOrders;
};
const gap = 20;
</script>

<style lang="scss">
.pet-order-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}
</style>
