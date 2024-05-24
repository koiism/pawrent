<template>
  <view class="location-selector">{{ model.name }}</view>
  <nut-button
    type="info"
    shape="circle"
    size="small"
    @click="chooseLocation"
    :style="{ width: '100%' }"
  >
    <slot></slot>
  </nut-button>
</template>

<script setup lang="ts">
import { TLocation } from '@/api/types/commonTypes';
import { useLocation } from 'taro-hooks';

const model = defineModel<TLocation>({
  required: true,
});
const [_location, { choose }] = useLocation();
const chooseLocation = async () => {
  const { latitude, longitude, name } = await choose();
  if (latitude && longitude && name) {
    model.value = {
      latitude,
      longitude,
      name,
    };
  }
};
</script>

<script lang="ts">
const locationValidator = (value: TLocation) => {
  if (value.latitude && value.longitude && value.name) {
    return true;
  }
  return false;
};
export { locationValidator };
</script>

<style lang="scss">
.location-selector {
  color: var(--app-title-color);
}
</style>
