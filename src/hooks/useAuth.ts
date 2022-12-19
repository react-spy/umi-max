/**
 * 权限相关Hook
 */
import cacheUtils from '@/utils/cacheUtils';

type UserAuth = {
  isLogin: boolean;
  currentUser: Record<string, any>;
  token: string;
};

const useAuth = () => {
  let isLogin = false;
  let currentUser = {};
  let token = '';

  try {
    const curUserStr = cacheUtils.getItem('WEB_CURRENT_USER');
    if (curUserStr && typeof curUserStr === 'string') {
      const curUser = JSON.parse(curUserStr);
      if (curUser.token) {
        isLogin = true;
        currentUser = curUser;
        token = curUser.token;
      }
    }
  } catch (error) {
    console.error('用户获取失败', error);
  }
  return {
    isLogin,
    currentUser,
    token,
  } as UserAuth;
};
export default useAuth;
