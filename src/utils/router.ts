import Taro from '@tarojs/taro';

const openPersonalCenter = () => {
  Taro.navigateTo({
    url: '/pages/personalCenter/index',
  });
};
const openMyOrders = () => {
  Taro.navigateTo({
    url: '/pages/myOrders/index',
  });
};

export { openPersonalCenter, openMyOrders };
