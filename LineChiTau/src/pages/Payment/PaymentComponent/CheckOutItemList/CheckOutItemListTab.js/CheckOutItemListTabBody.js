import React, { useState } from 'react';
const moment = require('moment');
function CheckOutItemListTabBody(props) {
  const departTime = moment(props.orderItem.depart_time).format('YYYY-MM-DD');
  console.log('tabBody', props.orderItem);
  if (props.orderItem !== undefined) {
    props.updateValue.setSubTotal(props.orderItem.final_total_price);
    props.updateValue.setTabId(props.orderItem.final_total_price);
  }

  return (
    <>
      <div
        className={
          'sub-detail p-3 mb-2 row  mx-0 ' +
          (props.currentTab === props.id ? '' : 'd-none')
        }
      >
        {props.currentTab === props.id && (
          <div className="sub-detail row  py-2 mx-0">
            <h4>{props.orderItem.trip_name}</h4>
            <p className='m-0'>{props.orderItem.plan_name}</p>
            <p className='m-0'>預定日期：{departTime}</p>

            <div className="d-flex my-3">
              <span
                className={
                  'amountA d-flex pe-3 align-items-center' +
                  (props.orderItem.amount_adu === 0 ? ' d-none' : ' ')
                }
              >
                <span className="material-symbols-rounded">man</span> 成人 x
                {props.orderItem.amount_adu}
              </span>

              <span
                className={
                  'amountC d-flex pe-3 align-items-center' +
                  (props.orderItem.amount_chi === 0 ? ' d-none' : ' ')
                }
              >
                <span className="material-symbols-rounded">child_friendly</span>
                小孩 x{props.orderItem.amount_chi}
              </span>
              <div
                className={
                  'amountE d-flex pe-3 align-items-center' +
                  (props.orderItem.amount_eld === 0 ? ' d-none' : ' ')
                }
              >
                <span className="material-symbols-rounded">elderly</span>老人 x
                {props.orderItem.amount_eld}
              </div>
            </div>

            <div className="sub-price d-flex justify-content-between align-items-center  ">
              小計 :
              <span>
                {props.orderItem.discount === 0
                  ? props.orderItem.total_price
                  : props.orderItem.total_price *
                    (props.orderItem.discount / 10)}
                元
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CheckOutItemListTabBody;
