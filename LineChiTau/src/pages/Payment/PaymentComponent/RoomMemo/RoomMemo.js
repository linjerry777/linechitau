import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
  useParams,
} from 'react-router-dom';

import ProductImg from '../../../Hotel/img/banner.svg';

const RoomMemo = (props) => {
  const { orderId } = useParams();
  console.log('======props.memo=====', props.memo);
  return (
    <>
      <div className="memo-form col-12 px-0 mb-4 h-100 row align-items-baseline justify-content-between">
        <div className="px-3 pt-3 mx-3 col  h-100">
          <div className=" memo-title-height">
            <h4 className="title mb-3">您有什麼特別的需求？</h4>
            <p className="">
              住宿方無法保證達成您的特殊要求－但將盡力為您安排。
            </p>
          </div>
          <div className="memo-textarea-area col-12">
            <textarea
              className="form-control border-0  memo-textarea"
              name=""
              id=""
              value={props.memo}
              rows="10"
              cols="6"
              onChange={(e) => {
                props.updateValue.setMemo(e.target.value);
              }}
              disabled={props.isDisabled}
            ></textarea>
          </div>
        </div>
        <div
          className={
            'arrive-data d-flex align-items-baseline pt-3 col-3  mx-3 ' +
            (orderId === undefined ? 'd-none ' : ' ')
          }
        >
          <div className=" arrive-time-data d-flex flex-column p-3">
            <h5>預計抵達時間</h5>
            12:00
            <ul>
              <small>
                <li> 您的客房將會在 15:00 開放辦理入住</li>
              </small>
              <small>
                <li>
                  24 小時接待櫃檯－在您有需要的時候，隨時都能為您提供服務！
                </li>
              </small>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomMemo;
