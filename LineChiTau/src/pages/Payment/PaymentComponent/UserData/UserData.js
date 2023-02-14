import React from 'react';

const UserData = (props) => {
  return (
    <>
      <div className="payment-chosen-section d-flex  flex-column mb-3 px-5 py-3 ">
        <div className="contact-title align-items-center mb-3 px-0 ">
          <h4 className="title">聯絡資料</h4>
          <small className="ms-2">*確認訂單後，需於30分鐘內完成付款</small>
        </div>
        <div className="payment-contact-data px-3 my-1 row gy-3">
          <div className="data-area col-12 row my-3">
            <h5 className="m-0 col-6">姓名</h5>
            <span className="col-6">{props.booker.name}</span>
          </div>
          <div className="data-area col-12  row my-3">
            <h5 className="m-0 col-6">信箱</h5>
            <span className="col-6">{props.booker.email}</span>
          </div>
          <div className="data-area col-12 row my-3">
            <h5 className="m-0 col-6">連絡電話</h5>
            <span className="col-6">{props.booker.tel}</span>
          </div>
          <div className="data-area col-12 row my-3">
            <h5 className="m-0 col-6">國家 / 地區</h5>
            <span className="col-6">{props.booker.country}</span>
          </div>
          <div className="data-area col-12 row my-3">
            <h5 className="m-0 col-6">語言</h5>
            <span className="col-6">{props.booker.lang}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
