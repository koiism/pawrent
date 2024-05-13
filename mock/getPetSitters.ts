import { TPetSitter } from '@/api/types/getPetSitters';
import { listResponseGenerator } from './api';

export default listResponseGenerator<TPetSitter>({
  id: '1',
  name: '皮蛋萌',
  sex: 0, // 0: male, 1: female
  location: {
    name: '西青区万科紫台',
    latitude: 22.3193039,
    longitude: 114.1693611,
  },
  serveCat: true, // 服务猫
  serveDog: true, // 服务狗
  workTime: '周一到周五',
  weChatId: 'simple-doge',
  remark: '',
  distance: '1.2km',
});
