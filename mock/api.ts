import getPetSitters from './getPetSitters';
import getPetOrders from './getPetOrders';
import getUserId from './getUserId';
import getSitterInfo from './getSitterInfo';
import postSitterInfo from './postSitterInfo';
import postPetOrder from './postPetOrder';
import { TListResponse } from '@/api/types/commonTypes';
import getMyOrders from './getMyOrders';

export function listResponseGenerator<T extends Record<string, any>>(
  item: T
): TListResponse<T> {
  return {
    total: 100,
    data: (Array.from({ length: 20 }).fill(item) as T[]).map((item, index) => {
      return {
        ...item,
        id: index,
      };
    }) as T[],
    code: 0,
    msg: '',
  };
}

export default {
  'GET /api/pet-sitters': getPetSitters,
  'GET /api/pet-orders': getPetOrders,
  'GET /api/user-id': getUserId,
  'GET /api/sitter-info': getSitterInfo,
  'GET /api/my-orders': getMyOrders,
  'POST /api/sitter-info': postSitterInfo,
  'POST /api/pet-order': postPetOrder,
};
