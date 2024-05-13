import { IListResponse, SEX, TLocation } from './commonTypes';

export type TPetSitter = {
  id: string;
  name: string;
  sex: SEX;
  location: TLocation;
  serveCat: boolean; // 服务猫
  serveDog: boolean; // 服务狗
  workTime: string;
  weChatId: string;
  remark: string;
  distance: string;
};

export interface IPetSittersResponse extends IListResponse<TPetSitter> {}
