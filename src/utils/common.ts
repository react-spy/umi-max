/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 公共函数
 */

// 判断是否为手机设备
export const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

// 获取url参数
export const getPageQuery = (webUrl: string = window.location.href) => {
  const url = new URL(webUrl);
  const urlParams: Record<string, any> = {};
  for (const [key, value] of url.searchParams.entries()) {
    Object.assign(urlParams, { [key]: value });
  }
  return urlParams;
};

export const getImagePath = (img: string) => {
  return `${WEB_URL_PREFIX}/images/${img}`;
};
