import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import axios from 'axios';
const AmountSelect = (props) => {
  const planId = props.planId;
  useEffect(() => {
    async function getPlanDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/trip/TripDetail/plan/${planId}`
      );
      console.log('responseDATA/plan', response.data);
      if (!response.data[0]) return;
      props.updateValue.setPriceA(response.data[0].price_adu);
      props.updateValue.setPriceC(response.data[0].price_chi);
      props.updateValue.setPriceE(response.data[0].price_eld);
      //   props.updateValue.setPriceC(response.data[0].trip_name);
      //   props.updateValue.setPriceE(response.data[0].start_date);

      // setDescription(response.data[0].description);
      // setMemo(JSON.parse(response.data[0].description)[0].memo);
      // setBooker(JSON.parse(response.data[0].description)[0].booker);
    }
    getPlanDetail();
  }, [planId]);
  return (
    <>
      <div className="h1 d-flex row">
        <div className="col-3">成人</div>
        <span
          className="col-3"
          onClick={() => {
            props.updateValue.setAmountA(props.amountA + 1);
          }}
        >
          +
        </span>
        <div className="col-3">{props.amountA}</div>
        <span
          className="col-3"
          onClick={(e) => {
            props.updateValue.setAmountA(props.amountA - 1);
          }}
        >
          -
        </span>
      </div>
      <div className="h1 d-flex row">
        <div className="col-3">成人單人價格:{props.priceA}</div>
        <div className="col-3">成人總價格:{props.priceA * props.amountA}</div>
      </div>
      <div className="h1 d-flex row">
        <div className="col-3">小孩</div>
        <div
          className="col-3"
          onClick={() => {
            props.updateValue.setAmountC(props.amountC + 1);
          }}
        >
          +
        </div>
        <div className="col-3">{props.amountC}</div>
        <div
          className="col-3"
          onClick={() => {
            props.updateValue.setAmountC(props.amountC - 1);
          }}
        >
          -
        </div>
      </div>
      <div className="h1 d-flex row">
        <div className="col-3">小孩單人價格:{props.priceC}</div>
        <div className="col-3">小孩總價格:{props.priceC * props.amountC}</div>
      </div>
      <div className="h1 d-flex row">
        <div className="col-3">老人</div>
        <div
          className="col-3"
          onClick={() => {
            props.updateValue.setAmountE(props.amountE + 1);
          }}
        >
          +
        </div>
        <div className="col-3">{props.amountE}</div>
        <div
          className="col-3"
          onClick={() => {
            props.updateValue.setAmountE(props.amountE - 1);
          }}
        >
          -
        </div>
      </div>
      <div className="h1 d-flex row">
        <div className="col-3">老人單人價格:{props.priceE}</div>
        <div className="col-3">老人總價格:{props.priceE * props.amountE}</div>
      </div>
      {props.updateValue.setTotalPrice(
        props.priceE * props.amountE +
          props.priceC * props.amountC +
          props.priceA * props.amountA
      )}
      <div className="h1 d-flex row">
        <div className="col-3">總價格:{props.totalPrice}</div>
      </div>
    </>
  );
};

export default AmountSelect;
