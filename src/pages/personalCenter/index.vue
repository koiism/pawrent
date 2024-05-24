<template>
  <view class="personal-center">
    <nut-cell-group title="我的信息">
      <nut-cell
        :title="sitterInfo?.id ? '编辑代管人信息' : '成为代管人'"
        @click="showSitterForm"
      >
      </nut-cell>
      <nut-cell
        title="查看我发布的订单"
        is-link
        @click="openMyOrders"
      ></nut-cell>
    </nut-cell-group>
  </view>
  <popup-sitter-form v-model:visible="sitterFormVisible"></popup-sitter-form>
</template>

<script setup lang="ts">
import { useSitterInfoStore } from '@/stores/sitterInfo';
import { getSitterInfo } from '@/api/index';
import { openMyOrders } from '@/utils/router';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const sitterFormVisible = ref(false);
const showSitterForm = () => {
  sitterFormVisible.value = true;
};

const sitterInfoStore = useSitterInfoStore();
const { sitterInfo } = storeToRefs(sitterInfoStore);

onMounted(async () => {
  await getSitterInfo();
});
</script>

<style lang="scss">
.personal-center {
  padding: 20px;
}
</style>
