import { useSitterInfoStore } from '@/stores/sitterInfo';
import { IPetOrdersResponse } from './types/getPetOrders';
import { IPetSittersResponse } from './types/getPetSitters';
import { ISitterInfoResponse } from './types/getSitterInfo';
import { IUserIdParams, IUserIdResponse } from './types/getUserId';
import { request } from '@/utils/request';
import {
  IPostSitterInfoParams,
  IPostSitterInfoResponse,
} from './types/postSitterInfo';
import { useLocationStore } from '@/stores/location';
import {
  IPostPetOrderParams,
  IPostPetOrderResponse,
} from './types/postPetOrder';
import { IMyOrdersResponse } from './types/getMyOrders';
import { useUserStore } from '@/stores/user';
import { TPagination } from './types/commonTypes';

// 获取用户id
let getUserIdPromise: Promise<IUserIdResponse> | null = null;
export const getUserId = async (code: string) => {
  const params: IUserIdParams = {
    code,
  };
  if (!getUserIdPromise) {
    getUserIdPromise = request.get<IUserIdResponse, IUserIdResponse>(
      '/api/user-id',
      {
        params,
      }
    );
  }
  const response = await getUserIdPromise;
  return response;
};

// 获取代管订单列表
export const getPetOrders = async (
  pagination: TPagination = { offset: 0, limit: 20 }
) => {
  const locationStore = useLocationStore();
  await locationStore.initLocation();
  return await request.get<IPetOrdersResponse, IPetOrdersResponse>(
    '/api/pet-orders',
    { params: { ...pagination } }
  );
};

// 获取我的订单
export const getMyOrders = async (
  pagination: TPagination = { offset: 0, limit: 20 }
) => {
  const userStore = useUserStore();
  await userStore.initUserId();
  return await request.get<IMyOrdersResponse, IMyOrdersResponse>(
    '/api/my-orders',
    { params: { ...pagination } }
  );
};

// 获取代管人列表
export const getPetSitters = async (
  pagination: TPagination = { offset: 0, limit: 20 }
) => {
  const locationStore = useLocationStore();
  await locationStore.initLocation();
  return await request.get<IPetSittersResponse, IPetSittersResponse>(
    '/api/pet-sitters',
    { params: { ...pagination } }
  );
};

// 获取我的代管人信息并缓存
let getSitterInfoPromise: Promise<ISitterInfoResponse> | null = null;
export const getSitterInfo = async () => {
  const userStore = useUserStore();
  await userStore.initUserId();
  if (!getSitterInfoPromise) {
    getSitterInfoPromise = request.get<
      ISitterInfoResponse,
      ISitterInfoResponse
    >('/api/sitter-info');
  }
  const response = await getSitterInfoPromise;
  const { data } = response;
  const sitterInfoStore = useSitterInfoStore();
  sitterInfoStore.updateSitterInfo(data);
  return response;
};

// 编辑我的代管人信息
export const postSitterInfo = async (params: IPostSitterInfoParams) => {
  const userStore = useUserStore();
  await userStore.initUserId();
  const response = await request.post<
    IPostSitterInfoResponse,
    IPostSitterInfoResponse
  >('/api/sitter-info', params);
  const { data, code } = response;
  if (!code && data?.id) {
    const sitterInfoStore = useSitterInfoStore();
    const sitterInfo = {
      id: data.id,
      ...params,
    };
    sitterInfoStore.updateSitterInfo(sitterInfo);
  }
  return response;
};

// 新建或修改代管订单
export const postPetOrder = async (params: IPostPetOrderParams) => {
  const userStore = useUserStore();
  await userStore.initUserId();
  return await request.post<IPostPetOrderResponse, IPostPetOrderResponse>(
    '/api/pet-order',
    params
  );
};
