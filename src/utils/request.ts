import axios, {  AxiosResponse } from 'taro-axios';
import { useUserStore } from '@/stores/user';
import { useLocationStore } from '@/stores/location';

interface AxiosInterceptorManager<V> {
  use<T = V>(
    onFulfilled?: (value: V) => T | Promise<T>,
    onRejected?: (error: any) => any,
  ): number;
  eject(id: number): void;
  clear(): void;
}

const request = axios.create({
  baseURL: 'http://127.0.0.1:9527',
});

request.interceptors.request.use(async (config) => {
  const userStore = useUserStore();
  const locationStore = useLocationStore();
  config.params = {
    ...config.params,
    userId: userStore.userId,
    latitude: locationStore.location.latitude || undefined,
    longitude: locationStore.location.longitude || undefined,
  };
  return config;
});

(
  request.interceptors.response
    .use as AxiosInterceptorManager<AxiosResponse>['use']
)((response) => {
  return response.data;
});

export { request };
