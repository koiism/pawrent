<template>
  <view>order</view>
</template>

<script setup lang="ts">
import { TPetOrder } from '@/api/types/getPetOrders';


interface IPropsPetOrderCard {
  data: TPetOrder;
}
const props = defineProps<IPropsPetOrderCard>();

const height = 100;

defineOptions({
  height,
});
</script>

<style></style>
