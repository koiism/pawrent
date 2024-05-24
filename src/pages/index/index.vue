<template>
  <view class="index-container">
    <nut-tabs v-model="selectedTab" class="tabs" :animated-time="0">
      <template #titles>
        <view
          v-for="tab in TAB_NAME"
          :key="tab"
          :class="[
            'nut-tabs__titles-item',
            'nut-tabs__titles-item-left',
            { active: selectedTab === tab },
          ]"
          @click="selectTab(tab)"
        >
          <view class="nut-tabs__titles-item__line"></view>
          <view class="nut-tabs__titles-item__text ellipsis">{{ tab }}</view>
        </view>
        <view class="nut-tabs__titles-item nut-tabs__titles-item-right">
          <icon-user @click="openPersonalCenter" :size="36"></icon-user>
        </view>
      </template>
      <nut-tab-pane
        v-for="tab in TAB_NAME"
        :key="tab"
        :title="tab"
        :pane-key="tab"
      >
        <component :is="tabComponents[tab]" />
      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PetOrderPane from './components/PetOrderPane.vue';
import PetSitterPane from './components/PetSitterPane.vue';
import { useLaunchOptions } from 'taro-hooks';
import { useShareAppMessage } from '@tarojs/taro';
import { DEFAULT_TAB, TAB_NAME } from './constant';
import { openPersonalCenter } from '@/utils/router';

const launchOptions = useLaunchOptions();
const selectedTab = ref(launchOptions.query.tab || DEFAULT_TAB);
const tabComponents = computed(() => ({
  [TAB_NAME.FIND_PET_ORDER]: PetOrderPane,
  [TAB_NAME.FIND_PET_SITTER]: PetSitterPane,
}));

function selectTab(tab: string) {
  selectedTab.value = tab;
}

// 构建分享链接卡片
useShareAppMessage((_res) => ({
  title: 'Pawrent',
  path: `/pages/index?tab=${selectedTab.value}`,
}));
</script>

<style lang="scss">
.nut-tabs__titles.normal .nut-tabs__titles-item {
  padding: 0 20px;
}

.nut-tabs__titles.normal .nut-tabs__titles-item.nut-tabs__titles-item-right {
  justify-content: flex-end;
}

.nut-tabs__content {
  flex: 1;
  max-height: calc(100vh - 92rpx);
}

.index-container {
  height: 100vh;
}

.tabs {
  height: 100%;
}
</style>
