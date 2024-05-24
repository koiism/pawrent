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
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjMWMxNDBkIiBkPSJNMTYgOGE1IDUgMCAxIDAgNSA1YTUgNSAwIDAgMC01LTVabTAgOGEzIDMgMCAxIDEgMy0zYTMuMDAzIDMuMDAzIDAgMCAxLTMgM1oiLz48cGF0aCBmaWxsPSIjMWMxNDBkIiBkPSJNMTYgMmExNCAxNCAwIDEgMCAxNCAxNEExNC4wMTYgMTQuMDE2IDAgMCAwIDE2IDJabS02IDI0LjM3N1YyNWEzLjAwMyAzLjAwMyAwIDAgMSAzLTNoNmEzLjAwMyAzLjAwMyAwIDAgMSAzIDN2MS4zNzdhMTEuODk5IDExLjg5OSAwIDAgMS0xMiAwWm0xMy45OTItMS40NTFBNS4wMDIgNS4wMDIgMCAwIDAgMTkgMjBoLTZhNS4wMDIgNS4wMDIgMCAwIDAtNC45OTIgNC45MjZhMTIgMTIgMCAxIDEgMTUuOTg1IDBaIi8+PC9zdmc+');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
