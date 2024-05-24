<template>
  <virtual-list
    class="List"
    height="100%"
    width="100%"
    :item-data="items"
    :item-count="count"
    :item-size="props.itemHeight"
    :item="itemComponent"
    :overscan-count="20"
    @scroll-to-lower="loadMore"
  >
    <template #bottom>
      <view class="bottom" :class="listId">
        <view v-if="!isLoading && count >= total">已经到底啦!</view>
        <view v-else="isLoading">加载中……</view>
      </view>
    </template>
  </virtual-list>
</template>

<script setup lang="ts">
import VirtualListItemAdapter from './VirtualListItemAdapter.vue';
import { uuid } from '@/utils/crypto';
import { TListResponse } from '@/api/types/commonTypes';
import { getCurrentInstance } from '@tarojs/runtime';
import Taro from '@tarojs/taro';
import { computed, h, markRaw } from 'vue';
import { ComponentPublicInstance, onMounted, ref } from 'vue';

interface IProps {
  dataSetter: () => Promise<TListResponse>;
  itemComponent: ComponentPublicInstance;
  itemHeight?: number;
}
interface IItemData extends Record<string, any> {}

const props = withDefaults(defineProps<IProps>(), {
  itemHeight: 50,
});

markRaw(props.itemComponent);
const items = ref<IItemData[]>([]);
const itemComponent = h(VirtualListItemAdapter, {
  itemComponent: props.itemComponent,
});
const listId = ref(`bottom-${uuid()}`);
const isLoading = ref(false);
const total = ref(0);
const count = computed(() => items.value.length);
const loadMore = async () => {
  if (count.value >= total.value) return;
  const moreData = (await props.dataSetter()).data || [];
  items.value = [...items.value, ...moreData];
};
// 监听触底事件
Taro.createIntersectionObserver(getCurrentInstance().page!)
  .relativeToViewport({ bottom: 100 })
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
    items.value = response.data || [];
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
