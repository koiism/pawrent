<template>
  <component
    :is="props.itemComponent"
    :data="props.data?.[index]"
    :id="props.id"
    :index="props.index"
  ></component>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from 'vue';

interface IPropsListItemAdapter {
  data?: any[];
  id?: string;
  index?: number;
  itemComponent: ComponentPublicInstance;
}
const props = withDefaults(defineProps<IPropsListItemAdapter>(), {
  index: 0,
});
</script>

<style></style>
