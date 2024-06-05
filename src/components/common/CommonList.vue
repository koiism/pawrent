<template>
  <scroll-view class="common-list" :scroll-y="true" @scroll-to-lower="loadMore">
    <slot name="header"></slot>
    <view class="common-list-container">
      <view v-for="(item, index) in items" :key="index">
        <slot :data="item" :attr="$attrs" />
      </view>
      <view class="bottom" :class="listId">
        <view v-if="!isLoading && count >= total">已经到底啦!</view>
        <view v-else="isLoading">加载中……</view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { TListResponse } from '@/api/types/commonTypes';
import { uuid } from '@/utils/crypto';
import { Current } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import { watch } from 'vue';
import { computed, getCurrentInstance, onMounted, ref } from 'vue';

interface IProps {
  dataSetter: (offset: number) => Promise<TListResponse>;
  attrOverwrite?: Record<string, any>;
  gap?: number;
}
interface IItemData extends Record<string, any> {}
const props = withDefaults(defineProps<IProps>(), {
  gap: 20,
});
const items = defineModel<IItemData[]>({
  default: () => [],
});

watch(items, () => {
  console.log(`items`, items);
});
const listId = ref(`bottom-${uuid()}`);
const isLoading = ref(false);
const total = ref(0);
const count = computed(() => items.value.length);
const loadMore = async () => {
  if (count.value >= total.value) return;
  const moreData = (await props.dataSetter(count.value)).data || [];
  items.value = [...items.value, ...moreData];
};
const listenLoadMore = () => {
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
};
const getData = async () => {
  if (isLoading.value) {
    return;
  }
  try {
    isLoading.value = true;
    const response = await props.dataSetter(0);
    isLoading.value = false;
    items.value = response.data || [];
    total.value = response.total;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// 在组件挂载后调用dataSetter获取数据
onMounted(() => {
  getData();
  listenLoadMore();
});
const gap = computed(() => `${props.gap}rpx`);
</script>

<style lang="scss">
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
    margin-top: v-bind(gap);
    gap: v-bind(gap);
  }

  .bottom {
    font-size: 24px;
    color: var(--app-sub-title-color);
    text-align: center;
  }
}
</style>
