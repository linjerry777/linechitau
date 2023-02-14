import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
} from 'react-router-dom';
const SubTotalList = (props) => {
  const itemCount = props.cartItems;
  console.log('itemCount-L', itemCount.length);
  console.log('itemCount-isA', Array.isArray(itemCount));
  console.log('SUBlist', props.cartItemsTotalPrice);
  const SubTotalPrice = props.cartItemsTotalPrice;
  const discount = props.discount / 10;
  console.log('SubTotalPrice', SubTotalPrice);
  console.log('discount', discount);
  useEffect(() => {
    if (discount > 0) {
      props.updateValue.setFinalPrice(props.cartItemsTotalPric * discount);
    } else {
      props.updateValue.setFinalPrice(props.cartItemsTotalPrice);
    }

    console.log('setDiscountPrice,', props.discountPrice);
  }, [props.discount]);
  useEffect(() => {
    props.updateValue.setFinalPrice(
      props.cartItemsTotalPrice - props.discountPrice
    );
    console.log(
      'props.cartItemsTotalPrice - props.discountPrice',
      props.cartItemsTotalPrice - props.discountPrice
    );
  }, [props.discountPrice, props.discount]);
  console.log('discount Price', props.discountPrice);
  console.log('discount Price props.finalPrice', props.finalPrice);

  return (
    <>
      <div className="sub-section d-flex flex-column my-3 px-3 py-3">
        <div className="sub-detail p-3 mb-2">
          {/* <!-- NOTE ? 有要分票券張數跟行程計數嗎? --> */}
          <h5>總數：{itemCount.length} 項行程</h5>
          <h5>原價：{props.cartItemsTotalPrice} 元</h5>
          <h5 className="text-danger">
            折扣：
            {discount > 0 ? props.cartItemsTotalPrice * (1 - discount) : 0}
          </h5>
          <h5 >
            實付：
            {discount > 0
              ? props.finalPrice - props.cartItemsTotalPrice * (1 - discount)
              : props.cartItemsTotalPrice}
          </h5>
        </div>

        <div className="topay  row m-0">
          <span className="my-p-small mb-2">
            點擊「前往付款」，訂單即送出，請確認後再送出
          </span>
          <button className=" my-btn col align-items-center  me-1">
            <Link
              className="text-decoration-none d-flex align-items-center justify-content-center"
              to={'/ShoppingCart'}
            >
              返回購物車
              <span className="material-symbols-rounded">shopping_cart</span>
            </Link>
          </button>
          <button className=" my-btn col text-decoration-none ms-1">
            <Link
              className="text-decoration-none "
              to={'/payment/Travel/CheckOut'}
              onClick={props.handleSubmit}
            >
              前往付款
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default SubTotalList;
