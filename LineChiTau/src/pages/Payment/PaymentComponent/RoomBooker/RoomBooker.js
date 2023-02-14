import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
} from 'react-router-dom';

import ProductImg from '../../../Hotel/img/banner.svg';

const RoomBooker = (props) => {
  return (
    <>
      <div className="profile-form px-4 py-3  h-100">
        <h4 className="title mb-3">請輸入個人資料</h4>
        <div className="user-data">
          <div className="name row">
            <div className="lastName col-6">
              <label htmlFor="">姓氏</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control border-0"
                value={props.lastName}
                onChange={(event) => {
                  props.updateValue.setLastName(event.target.value);
                  console.log(props.lastName);
                }}
              />
            </div>
            <div className="firstName col-6">
              <label htmlFor="">名字</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control border-0"
                value={props.firstName}
                onChange={(event) => {
                  props.updateValue.setFirstName(event.target.value);
                  console.log(props.firstName);
                }}
              />
            </div>
          </div>
          <div className="email">
            <label htmlFor="">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control border-0"
              value={props.email}
              onChange={(event) => {
                props.updateValue.setEmail(event.target.value);
                console.log(props.email);
              }}
            />
          </div>

          <div className="tel">
            <label htmlFor="">連絡電話</label>
            <input
              type="text"
              id="tel"
              name="tel"
              className="form-control border-0"
              value={props.tel}
              onChange={(event) => {
                props.updateValue.setTel(event.target.value);
                console.log(props.tel);
              }}
            />
          </div>

          <div className="country-lang row">
            <div className="country col-6">
              <label htmlFor="">國家 / 地區</label>
              <input
                type="text"
                id="country"
                name="country"
                className="form-control border-0"
                value={props.country}
                onChange={(event) => {
                  props.updateValue.setCountry(event.target.value);
                  console.log(props.country);
                }}
              />
            </div>
            <div className="lang col-6">
              <label htmlFor="lang">語言</label>
              <input
                type="text"
                id="lang"
                name="lang"
                className="form-control border-0"
                value={props.lang}
                onChange={(event) => {
                  props.updateValue.setLang(event.target.value);
                  console.log(props.lang);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomBooker;
