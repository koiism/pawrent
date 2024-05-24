<template>
  <common-list
    class="my-order"
    :item-component="PetOrderCard"
    :data-setter="dataSetter"
    :gap="gap"
    allow-edit
    @edit="onEdit"
  >
    <template #header>
      <button-add-order></button-add-order>
      <popup-order-form
        v-model:visible="orderFormVisible"
        v-model:data="editedOrderData"
      ></popup-order-form>
    </template>
  </common-list>
</template>

<script setup lang="ts">
import { getMyOrders } from '@/api/index';
import { TPetOrder } from '@/api/types/commonTypes';
import PetOrderCard from '@/components/business/PetOrderCard.vue';
import { ref } from 'vue';

const orderFormVisible = ref(false);
const editedOrderData = ref<TPetOrder | undefined>();

const dataSetter = async () => {
  const petOrders = await getMyOrders();
  return petOrders;
};
const gap = 20;
const onEdit = (data: TPetOrder) => {
  editedOrderData.value = data;
  orderFormVisible.value = true;
};
</script>

<style lang="scss">
.my-order {
  padding: 20px;
  box-sizing: border-box;
}
</style>
