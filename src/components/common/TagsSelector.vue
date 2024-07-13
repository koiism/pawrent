<template>
  <view class="tags-selector">
    <view class="tags-selector-tags" v-if="model.length > 0">
      <nut-space wrap>
        <nut-tag
          v-for="(tag, index) in model"
          type="primary"
          :key="index"
          closeable
          @close="removeTag(tag)"
        >
          {{ tag }}
        </nut-tag>
      </nut-space>
    </view>
    <view class="tags-selector-input" v-if="tagsNotFull || tagsNoLimit">
      <custom-wrapper>
        <nut-input
          v-model="tagName"
          :placeholder="`标签最多${props.tagMaxLength}字`"
          type="text"
          :max-length="props.tagMaxLength"
        />
      </custom-wrapper>
      <nut-button
        class="tags-selector-input-add"
        type="primary"
        shape="round"
        size="small"
        @click="addTag"
        :disabled="!enableAddTag"
        :style="{ flex: 'none' }"
        >添加</nut-button
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CustomWrapper } from '@tarojs/components';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    tagMaxLength?: number;
    tagMaxCount?: number;
  }>(),
  {
    tagMaxLength: 5,
    tagMaxCount: 5,
  }
);

const model = defineModel<string[]>({
  required: true,
});
const tagName = ref('');
const addTag = () => {
  model.value = Array.from(new Set(model.value).add(tagName.value));
  tagName.value = '';
};
const removeTag = (tag: string) => {
  const tags = new Set(model.value);
  tags.delete(tag);
  model.value = Array.from(tags);
};
const tagsNotFull = computed(() => {
  return model.value.length < props.tagMaxCount;
});
const tagsNoLimit = computed(() => {
  return props.tagMaxCount === -1;
});
const enableAddTag = computed(() => {
  const tagNotEmpty = tagName.value.trim().length > 0;
  return tagNotEmpty && (tagsNoLimit || tagsNotFull);
});
</script>

<style lang="scss">
.tags-selector {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &-input {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-add {
      flex: none;
    }
  }
}
</style>
