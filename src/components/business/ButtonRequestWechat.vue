<template>
  <nut-button type="primary" shape="circle" size="small" @click="requestWechat">
    <slot />
  </nut-button>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';

const props = withDefaults(
  defineProps<{
    wechatId: string;
  }>(),
  {
    wechatId: '',
  }
);

const requestWechat = () => {
  Taro.setClipboardData({
    data: props.wechatId,
    fail: (res) => {
      console.error(res);
    },
  });
};
</script>

<style></style>
