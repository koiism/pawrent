import { TCommonResponse } from './commonTypes';

export interface IUserIdResponse
  extends TCommonResponse<{
    id: number;
  }> {}
export interface IUserIdParams {
  code: string;
}
