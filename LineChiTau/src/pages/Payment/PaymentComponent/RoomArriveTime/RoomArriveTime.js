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

const RoomArriveTime = (props) => {
  

  return (
    <>
     <div className="arrive-time col-12 p-0">
            <div className="px-5 py-4">
              <h4 className="title mb-3">您的抵達時間</h4>
              <ul className="row gy-2 ps-5">
                <li>您的客房將會在 15:00 開放辦理入住</li>
                <li>
                  24 小時接待櫃檯－在您有需要的時候，隨時都能為您提供服務！
                </li>
              </ul>
              <div className="arrive-time-point ">
                <h5 className="py-3">請輸入您的抵達時間(可選填)</h5>
                <select className="form-control w-25 text-right">
                  <option value="1">1:00</option>
                  <option value="2">2:00</option>
                  <option value="3">3:00</option>
                  <option value="4">4:00</option>
                  <option value="5">5:00</option>
                  <option value="6">6:00</option>
                  <option value="12">12:00</option>
                  <option value="13">13:00</option>
                  <option value="14">14:00</option>
                  <option value="15">15:00</option>
                  <option value="16">16:00</option>
                  <option value="17">17:00</option>
                  <option value="18">18:00</option>
                  <option value="19">19:00</option>
                </select>
              </div>
            </div>
          </div>
    </>
  );
};

export default RoomArriveTime;
