<template>
  <view
    class="icon"
    :style="{
      width: props.size + 'rpx',
      height: props.size + 'rpx',
    }"
  />
</template>

<script lang="ts" setup>
interface IProps {
  size?: number;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 28,
});
</script>

<style lang="scss" scoped>
.icon {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZGY3N2I5IiBkPSJNMTEgMTloLTFxLS40MjUgMC0uNzEyLS4yODhUOSAxOHQuMjg4LS43MTJUMTAgMTdoMXYtMi4xcS0xLjk3NS0uMzUtMy4yMzgtMS44ODhUNi41IDkuNDVxMC0yLjI3NSAxLjYxMy0zLjg2MlQxMiA0dDMuODg4IDEuNTg4VDE3LjUgOS40NXEwIDIuMDI1LTEuMjYzIDMuNTYzVDEzIDE0LjlWMTdoMXEuNDI1IDAgLjcxMy4yODhUMTUgMTh0LS4yODguNzEzVDE0IDE5aC0xdjFxMCAuNDI1LS4yODguNzEzVDEyIDIxdC0uNzEyLS4yODhUMTEgMjB6bTEtNnExLjQ1IDAgMi40NzUtMS4wMjVUMTUuNSA5LjV0LTEuMDI1LTIuNDc1VDEyIDZUOS41MjUgNy4wMjVUOC41IDkuNXQxLjAyNSAyLjQ3NVQxMiAxMyIvPjwvc3ZnPg==');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
