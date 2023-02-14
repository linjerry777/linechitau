import React from 'react';
import pic3 from '../../img/Hotel1/rocky-DBL.jpg';
import './RoomRule.scss';

const RoomRule = () => {
  return (
    <>
      <div className="container-xxl hotel-room-rule p-3 my-5" id="rule">
        <h3 className="h3">訂房規則</h3>
        <div className="row">
          <div className="col-6 row">
            <div className="row my-3 my-p">
              <div className="col-6">
                <div className="d-flex">
                  <div class="material-symbols-outlined me-2">login</div>
                  <p>Check-in 時間</p>
                </div>
                <p>15:00</p>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <div class="material-symbols-outlined me-2">logout</div>
                  <p>Check-out 時間</p>
                </div>
                <p>11:00</p>
              </div>
            </div>
            <div className="my-p">
              <div className="d-flex">
                <div class="material-symbols-outlined notice-icon me-2">
                  notification_important
                </div>
                <p>預訂取消政策</p>
              </div>
              <p>
                於入住前兩周可免費取消，兩周內依照取消日期將會收取相應之取消費用
              </p>
            </div>
            <div className="my-p">
              <div className="d-flex">
                <div class="material-symbols-outlined notice-icon me-2">
                  escalator_warning
                </div>
                <p>孩童加床政策</p>
              </div>
              <p>
                2 位 11 歲 (含) 以下的兒童若與家長或監護人同住一間房
                (不加床)，則無需支付額外住宿費。
              </p>
            </div>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </>
  );
};

export default RoomRule;
