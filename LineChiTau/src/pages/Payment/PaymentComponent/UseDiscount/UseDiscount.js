import React from 'react';

const UseDiscount = (props) => {
  console.log('DIscount ===props====', props);
  console.log('DIscount ===props.userCoupon====', props.userCoupon);
  return (
    <>
      <div className="item-section row col-12  my-3 p-5">
        <div className="contact-title d-flex align-items-center py-0 px-3">
          <h3 className="title">優惠折扣</h3>
        </div>

        {/* NOTE <!-- ! 可用優惠券 選後自動帶入上方輸入(?) --> */}
        <div className=" d-flex flex-column align-items-start py-0 px-3 my-3 ">
          <h5 className="">可選優惠券(2)</h5>
          <select
            name="discount"
            id="discount"
            className="form-select "
            onChange={(event) => {
              props.updateValue.setDiscountId(event.target.value);
              console.log('setDiscountsetDiscount', props.discountId);
            }}
          >
            <option value={0}>不使用優惠券</option>
            {props.userCoupon.map((Coupon, index) => {
              console.log('userCoupon map Coupon');
              return (
                <option value={Coupon.id} key={index}>
                  {Coupon.coupon_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default UseDiscount;
