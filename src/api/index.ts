import Taro from '@tarojs/taro';
import { IPetOrdersResponse } from './types/getPetOrders';
import { IPetSittersResponse } from './types/getPetSitters';

export const baseUrl: string = 'http://127.0.0.1:9527';

export const getPetOrders = async () => {
  return await Taro.request<IPetOrdersResponse>({
    url: `${baseUrl}/api/pet-orders`,
  });
};

export const getPetSitters = async () => {
  return await Taro.request<IPetSittersResponse>({
    url: `${baseUrl}/api/pet-sitters`,
  });
};
