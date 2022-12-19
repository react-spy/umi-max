type openNewWindowOptions = {
  url: string;
  name?: string;
  width?: number;
  height?: number;
  otherSpecs?: Record<string, any>;
};

const windowUtils = {
  // 打开一个水平垂直居中的新窗口---若不设置宽高，则显示全屏
  openNewWindow: ({
    url,
    name = url,
    width,
    height,
    otherSpecs = {},
  }: openNewWindowOptions) => {
    const sizeSpecs =
      width && height
        ? {
            width,
            height,
            top: (window.screen.height - height) / 2,
            left: (window.screen.width - width) / 2,
          }
        : {};

    const specObj = Object.assign(
      // { location: 0, menubar: 0, toolbar: 0 },
      sizeSpecs,
      otherSpecs,
    );

    const specs = Object.keys(specObj)
      .map((key) => `${key}=${specObj[key]}`)
      .join(',');
    if (['https', 'http'].some((u) => url.includes(u))) {
      // 站外跳转
      return window.open(url, name, specs);
    }
    return window.open(`${WEB_URL_PREFIX}${url}`, name, specs); // 若在父窗口中关闭子窗口，可以通过当前对象:obj.close()
  },

  // 在子窗口中关闭当前窗口
  closeCurrentWindow: () => {
    let browserName = navigator.appName;
    if (browserName === 'Netscape') {
      window.location.href = 'about:blank';
    } else if (browserName === 'Microsoft Internet Explorer') {
      window.opener = null;
    }
    window.open('', '_self', ''); // 父窗口把自己变成“子窗口”
    window.close(); // 关闭当前窗口
  },
};

export default windowUtils;
