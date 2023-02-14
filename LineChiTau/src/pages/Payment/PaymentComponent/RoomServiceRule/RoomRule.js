import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
} from 'react-router-dom';

import ProductImg from '../../../Hotel/img/banner.svg';

const RoomRule = (props) => {
  const rule =  [
    '現在免付任何費用，您將於入住時付款',
    '入住二周前，可免費取消',
    '入住當日 上午12:00起，收取入住費用',
  ]
  return (
    <>
      {/* <!-- NOTE  訂房規則--> */}
      <div className="order-rule  pt-2 px-3">
        <h5>訂前必讀</h5>
        <ul className="ps-5 row gy-2">
          {rule.map((rule, index) => (
            <li>{rule}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RoomRule;
