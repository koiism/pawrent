<template>
  <nut-popover v-model:visible="show" location="right">
    <template #reference>
      <icon-help @click="show = true"></icon-help>
    </template>
    <template #content>
      <view> Custom Content Custom Content {{ props.msg }} </view>
    </template>
  </nut-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
const props = defineProps<{ msg: string }>();
</script>

<style></style>
