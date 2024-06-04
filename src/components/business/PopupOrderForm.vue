<template>
  <nut-popup
    v-model:visible="visible"
    position="bottom"
    round
    pop-class="popup-order-form"
  >
    <view class="popup-order-form-layout">
      <nut-form
        class="popup-order-form-content"
        :model-value="formData"
        ref="formRef"
        star-position="right"
        :rules="formRules"
      >
        <nut-form-item label="位置" prop="location" required>
          <location-selector v-model="formData.location">
            选择宠物位置
          </location-selector>
        </nut-form-item>
        <nut-form-item label="猫的数量" prop="catNum">
          <nut-input-number
            v-model.number="formData.catNum"
            :min="0"
            :max="9"
          />
        </nut-form-item>
        <nut-form-item label="狗的数量" prop="dogNum">
          <nut-input-number
            v-model.number="formData.dogNum"
            :min="0"
            :max="9"
          />
        </nut-form-item>
        <nut-form-item label="代管时间" prop="orderTime" required>
          <custom-wrapper>
            <nut-input
              v-model="formData.orderTime"
              placeholder="请输入需要代管的时间"
              type="text"
            />
          </custom-wrapper>
        </nut-form-item>
        <nut-form-item label="标签" prop="tags">
          <tags-selector v-model="formData.tags" />
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
      </nut-form>
      <view class="popup-order-form-buttons">
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
</template>

<script setup lang="ts">
import { postPetOrder } from '@/api/index';
import { TPetOrder } from '@/api/types/commonTypes';
import { useLocationStore } from '@/stores/location';
import { Form as NutForm } from '@nutui/nutui-taro';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { locationValidator } from '../common/LocationSelector.vue';
import { effect } from 'vue';

const visible = defineModel<boolean>('visible', {
  required: true,
});
const data = defineModel<TPetOrder>('data', {
  required: false,
});
const formRef = ref<InstanceType<typeof NutForm> | null>(null);
const locationStore = useLocationStore();
const { location } = storeToRefs(locationStore);
const formData = ref<TPetOrder>(
  data.value ?? {
    location: {
      name: '',
      latitude: location.value.latitude,
      longitude: location.value.longitude,
    },
    catNum: 0,
    dogNum: 0,
    orderTime: '',
    tags: [],
    wechatId: '',
  }
);
effect(() => {
  formData.value = data.value ?? formData.value;
});
const petNumValidator = () => {
  if (!formData.value.dogNum && !formData.value.catNum) {
    return false;
  }
  return true;
};
const formRules = ref({
  location: [{ message: '请选择宠物位置', validator: locationValidator }],
  catNum: [{ message: '至少选择一个宠物', validator: petNumValidator }],
  dogNum: [{ message: '至少选择一个宠物', validator: petNumValidator }],
  orderTime: [{ required: true, message: '请输入代管时间' }],
  wechatId: [{ required: true, message: '请输入微信id' }],
});

const emit = defineEmits<{
  completeEdit: [id: number, data: TPetOrder];
}>();

const submit = () => {
  formRef.value?.validate().then(async ({ valid, errors }) => {
    if (valid) {
      const result = await postPetOrder(formData.value);
      if (result?.data?.id) {
        visible.value = false;
        emit('completeEdit', result.data.id, formData.value);
      }
    } else {
      console.error('error:', errors);
    }
  });
};
</script>

<style lang="scss">
.popup-order-form {
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
  }
  &-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
}
</style>
