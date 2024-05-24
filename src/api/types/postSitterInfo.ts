import { TCommonResponse, TPetSitter } from './commonTypes';

export interface IPostSitterInfoResponse
  extends TCommonResponse<{
    id: number;
  }> {}
export interface IPostSitterInfoParams extends TPetSitter {}
