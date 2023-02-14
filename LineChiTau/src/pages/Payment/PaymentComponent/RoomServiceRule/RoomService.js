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

const RoomService = (props) => {
  // const service = props.roomServiceRule.service;
  const paymentRoomDetail = props.paymentRoomDetail;
  const {
    pet,
    tv,
    meal,
    mini_bar,
    window,
    corner,
    bathroom,
    tub,
    shower,
    sofa,
    hair_dryer,
    cooler,
    warmer,
    morning_call,
    slipper,
    pajamas,
    high_floor,
    air_purifier,
  } = paymentRoomDetail;
  console.log('service', paymentRoomDetail);
  const roomService = [
    { service: 'WIFI', value: pet },
    { service: '電視', value: tv },
    { service: '送餐', value: meal },
    { service: '迷你吧', value: mini_bar },
    { service: '窗戶', value: window },
    { service: '邊間', value: corner },
    { service: '浴室', value: bathroom },
    { service: '浴缸', value: tub },
    { service: '淋浴', value: shower },
    { service: '沙發', value: sofa },
    { service: '吹吹風機', value: hair_dryer },
    { service: '冷氣', value: cooler },
    { service: '暖氣', value: warmer },
    { service: '喚醒服務', value: morning_call },
    { service: '拖鞋', value: slipper },
    { service: '睡衣', value: pajamas },
    { service: '高樓層', value: high_floor },
    { service: '空氣清淨機', value: air_purifier },
  ];
  const roomServiceFilter = roomService.filter((v, i) => {
    return v.value !== 0;
  });
  console.log('Roomservice', roomService);

  console.log('serviceFilter', roomServiceFilter);
  return (
    <>
      {/* <!-- NOTE 房型服務資訊 --> */}
      <div className="room-service   pt-3 px-3">
        <div className="room-name d-flex align-items-center">
          <h4 className="me-3">{paymentRoomDetail.room} </h4>
          <small>*兩周內取消須付費</small>
        </div>
        <div className="service-list py-2 row mb-3">
          {roomServiceFilter.map((service, index) => (
            <span className="room-service-tag col-auto ms-2 my-1">{service.service}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoomService;
