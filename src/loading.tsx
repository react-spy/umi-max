/**
 * 加载动画
 */
import { Spin } from 'antd';

const PageLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin spinning />
    </div>
  );
};
export default PageLoading;
