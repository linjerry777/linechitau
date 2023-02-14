import React from 'react';

const PaymentMethod = (props) => {
  return (
    <>
      
        <div className="payment-chosen-section d-flex  flex-column mb-3 px-5 py-3 ">
          <div className="contact-title align-items-center mb-3 px-0 ">
            <h4 className="title">請選擇付款方式</h4>
            <small className="ms-2">*確認訂單後，需於30分鐘內完成付款</small>
          </div>
          <div className="sub-detail  p-3 mb-3">
            <input type="radio" name="payment" id="" /> 信用卡
          </div>
          <div className="sub-detail  p-3 mb-3">
            <input type="radio" name="payment" id="" /> LINE Pay
          </div>
        </div>
     
    </>
  );
};

export default PaymentMethod;
