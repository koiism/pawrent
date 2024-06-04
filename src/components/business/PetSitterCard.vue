<!-- TODO: 骨架屏 -->
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
        >距离您: {{ data.distance }} km</view
      >
    </view>
    <view class="pet-sitter-card-info">
      <view class="pet-sitter-card-info-time"
        >接单时间: {{ data.workTime }}</view
      >
      <view class="pet-sitter-card-info-serve">
        <text>服务对象: </text>
        <view class="pet-sitter-card-info-serve-icons">
          <icon-cat v-if="data.serveCat"></icon-cat>
          <icon-dog v-if="data.serveDog"></icon-dog>
        </view>
      </view>
    </view>
    <view class="pet-sitter-card-btn">
      <button-show-detail :wechat-id="data.wechatId" :content="data.detail"
        >服务详情</button-show-detail
      >
      <button-request-wechat :wechat-id="data.wechatId"
        >获取微信</button-request-wechat
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { SEX } from '@/api/types/commonTypes';
import { TPetSitter } from '@/api/types/commonTypes';
import ButtonRequestWechat from './ButtonRequestWechat.vue';
import ButtonShowDetail from './ButtonShowDetail.vue';
import { toRefs } from 'vue';

interface IPropsPetSitterCard {
  data: TPetSitter;
}
const props = defineProps<IPropsPetSitterCard>();
const { data } = toRefs(props);
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
    gap: 20px;

    &-sitter {
      display: flex;
      gap: 10px;
      font-size: 28px;
      min-width: 0;

      &-name {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &-sex {
        display: flex;
        align-items: center;
      }
    }

    &-distance {
      flex: none;
      font-size: 24px;
    }
  }

  &-info {
    display: flex;
    justify-content: space-between;

    &-time {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 24px;
      color: var(--app-sub-title-color);
    }

    &-serve {
      flex: none;
      font-size: 24px;
      color: var(--app-sub-title-color);
      display: flex;
      align-items: center;
      gap: 20px;

      &-icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80px;
      }
    }
  }

  &-btn {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
}
</style>
