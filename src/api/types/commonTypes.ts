export type IListResponse<
  Item extends Record<string, any> = Record<string, any>
> = {
  total: number;
  data: Item[];
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
