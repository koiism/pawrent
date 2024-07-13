<template>
  <nut-button
    type="info"
    size="small"
    shape="circle"
    @click="dialogShown = true"
    :="$attrs"
  >
    <slot></slot>
  </nut-button>
  <root-portal>
    <nut-dialog
      custom-class="root"
      :title="props.title"
      :content="props.content"
      :visible="dialogShown"
      text-align="left"
      close-on-click-overlay
    >
      <template #footer>
        <nut-button
          type="primary"
          shape="circle"
          size="small"
          plain
          @click="closeDialog"
        >
          取消
        </nut-button>
        <button-request-wechat @click="closeDialog" :wechat-id="props.wechatId"
          >获取微信</button-request-wechat
        >
      </template>
    </nut-dialog>
  </root-portal>
</template>

<script setup lang="ts">
import { VNode } from 'vue';
import { ref } from 'vue';
interface IProps {
  content: string | VNode;
  wechatId: string;
  title?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  content: '',
  wechatId: '',
  title: '',
});

const dialogShown = ref(false);
const closeDialog = () => {
  dialogShown.value = false;
};
</script>

<style></style>
