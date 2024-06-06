<template>
  <root-portal :enable="true">
    <nut-popup
      v-model:visible="visible"
      position="bottom"
      round
      pop-class="popup-sitter-form root"
    >
      <view class="popup-sitter-form-layout">
        <nut-form
          class="popup-sitter-form-content"
          :model-value="formData"
          ref="formRef"
          star-position="right"
          :rules="formRules"
        >
          <nut-form-item label="是否接单" prop="status">
            <template #label>
              <view class="popup-sitter-form-content-label">是否接单</view>
            </template>
            <custom-wrapper>
              <nut-switch v-model="formData.status" />
            </custom-wrapper>
          </nut-form-item>
          <nut-form-item label="姓名" prop="name" required>
            <custom-wrapper>
              <nut-input
                v-model="formData.name"
                placeholder="请输入姓名"
                type="text"
              />
            </custom-wrapper>
          </nut-form-item>
          <nut-form-item label="微信id" prop="wechatId" required>
            <custom-wrapper>
              <nut-input
                v-model="formData.wechatId"
                placeholder="请确认可以通过它联系到你"
                type="text"
              />
            </custom-wrapper>
          </nut-form-item>
          <nut-form-item label="位置" prop="location" required>
            <location-selector v-model="formData.location">
              选择常驻位置
            </location-selector>
          </nut-form-item>
          <nut-form-item label="性别" prop="sex">
            <nut-radio-group v-model="formData.sex" direction="horizontal">
              <nut-radio :label="SEX.FEMALE" :style="{ gap: '10rpx' }">
                <icon-female></icon-female>
              </nut-radio>
              <nut-radio :label="SEX.MALE" :style="{ gap: '10rpx' }">
                <icon-male></icon-male>
              </nut-radio>
            </nut-radio-group>
          </nut-form-item>
          <nut-form-item label="服务对象" prop="serveDog" required>
            <nut-checkbox v-model="formData.serveCat" shape="button">
              <icon-cat size="36"></icon-cat>
            </nut-checkbox>
            <nut-checkbox v-model="formData.serveDog" shape="button">
              <icon-dog size="36"></icon-dog>
            </nut-checkbox>
          </nut-form-item>
          <nut-form-item label="服务时间" prop="workTime" required>
            <custom-wrapper>
              <nut-input
                v-model="formData.workTime"
                placeholder="请输入你可以接单的时间"
                type="text"
              />
            </custom-wrapper>
          </nut-form-item>
          <nut-form-item label="备注" prop="detail" required>
            <custom-wrapper>
              <nut-textarea
                limit-show
                :max-length="500"
                v-model="formData.detail"
                placeholder="请明确表述服务细节，包括收费标准、注意事项等"
                type="text"
              />
            </custom-wrapper>
          </nut-form-item>
        </nut-form>
        <view class="popup-sitter-form-buttons">
          <nut-button
            type="info"
            shape="circle"
            size="small"
            @click="visible = false"
            >取消</nut-button
          >
          <nut-button type="primary" shape="circle" size="small" @click="submit"
            >确定</nut-button
          >
        </view>
      </view>
    </nut-popup>
  </root-portal>
</template>

<script setup lang="ts">
import { postSitterInfo } from '@/api/index';
import { SEX } from '@/api/types/commonTypes';
import { IPostSitterInfoParams } from '@/api/types/postSitterInfo';
import { useLocationStore } from '@/stores/location';
import { useSitterInfoStore } from '@/stores/sitterInfo';
import { CustomWrapper } from '@tarojs/components';
import { storeToRefs } from 'pinia';
import { Form as NutForm } from '@nutui/nutui-taro';
import { watch, ref } from 'vue';
import { locationValidator } from '../common/LocationSelector.vue';

const sitterInfoStore = useSitterInfoStore();
const { sitterInfo } = storeToRefs(sitterInfoStore);

const visible = defineModel<boolean>('visible');
const formRef = ref<InstanceType<typeof NutForm> | null>(null);
const locationStore = useLocationStore();
const { location } = storeToRefs(locationStore);
const formData = ref<IPostSitterInfoParams>(
  sitterInfoStore.sitterInfo ?? {
    name: '',
    sex: SEX.FEMALE,
    location: {
      name: '',
      latitude: location.value.latitude,
      longitude: location.value.longitude,
    },
    serveCat: true,
    serveDog: true,
    workTime: '',
    wechatId: '',
    detail: '',
    status: true,
  }
);
const serveDogValidator = (value: boolean) => {
  if (!value && !formData.value.serveCat) {
    return false;
  }
  return true;
};
const formRules = ref({
  name: [{ required: true, message: '请输入姓名' }],
  wechatId: [{ required: true, message: '请输入微信id' }],
  location: [{ message: '请选择常驻位置', validator: locationValidator }],
  serveDog: [
    { message: '请至少选择一个服务对象', validator: serveDogValidator },
  ],
  workTime: [{ required: true, message: '请输入服务时间' }],
  detail: [{ required: true, message: '请输入备注' }],
});
watch(sitterInfo, () => {
  if (sitterInfo.value) {
    formData.value = Object.assign({}, sitterInfoStore.sitterInfo);
  }
});

const submit = () => {
  formRef.value?.validate().then(async ({ valid, errors }) => {
    if (valid) {
      const result = await postSitterInfo(formData.value);
      if (result?.data?.id) {
        visible.value = false;
      }
    } else {
      console.warn('error:', errors);
    }
  });
};
</script>

<style lang="scss">
.popup-sitter-form {
  height: 80%;
  padding: 60px 40px;
  box-sizing: border-box;
  &-layout {
    height: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
  }
  &-content {
    flex: 1;
    overflow-y: auto;
    margin: 0 -20px;
    padding: 0 20px;
    &-label {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  &-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
}
</style>
