import { IListResponse, TLocation } from './commonTypes';

export type TPetOrder = {
  id: string;
  location: TLocation;
  catNum: number;
  dogNum: number;
  orderTime: string;
  tags: string[];
  weChatId: string;
  distance: string;
};

export interface IPetOrdersResponse extends IListResponse<TPetOrder> {}
