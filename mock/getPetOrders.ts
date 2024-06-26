import { TPetOrder } from '@/api/types/commonTypes';
import { listResponseGenerator } from './api';

export default listResponseGenerator<TPetOrder>({
  id: 1,
  location: {
    name: '西青区万科紫台',
    latitude: 22.3193039,
    longitude: 114.1693611,
  },
  catNum: 1,
  dogNum: 2,
  orderTime: '周一到周五',
  wechatId: 'simple-doge',
  tags: ['凶人', '全程视频', '紧急'],
  distance: '1.5km',
});
