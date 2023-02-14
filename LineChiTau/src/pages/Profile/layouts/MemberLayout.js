import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MemberLayout() {
  return (
    <>
      {/* 導覽列 */}
      <Sidebar />

      <div className="main">
        <div className="page1">
          <h1>會員管理區</h1>
          <hr />
          {/* Outlet相當於子頁區域呈現內容 */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default MemberLayout;
