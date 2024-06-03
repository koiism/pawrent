
<template>
  <view
    class="icon"
    :style="{
      width: props.size + 'rpx',
      height: props.size + 'rpx',
      display: props.inline ? 'inline-block' : 'block',
      verticalAlign: props.inline ? 'middle' : 'top',
    }"
  />
</template>

<script lang="ts" setup>
interface IProps {
  size?: number;
  inline?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  size: 28,
});
</script>

<style lang="scss" scoped>
.icon {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgc3Ryb2tlPSIjMWMxNDBkIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIHN0cm9rZT0iIzFjMTQwZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTEwLjEyNSA4Ljg3NWExLjg3NSAxLjg3NSAwIDEgMSAyLjgyOCAxLjYxNWMtLjQ3NS4yODEtLjk1My43MDgtLjk1MyAxLjI2VjEzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxNiIgcj0iMSIgZmlsbD0iIzFjMTQwZCIvPjwvZz48L3N2Zz4=');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
