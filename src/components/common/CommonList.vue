<template>
  <scroll-view class="common-list" :scroll-y="true">
    <view class="common-list-container" :style="{ gap: props.gap + 'rpx' }">
      <component
        v-for="(item, index) in items"
        :key="index"
        :is="props.itemComponent"
        :data="item"
      ></component>
      <view class="bottom" :class="listId">
        <view v-if="!isLoading && count >= total">已经到底啦!</view>
        <view v-else="isLoading">加载中……</view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { IListResponse } from '@/api/types/commonTypes';
import { uuid } from '@/utils/crypto';
import { Current } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import {
  ComponentPublicInstance,
  computed,
  getCurrentInstance,
  onMounted,
  ref,
} from 'vue';

interface IProps {
  dataSetter: () => Promise<IListResponse>;
  itemComponent: ComponentPublicInstance;
  gap?: number;
}
interface IItemData extends Record<string, any> {}
const props = withDefaults(defineProps<IProps>(), {
  gap: 20,
});
const items = ref<IItemData[]>([]);
const listId = ref(`bottom-${uuid()}`);
const isLoading = ref(false);
const total = ref(0);
const count = computed(() => items.value.length);
const loadMore = async () => {
  if (count.value >= total.value) return;
  const moreData = (await props.dataSetter()).data;
  items.value = [...items.value, ...moreData];
};
// 监听触底事件
Taro.createIntersectionObserver(
  (getCurrentInstance() as unknown as Current).page!
)
  .relativeToViewport({ bottom: 10 })
  .observe(`.${listId.value}`, (res) => {
    if (res.intersectionRatio) {
      loadMore();
    }
  });
const getData = async () => {
  if (isLoading.value) {
    return;
  }
  try {
    isLoading.value = true;
    const response = await props.dataSetter();
    isLoading.value = false;
    items.value = response.data;
    total.value = response.total;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// 在组件挂载后调用dataSetter获取数据
onMounted(async () => {
  getData();
});
</script>

<style lang="scss" scoped>
.common-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  &-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
}
</style>
