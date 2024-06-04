<template>
  <common-list
    class="my-order"
    v-model="myOrderList"
    :items="myOrderList"
    :data-setter="dataSetter"
    :gap="gap"
  >
    <template v-slot="item">
      <pet-order-card
        :data="item.data"
        allow-edit
        @edit="onEdit"
      ></pet-order-card>
    </template>
    <template #header>
      <button-add-order @complete-edit="onCompleteAdd"></button-add-order>
      <popup-order-form
        v-model:visible="orderFormVisible"
        v-model:data="editedOrderData"
        @complete-edit="onCompleteEdit"
      ></popup-order-form>
    </template>
  </common-list>
</template>

<script setup lang="ts">
import { getMyOrders } from '@/api/index';
import { TPetOrder } from '@/api/types/commonTypes';
import { ref } from 'vue';

const myOrderList = ref<TPetOrder[]>([]);

const orderFormVisible = ref(false);
const editedOrderData = ref<TPetOrder | undefined>();

const dataSetter = async (offset: number) => {
  const petOrders = await getMyOrders({
    offset,
    limit: 20,
  });
  return petOrders;
};
const gap = 20;
const onEdit = (data: TPetOrder) => {
  editedOrderData.value = Object.assign({}, data);
  orderFormVisible.value = true;
};
const onCompleteEdit = (id, data) => {
  myOrderList.value = myOrderList.value.map((item) => {
    if (item.id === id) {
      return data;
    }
    return item;
  });
};
const onCompleteAdd = (id, data) => {
  if (id) {
    myOrderList.value.unshift(data);
  }
};
</script>

<style lang="scss">
.my-order {
  padding: 20px;
  box-sizing: border-box;
}
</style>
