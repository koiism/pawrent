<template>
  <view class="button-add-order card" :style="{ height: height + 'px' }">
    <view class="button-add-order-overlay" @click="showOrderForm">
      <view class="button-add-order-content"> 发布代管需求 </view>
    </view>
    <popup-order-form v-model:visible="orderFormVisible"></popup-order-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const orderFormVisible = ref(false);
const showOrderForm = () => {
  orderFormVisible.value = true;
};
const height = 100;

defineOptions({
  height,
});
</script>

<style lang="scss">
.button-add-order {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--app-bg);

    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      border: 1px dotted var(--app-bg);
      border-radius: 5px;
    }
  }
}
</style>
