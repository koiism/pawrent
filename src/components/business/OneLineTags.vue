<template>
  <nut-space class="pet-order-card-tag" wrap>
    <nut-tag v-for="(tag, index) in props.tags" type="primary" :key="index">
      {{ tag }}
    </nut-tag>
  </nut-space>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ tags: string[] }>(), {
  tags: () => [],
});
</script>

<style lang="scss">
.pet-order-card-tag {
  max-height: 52px;
  overflow: hidden;
}
</style>
