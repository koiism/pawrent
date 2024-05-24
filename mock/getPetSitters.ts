import { TPetSitter } from '@/api/types/commonTypes';
import { listResponseGenerator } from './api';

export default listResponseGenerator<TPetSitter>({
  id: 1,
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
  wechatId: 'simple-doge',
  detail: `打包体积
默认而言使用生产模式打包，Taro 就会给你优化打包体积。但值得注意，Taro 默认的打包配置是为了让多数项目和需求都可以运行，而不是针对任何项目的最优选择。因此你可以在 Taro 配置的基础之上再针对自己的项目进行优化。

JavaScript
在 Taro 应用中，所有 Java(Type)Script 都是通过 babel.config.js 配置的，具体来说是使用 babel-prest-taro 这个 Babel 插件编译的。

默认而言 Taro 会兼容所有 @babel/preset-env 支持的语法，并兼容到 iOS 9 和 Android 5，如果你不需要那么高的兼容性，或者不需要某些 ES2015+ 语法支持，可以自行配置 babel.config.js 达到缩小打包体积效果。`,
  distance: '1.2km',
});
