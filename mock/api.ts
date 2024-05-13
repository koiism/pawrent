import getPetSitters from './getPetSitters';
import getPetOrders from './getPetOrders';
import { IListResponse } from '@/api/types/commonTypes';

export function listResponseGenerator<T extends Record<string, any>>(
  item: T
): IListResponse<T> {
  return {
    total: 100,
    data: (Array.from({ length: 20 }).fill(item) as T[]).map((item, index) => {
      return {
        ...item,
        id: index,
      };
    }) as T[],
  };
}

export default {
  'GET /api/pet-sitters': getPetSitters,
  'GET /api/pet-orders': getPetOrders,
};
