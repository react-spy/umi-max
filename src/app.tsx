/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-types */
// 运行时配置
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { notification, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import useAuth from '@/hooks/useAuth';
import cacheUtils from '@/utils/cacheUtils';

export const layout: RunTimeLayoutConfig = () => {
  const { currentUser = {} } = useAuth();
  return {
    title: 'umi-max',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    // logo: `${WEB_URL_PREFIX}/images/logo.png`,
    menu: {
      locale: false,
    },
    layout: 'mix',
    rightContentRender: () => {
      return (
        <Dropdown
          menu={{
            items: [{ label: '退出系统', key: '1' }],
            onClick: ({ key }: { key: string }) => {
              if (key === '1') {
                cacheUtils.clear();
              }
            },
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {currentUser.name || '测试管理员'}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      );
    },
  };
};

export const render = (oldRender: Function) => {
  console.log('打包时间：', BUILD_TIME);
  console.log('当前环境：', BUILD_ENV);
  return oldRender();
};

const codeMessage: Record<string, any> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: any) => {
  // 此处处理异常
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const requestInterceptors = (url: string, options: RequestConfig) => {
  const { token } = useAuth();
  if (token) {
    return {
      url,
      options: {
        ...options,
        headers: {
          Authorization: token,
          ...(options.headers || {}),
        },
      },
    };
  }
  return {
    url,
    options,
  };
};

const responseInterceptors = async (response: any) => {
  return response;
};

// 请求统一胚子
export const request: RequestConfig = {
  requestInterceptors: [requestInterceptors],
  // @ts-ignore
  responseInterceptors: [responseInterceptors],
  errorConfig: {
    errorHandler,
  },
};
