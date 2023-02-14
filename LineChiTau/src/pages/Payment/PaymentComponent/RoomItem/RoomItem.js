import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

const moment = require('moment');

const RoomItem = (props) => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  console.log('13213213213213213132====456=4=564=56=', orderId);
  const numStart = moment(props.orderItem.startDate);
  const numEnd = moment(props.orderItem.endDate);
  const totalDate = numEnd.diff(numStart, 'days');

  console.log('TOOTALLLDATE', totalDate);

  const amount = props.orderItem.conditions.room;
  const paymentRoomDetail = props.paymentRoomDetail;
  console.log('房間名', paymentRoomDetail);
  console.log('type of paymentRoomDetail', typeof paymentRoomDetail);

  console.log(
    'props.orderItem.startDateprops.orderItem.startDateprops.orderItem.startDate',
    props.orderItem.startDate
  );
  console.log(
    'props.orderItem.startDateprops.orderItem.startDateprops.orderItem.startDate',
    props.orderItem.endDate
  );
  return (
    <>
      <div className="order-info px-4 py-3 h-100">
        <h4 className="title my-3 mb-4">您的住房資訊</h4>
        <div className="check-time row mb-4 justify-content-between">
          <div className="col-6">
            <div className="check-in-time order-info-detail align-items-center px-3 py-2 ">
              <h6>入住時間</h6>
              <div className="checkin-datetime d-flex flex-column">
                <span>{props.orderItem.startDate}</span>
                <small>15:00起</small>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="check-out-time order-info-detail align-items-center  px-3 py-2">
              <h6>退房時間</h6>
              <div className="checkout-datetime d-flex flex-column">
                <span>{props.orderItem.endDate}</span>
                <small>12:00前</small>
              </div>
            </div>
          </div>
        </div>
        <div className=" row justify-content-around  mb-4">
          <div className="col-12">
            <div className="room-chosen order-info-detail  px-3  py-5">
              <h5>已選擇：</h5>
              <div className="chosen-room d-flex justify-content-around align-items-center">
                <span>{paymentRoomDetail.room}</span>
                <span>{amount} 間</span>
                {/* NOTE 回到商品頁/上一頁 */}

                <Link
                  className={
                    'text-decoration-none d-flex align-items-center' +
                    (orderId === undefined ? ' ' : ' d-none')
                  }
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <button
                    className={
                      'change-chosen my-edit-btn d-flex align-items-center justify-content-center' +
                      (orderId === undefined ? ' ' : ' d-none')
                    }
                  >
                    更改選擇
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <div className="sub order-info-detail py-3  ">
              <div className="sub-days sub-price bg-transparent row">
                <span className="col-4"> 總共入住：</span>{' '}
                {/* NOTE 退房-入住 */}
                <span className="col-auto">{totalDate} 晚</span>
              </div>
              <div className="sub-price bg-transparent row ">
                <span className="col-4">單間價格：</span>
                <span className="col-auto">
                  NT$ {paymentRoomDetail.price} / 晚
                </span>
              </div>
              <div className="sub-price bg-transparent row ">
                <span className="col-4">小計：</span>
                <span className="col-auto">
                  NT$ {paymentRoomDetail.price * amount * totalDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomItem;
