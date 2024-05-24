import Taro from '@tarojs/taro';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getUserId } from '@/api/index';
import { useStorage } from 'taro-hooks';

export const useUserStore = defineStore('user', () => {
  const [_storage, { set }] = useStorage();

  const userId = ref<number>(Number(Taro.getStorageSync('userId')) || 0);

  const isLogin = computed(() => {
    return !!userId.value;
  });

  const setUserId = (id: number) => {
    userId.value = id;
    set('userId', id);
  };

  const initUserId = async () => {
    const code = (await Taro.login()).code;
    const { id: userId = 0 } = (await getUserId(code)).data ?? {};
    setUserId(userId);
  };

  return {
    userId,
    isLogin,
    initUserId,
  };
});
