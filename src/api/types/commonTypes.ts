export type TCommonResponse<T extends object = {}> = {
  data: T | null;
  code: number;
  msg: string;
};
export type TListResponse<
  Item extends Record<string, any> = Record<string, any>,
> = {
  total: number;
  data: Item[] | null;
  code: number;
  msg: string;
};
export enum SEX {
  MALE = 0,
  FEMALE = 1,
}
export type TLocation = {
  name: string;
  latitude: number;
  longitude: number;
};

export type TPetSitter = {
  id?: number;
  name: string;
  sex: SEX;
  location: TLocation;
  serveCat: boolean; // 服务猫
  serveDog: boolean; // 服务狗
  workTime: string;
  wechatId: string;
  detail: string;
  distance?: string;
  status: boolean; // true: 在线 false: 离线
};

export type TPetOrder = {
  id?: number;
  location: TLocation;
  catNum: number;
  dogNum: number;
  orderTime: string;
  tags: string[];
  wechatId: string;
  distance?: string;
};

export type TPagination = {
  offset: number;
  limit: number;
};
