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
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNzc5NmRmIiBkPSJNMjAgNXY0cTAgLjQyNS0uMjg4LjcxM1QxOSAxMHQtLjcxMi0uMjg4VDE4IDlWNy40MjVsLTMuOTc1IDMuOTVxLjQ3NS43LjcyNSAxLjQ4OFQxNSAxNC41cTAgMi4zLTEuNiAzLjlUOS41IDIwdC0zLjktMS42VDQgMTQuNXQxLjYtMy45VDkuNSA5cS44MjUgMCAxLjYyNS4yMzd0MS40NzUuNzM4TDE2LjU3NSA2SDE1cS0uNDI1IDAtLjcxMi0uMjg4VDE0IDV0LjI4OC0uNzEyVDE1IDRoNHEuNDI1IDAgLjcxMy4yODhUMjAgNU05LjUgMTFxLTEuNDUgMC0yLjQ3NSAxLjAyNVQ2IDE0LjV0MS4wMjUgMi40NzVUOS41IDE4dDIuNDc1LTEuMDI1VDEzIDE0LjV0LTEuMDI1LTIuNDc1VDkuNSAxMSIvPjwvc3ZnPg==');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
