import { createApp } from 'vue';
import './app.scss';
import '@nutui/nutui-taro/dist/packages/cellgroup/index.scss'
import { Tabs, TabPane, Tag } from '@nutui/nutui-taro';
import registerVirtualList from '@tarojs/components-advanced/dist/components/virtual-list';
import { createPinia } from 'pinia';
import { useUserStore } from './stores/user';
import { useLocationStore } from './stores/location';

const pinia = createPinia();

const App = createApp({
  onShow(_options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  onLaunch(_options) {
    const { initUserId } = useUserStore();
    initUserId();
    const { initLocation } = useLocationStore();
    initLocation();
  },
});

[pinia, Tabs, TabPane, Tag, registerVirtualList].forEach((component) => {
  // @ts-ignore
  App.use(component);
});
export default App;
