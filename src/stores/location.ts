import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useLocation } from 'taro-hooks';

export const useLocationStore = defineStore('location', () => {
  const location = ref<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });

  const isLocated = computed(() => {
    return !!location.value.latitude && !!location.value.longitude;
  });

  const initLocation = async () => {
    const [_location, { get }] = useLocation();
    const { latitude, longitude } = await get();
    location.value = {
      latitude,
      longitude,
    };
  };

  return {
    location,
    isLocated,
    initLocation,
  };
});
