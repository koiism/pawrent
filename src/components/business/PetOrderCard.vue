<!-- TODO: 骨架屏 -->
<template>
  <view class="pet-order-card card">
    <view class="pet-order-card-title">
      <view class="pet-order-card-title-order">
        <view class="pet-order-card-title-order-name"
          >{{ data.location.name }}
        </view>
      </view>
      <view class="pet-order-card-title-distance" v-if="data.distance"
        >距离您: {{ data.distance }} km</view
      >
    </view>
    <view class="pet-order-card-info">
      <view class="pet-order-card-info-time"
        >需求时间: {{ data.orderTime }}</view
      >
      <view class="pet-order-card-info-serve">
        <view class="pet-order-card-info-serve-pet-num">
          <icon-cat class="inline"></icon-cat>
          <text> × {{ data.catNum }}</text>
        </view>
        <view class="pet-order-card-info-serve-pet-num">
          <icon-dog class="inline"></icon-dog>
          <text> × {{ data.dogNum }}</text>
        </view>
      </view>
    </view>
    <one-line-tags :tags="data.tags"></one-line-tags>
    <view class="pet-order-card-btn" v-if="!allowEdit">
      <button-request-wechat :wechat-id="data.wechatId"
        >联系主人</button-request-wechat
      >
    </view>
    <view class="pet-order-card-btn" v-else>
      <nut-button
        type="primary"
        shape="circle"
        size="small"
        @click="emit('edit', data)"
        >编辑订单信息</nut-button
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { TPetOrder } from '@/api/types/commonTypes';
import { toRefs } from 'vue';

const emit = defineEmits(['edit']);

interface IPropsPetOrderCard {
  data: TPetOrder;
  allowEdit?: boolean;
}
const props = defineProps<IPropsPetOrderCard>();
const { data, allowEdit } = toRefs(props);
const height = 140;

defineOptions({
  height,
});
</script>

<style lang="scss">
.pet-order-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-order {
      display: flex;
      gap: 10px;
      font-size: 32px;
      min-width: 0;

      &-name {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &-distance {
      flex: none;
      font-size: 28px;
    }
  }

  &-info {
    display: flex;
    justify-content: space-between;

    &-time {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 28px;
      color: var(--app-sub-title-color);
    }

    &-serve {
      flex: none;
      display: flex;
      align-items: center;
      gap: 20px;

      &-pet-num {
        font-size: 28px;
        color: var(--app-sub-title-color);
        display: flex;
        align-items: center;
      }
    }
  }

  &-btn {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
}

.inline {
  display: inline-block;
}
</style>
