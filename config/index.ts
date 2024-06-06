import Components from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/auto-import-resolver';
import path from 'path';

const config = {
  projectName: 'pawrent-v',
  date: '2024-5-8',
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375;
    }
    return 750;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/stores': path.resolve(__dirname, '..', 'src/stores'),
    '@/mock': path.resolve(__dirname, '..', 'mock'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
  },
  plugins: [
    '@tarojs/plugin-html',
    '@tarojs/plugin-mock',
    '@tarojs/plugin-vue-devtools',
    '@taro-hooks/plugin-vue',
  ],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false },
  },
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    hot: true,
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(
        Components({
          resolvers: [
            NutUIResolver({
              importStyle: 'sass',
              taro: true,
            }),
          ],
        })
      );
      // loader有bug，需要修改本地文件：https://github.com/stellaround/convert-vue-scoped/issues/1
      chain.module
        .rule('vueFiles')
        .test(/\.vue$/)
        .include.add(path.resolve(__dirname, '../src/components/icons')) // 要修改的vue文件范围
        .end()
        .use('@stellaround/convert-vue-scoped')
        .loader('@stellaround/convert-vue-scoped');
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    webpackChain(chain) {
      chain.plugin('unplugin-vue-components').use(
        Components({
          resolvers: [
            NutUIResolver({
              importStyle: 'sass',
              taro: true,
            }),
          ],
        })
      );
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
