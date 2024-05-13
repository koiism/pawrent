<template>
  <view class="index-container">
    <nut-tabs v-model="currentTab" class="tabs">
      <template #titles>
        <view
          v-for="tabName in TAB_NAME"
          :key="tabName"
          class="nut-tabs__titles-item nut-tabs__titles-item-left"
          :class="{
            active: currentTab === tabName,
          }"
          @click="currentTab = tabName"
        >
          <view class="nut-tabs__titles-item__line"></view>
          <view class="nut-tabs__titles-item__text ellipsis">
            {{ tabName }}
          </view>
        </view>
        <view
          key="tabName"
          class="nut-tabs__titles-item nut-tabs__titles-item-right"
        >
          <IconFont name="order"></IconFont>
          <IconFont name="my2"></IconFont>
        </view>
      </template>
      <nut-tab-pane
        v-for="tabName in TAB_NAME"
        :title="tabName"
        :pane-key="tabName"
      >
        <component :is="TAB_CONTENT_MAP[tabName]" />
      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>

<script setup lang="ts">
import { TAB_NAME } from './constant';
import { ref } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';
import PetOrderList from './components/PetOrderList.vue';
import PetSitterList from './components/PetSitterList.vue';
const defaultTab = TAB_NAME.FIND_PET_SITTER;
const currentTab = ref(defaultTab);
const TAB_CONTENT_MAP = {
  [TAB_NAME.FIND_PET_ORDER]: PetOrderList,
  [TAB_NAME.FIND_PET_SITTER]: PetSitterList,
};
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
