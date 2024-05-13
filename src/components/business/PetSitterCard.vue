<template>
  <view class="pet-sitter-card card" :style="{ height: height + 'px' }">
    <view class="pet-sitter-card-title">
      <view class="pet-sitter-card-title-sitter">
        <view class="pet-sitter-card-title-sitter-name">{{ data.name }} </view>
        <view class="pet-sitter-card-title-sitter-sex">
          <icon-male v-if="data.sex === SEX.MALE"></icon-male>
          <icon-female v-else="data.sex === SEX.FEMALE"></icon-female>
        </view>
      </view>
      <view class="pet-sitter-card-title-distance"
        >距离您: {{ data.distance }}</view
      >
    </view>
    <view class="pet-sitter-card-info">
      <view class="pet-sitter-card-info-time"
        >接单时间: {{ data.workTime }}</view
      >
      <view class="pet-sitter-card-info-serve">
        <icon-cat></icon-cat>
        <icon-dog></icon-dog>
      </view>
    </view>
    <view class="pet-sitter-card-btn">
      <nut-button type="info" shape="circle" size="small">服务详情</nut-button>
      <nut-button
        type="primary"
        shape="circle"
        size="small"
        @click="requestWechat"
        >获取微信</nut-button
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { SEX } from '@/api/types/commonTypes';
import { TPetSitter } from '@/api/types/getPetSitters';
import Taro from '@tarojs/taro';

interface IPropsPetSitterCard {
  data: TPetSitter;
}
const props = defineProps<IPropsPetSitterCard>();
const { data } = props;
const requestWechat = () => {
  Taro.setClipboardData({
    data: data.weChatId,
    fail: (res) => {
      console.log(res);
    },
  });
};
const height = 100;

defineOptions({
  height,
});
</script>

<style lang="scss">
.pet-sitter-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-sitter {
      display: flex;
      gap: 10px;
      font-size: 28px;
      &-name {
        font-weight: bold;
      }
      &-sex {
        display: flex;
        align-items: center;
      }
    }
    &-distance {
      font-size: 24px;
    }
  }
  &-info {
    display: flex;
    justify-content: space-between;
    &-time {
      font-size: 24px;
      color: var(--app-sub-title-color);
    }
    &-serve {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
  &-btn {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    .nut-button {
      flex: 1;
    }
  }
}
</style>
