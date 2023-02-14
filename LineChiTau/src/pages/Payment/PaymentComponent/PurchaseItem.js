import React from 'react';
import '../layout/ProgressBar.scss';
import ProductImg from '../../Hotel/img/banner.svg';
import Participant from './Participant/Participant';

const PurchaseItem = (props) => {
  return (
    <>
      {props.cartItems.map((cartItems, index) => (
        <div className="item-section row col-12  mb-3" key={index}>
          <div className="item row col-12  mb-3 py-3 ">
            <div className="item-box col-12">
              <div className="img-box">
                <img
                  src={ProductImg}
                  alt="海豚圖片"
                  className="object-cover my-border-radius"
                />
              </div>
              <div className="text-box d-flex flex-column justify-content-evenly mx-3">
                <div className="cart-itemDetail">
                  <h1 className="nav-foot text-truncate ">
                    {cartItems.tripName}
                  </h1>
                  <p className="my-p my-1">方案：{cartItems.planName}</p>
                </div>
                <div className="d-flex ">
                  <span
                    className={
                      'amountA d-flex pe-3 align-items-center' +
                      (cartItems.amountA === 0 ? ' d-none' : ' ')
                    }
                  >
                    <span class="material-symbols-rounded">man</span> 成人 x
                    {cartItems.amountA}
                  </span>

                  <span
                    className={
                      'amountC d-flex pe-3 align-items-center' +
                      (cartItems.amountC === 0 ? ' d-none' : ' ')
                    }
                  >
                    <span class="material-symbols-rounded">child_friendly</span>
                    小孩 x{cartItems.amountC}
                  </span>
                  <div
                    className={
                      'amountE d-flex pe-3 align-items-center' +
                      (cartItems.amountE === 0 ? ' d-none' : ' ')
                    }
                  >
                    <span class="material-symbols-rounded">elderly</span>老人 x
                    {cartItems.amountE}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-price row item-chosen d-flex justify-content-between align-items-center p-3 my-0">
            <h5 className="col-6 my-0">預定日期：{cartItems.departTime}</h5>
            <h5 className="col-auto my-0 justify-content-end">
              小計：{cartItems.totalPrice}
            </h5>
          </div>
          {/* <Participant
            participantTabs={cartItems.description.participantTabs}
          /> */}
        </div>
      ))}
    </>
  );
};

export default PurchaseItem;
