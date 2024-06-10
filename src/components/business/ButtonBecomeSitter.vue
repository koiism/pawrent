<template>
  <view>
    <view class="button-become-sitter card" :style="{ height: height + 'px' }">
      <view class="button-become-sitter-overlay" @click="showSitterForm">
        <view class="button-become-sitter-overlay-content">{{
          sitterInfo ? '编辑代管人信息' : '成为代管人'
        }}</view>
      </view>
      <popup-sitter-form
        v-model:visible="sitterFormVisible"
      ></popup-sitter-form>
      <template v-if="sitterInfo">
        <view class="button-become-sitter-title">
          <view class="button-become-sitter-title-sitter">
            <view class="button-become-sitter-title-sitter-name"
              >{{ sitterInfo?.name ?? '用户名' }}
            </view>
            <view class="button-become-sitter-title-sitter-sex">
              <icon-male v-if="sitterInfo?.sex === SEX.MALE"></icon-male>
              <icon-female v-else="data.sex === SEX.FEMALE"></icon-female>
            </view>
          </view>
        </view>
        <view class="button-become-sitter-info">
          <view class="button-become-sitter-info-time"
            >接单时间: {{ sitterInfo?.workTime ?? '暂无' }}</view
          >
          <view class="button-become-sitter-info-serve">
            <text>服务对象: </text>
            <view class="button-become-sitter-info-serve-icons">
              <icon-cat v-if="sitterInfo?.serveCat ?? true"></icon-cat>
              <icon-dog v-if="sitterInfo?.serveDog ?? true"></icon-dog>
            </view>
          </view>
        </view>
        <view class="button-become-sitter-btn">
          <button-show-detail
            disabled
            :wechat-id="sitterInfo?.wechatId"
            :content="sitterInfo?.detail"
            >服务详情</button-show-detail
          >
          <button-request-wechat disabled :wechat-id="sitterInfo?.wechatId"
            >获取微信</button-request-wechat
          >
        </view>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { SEX } from '@/api/types/commonTypes';
import ButtonRequestWechat from './ButtonRequestWechat.vue';
import ButtonShowDetail from './ButtonShowDetail.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { getSitterInfo } from '@/api/index';
import { useSitterInfoStore } from '@/stores/sitterInfo';

const sitterFormVisible = ref(false);
const showSitterForm = () => {
  sitterFormVisible.value = true;
};

const height = 100;

defineOptions({
  height,
});

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);
watch(
  isLogin,
  () => {
    if (isLogin.value) {
      getSitterInfo();
    }
  },
  {
    immediate: true,
  }
);

const sitterInfoStore = useSitterInfoStore();
const { sitterInfo } = storeToRefs(sitterInfoStore);
</script>

<style lang="scss">
.button-become-sitter {
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

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-sitter {
      display: flex;
      gap: 10px;
      font-size: 32px;

      &-name {
        font-weight: bold;
      }

      &-sex {
        display: flex;
        align-items: center;
      }
    }

    &-distance {
      font-size: 28px;
    }
  }

  &-info {
    display: flex;
    justify-content: space-between;

    &-time {
      font-size: 28px;
      color: var(--app-sub-title-color);
    }

    &-serve {
      font-size: 28px;
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

    .nut-button {
      flex: 1;
    }
  }
}
</style>
