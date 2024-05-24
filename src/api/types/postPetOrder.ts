import { TCommonResponse, TPetOrder } from './commonTypes';

export interface IPostPetOrderResponse
  extends TCommonResponse<{
    id: number;
  }> {}
export interface IPostPetOrderParams extends TPetOrder {}
