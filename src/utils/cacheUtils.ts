/**
 * 缓存公共函数
 */

const storage = window.sessionStorage;

const cacheUtils = {
    setItem: (key: string, value: any) => storage.setItem(key, value),
    getItem: (key: string) => storage.getItem(key),
    removeItem: (key: string) => storage.removeItem(key),
    clear: () => storage.clear(),
}

export default cacheUtils;