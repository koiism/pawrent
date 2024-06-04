<template>
  <common-list :data-setter="dataSetter" :gap="gap">
    <template v-slot="item">
      <pet-order-card :data="item.data"></pet-order-card>
    </template>
    <template #header>
      <button-add-order></button-add-order>
    </template>
  </common-list>
</template>

<script setup lang="ts">
import { getPetOrders } from '@/api/index';
const dataSetter = async (offset: number) => {
  const petOrders = await getPetOrders({
    offset,
    limit: 20,
  });
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
