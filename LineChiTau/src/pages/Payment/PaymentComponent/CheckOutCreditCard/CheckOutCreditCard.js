import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import '../ComponentScss/CreditCard.scss';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
} from 'react-router-dom';
const CheckOutCreditCard = (props) => {
  return (
    <>
      <div className="credit-card-section row  py-5">
        <div className="credit-card col-6 px-4 my-5 d-flex justify-content-center ">
          <Cards
            className="rccs-size"
            number={props.creditCard.number}
            name={props.creditCard.name}
            expiry={props.creditCard.expDate}
            cvc={props.creditCard.cvc}
            focused={props.creditCard.focus}
          />
        </div>
        <div className="crad-info col-6 px-5  my-5">
          <form>
            <div className="card-name row py-2">
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">持卡人姓名</label>
              </div>
              <div className="col-7 px-0">
                <input
                  type="text"
                  className="form-control border-0"
                  value={props.creditCard.name}
                  name="name"
                  onChange={(e) => {
                    props.updateValue.setName(e.target.value);
                  }}
                  onFocus={(e) => props.updateValue.setFocus(e.target.name)}
                  
                />
              </div>
            </div>
            <div className="card-number row py-2">
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">卡號</label>
              </div>
              <div className="col-7 px-0">
                <input
                  type="text"
                  className="form-control border-0"
                  value={props.creditCard.number}
                  name="number"
                  maxLength={16}
                  onChange={(e) => {
                    props.updateValue.setNumber(e.target.value);
                  }}
                  onFocus={(e) => props.updateValue.setFocus(e.target.name)}
                  
                />
              </div>
            </div>
            <div className="date-cvc row py-2">
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">有效日期</label>
              </div>
              <div className="col-2 px-0">
                <input
                  type="text"
                  name="expiry"
                  className="form-control border-0"
                  value={props.creditCard.expDate}
                  onChange={(e) => {
                    props.updateValue.setExpDate(e.target.value);
                  }}
                  onFocus={(e) => props.updateValue.setFocus(e.target.name)}
                  
                />
              </div>
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">安全碼</label>
              </div>
              <div className="col-2 px-0">
                <input
                  type="text"
                  name="cvc"
                  className=" border-0 form-control"
                  value={props.creditCard.cvc}
                  maxLength={3}
                  onChange={(e) => {
                    props.updateValue.setCvc(e.target.value);
                  }}
                  onFocus={(e) => props.updateValue.setFocus(e.target.name)}
                  
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOutCreditCard;
