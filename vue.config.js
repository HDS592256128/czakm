const
  path = require('path'),
  glob = require('glob'),
  pages = {},
  webpack = require('webpack');

// 多页应用每个页面入口js必须命名为main.js

glob.sync('./src/pages/**/main.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/main.js')[0];

  pages[chunk] = {
    'entry': 'src/pages/' + chunk + '/main.js',
    'template': 'public/index.html',
    'filename': chunk + '.html',
    'chunks': ['chunk-vendors', 'chunk-common', chunk]
  };
});
const proxy = {};

proxy[process.env.BASE_URL] = {
  'target': process.env.VUE_APP_SERVER_API,
  'secure': false,
  'ws': false,
  'changeOrigin': true
};

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  'productionSourceMap': false,
  'publicPath': process.env.BASE_URL,
  'lintOnSave': false,

  // 配置源码映射
  'configureWebpack': config => {
    config.plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }));
    if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_SOURCE_MAP === 'true') {
      config.devtool = 'source-map';
    }
    
  },
  'chainWebpack': config => {
    config.entry('index').add('babel-polyfill');
    config.resolve.alias.set('@', resolve('src'));
    config.resolve.alias.set('@comp', resolve('src/components'));
    Object.keys(pages).forEach(entryName => {
      config.resolve.alias.set('@' + entryName, resolve('src/pages/' + entryName));
    });
    // 音频
    config
      .module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          audio: 'src',
        };
        return options;
      });
  },


  'devServer': {
    proxy
  },

  // 全局css
  'css': {
    'loaderOptions': {
      'sass': {
        'data': '@import "@/assets/styles/_variable.scss";'
      },
      'less': {
        'javascriptEnabled': true
      }
    }
  },
  pages
};
