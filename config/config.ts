import { defineConfig } from '@umijs/max';
import type { IConfigFromPlugins } from '@@/core/pluginConfig';
import type { IConfig } from '@umijs/preset-umi';

type defineConfigOption = IConfig & IConfigFromPlugins;

import proxy from './proxy';
import routes from './routes';

const getDateAndTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // 从 0 开始计数的月份
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month + 1}-${day} ${hour}:${minute}:${second}`;
};

let { BUILD_ENV } = process.env;

if (!BUILD_ENV) BUILD_ENV = 'dev';

let otherConfig: Record<string, any> = {
  devtool: 'source-map',
};

const webUrlPrefix = '/yunhuitang';

const webUrlMap: Record<string, any> = {
  dev: 'http://localhost:5000',
  prod: 'http://139.224.54.218',
};

const webUrlPrefixMap: Record<string, any> = {
  dev: '',
  prod: webUrlPrefix,
};

if (typeof BUILD_ENV === 'string' && BUILD_ENV === 'prod') {
  otherConfig = {
    base: `${webUrlPrefix}/`,
    publicPath: `${webUrlPrefix}/`,
    favicons: [`${webUrlPrefix}/favicon.ico`],
  };
}

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  request: {},
  initialState: {},
  layout: {},
  // @ts-ignore
  proxy: proxy[BUILD_ENV || 'dev'],
  routes,
  hash: true,
  define: {
    WEB_URL: webUrlMap[BUILD_ENV] || webUrlMap.dev,
    WEB_URL_PREFIX: webUrlPrefixMap[BUILD_ENV] || webUrlPrefixMap.dev,
    BUILD_ENV,
    BUILD_TIME: getDateAndTime(),
  },
  ...otherConfig,
} as defineConfigOption);
