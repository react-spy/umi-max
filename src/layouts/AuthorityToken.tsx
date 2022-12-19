/**
 * 权限认证
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Navigate, Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';
import useAuth from '@/hooks/useAuth';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

export default () => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return (
      <ConfigProvider locale={zhCN}>
        <Outlet />
      </ConfigProvider>
    );
  }
  return <Outlet />;
  //   return <Navigate to="/user/login" />;
};
