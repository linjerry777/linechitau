import React, { useState, useContext } from 'react';
import './Pay.scss';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import axios from 'axios';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
const Pay = () => {
  const { jwtToken, userF, logout, jwtDecodedData } =
    useContext(JwtCsrfTokenContext);
  const [number, SetNumber] = useState('');
  const [name, SetName] = useState('');
  const [date, SetDate] = useState('');
  const [cvc, SetCvc] = useState('');
  const [focus, SetFocus] = useState('');
  const [items, setItems] = useState({});
  console.log(jwtDecodedData.email);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!!name === false) {
      alert('請輸入持卡人姓名');
      return;
    }
    if (!!number === false) {
      alert('請輸入卡號');
      return;
    }
    if (!!date === false) {
      alert('請輸入正確日期格式');
      return;
    }
    if (!!cvc === false) {
      alert('請輸入正確驗證碼格式');
      return;
    }
    if (number.length !== 16) {
      alert('卡號錯誤');
      return;
    }
    if (date.length !== 4) {
      alert('日期錯誤');
      return;
    }
    if (cvc.length !== 3) {
      alert('驗證碼錯誤');
      return;
    }
    let formData = {
      name: name,
      number: number,
      date: date,
      cvc: cvc,
      email: jwtDecodedData.email,
    };
    try {
      let response = await axios.post('/auth/pay', formData);
      console.log('成功');
      alert('新增成功');
    } catch (e) {
      alert('已經註冊過囉');
    }
  }
  const getUser = async ({ queryKey }) => {
    // const response = await fetch(
    //   `https://reqres.in/api/users?page=${userF.name}`
    // );

    const response = await fetch(
      `http://localhost:3001/api/userlist/pay/${jwtDecodedData.email}`
    );
    // const response = await fetch('./users.json');
    console.log('收到', response);
    const list = await response.json();
    console.log(list);
    setItems(list.data);
    return list;
  };
  const {
    data: list,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(['listdata', items], getUser, {
    // refetchOnWindowFocus: false,s
    retry: 0,
    // cacheTime: 1000,
    // enabled: false,
  });
  if (list === undefined) {
    return (
      <>
        <span>請先登入</span>
      </>
    );
  }
  if (list.error) {
    return (
      <>
        <span>
          <div className="container-pay">
            <h1 className="buytitle valign-text-middle notosans-normal-old-copper-32px">
              新增卡片
            </h1>
            <div
              id="PaymentForm"
              className="manger-profile my-border-radius d-flex align-items-center"
            >
              <div className="cards d-flex ms-5">
                <Cards
                  number={number}
                  name={name}
                  expiry={date}
                  cvc={cvc}
                  focused={focus}
                />
                <form>
                  <div className="card-name row py-2">
                    <div className=" d-flex col-3  justify-content-end align-items-end">
                      <label className=" pe-3">持卡人姓名</label>
                    </div>
                    <div className="col-7 px-0">
                      <input
                        type="text"
                        className="form-control border-0"
                        value={name}
                        name="name"
                        onChange={(e) => {
                          SetName(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
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
                        value={number}
                        maxLength="16"
                        name="number"
                        onChange={(e) => {
                          SetNumber(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
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
                        value={date}
                        maxLength="4"
                        onChange={(e) => {
                          SetDate(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                      />
                    </div>
                    <div className=" d-flex col-3  justify-content-end align-items-end">
                      <label className=" pe-3">安全碼</label>
                    </div>
                    <div className="col-2 px-0">
                      <input
                        type="tel"
                        name="cvc"
                        className=" border-0 form-control"
                        value={cvc}
                        maxLength="3"
                        onChange={(e) => {
                          SetCvc(e.target.value);
                        }}
                        onFocus={(e) => SetFocus(e.target.name)}
                      />
                    </div>
                  </div>
                  <button className="button-submit" onClick={handleSubmit}>
                    送出
                  </button>
                </form>
              </div>
            </div>
          </div>
        </span>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <span>Loading...</span>
      </>
    );
  }
  if (isFetching) {
    return <>加載中</>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="container-pay">
      <h1 className="buytitle valign-text-middle notosans-normal-old-copper-32px">
        持有卡片
      </h1>
      <div
        id="PaymentForm"
        className="manger-profile my-border-radius d-flex align-items-center"
      >
        <div className="cards d-flex ms-5">
          <Cards
            number={list[0].card_number}
            name={list[0].cardholder_name}
            expiry={list[0].exp_date}
            cvc={list[0].cvc}
          />
          <form>
            <div className="card-name row py-2">
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">持卡人姓名</label>
              </div>
              <div className="col-7 px-0">
                <input
                  type="text"
                  className="form-control border-0"
                  value={list[0].cardholder_name}
                  name="name"
                  disabled
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
                  value={list[0].card_number}
                  maxLength="16"
                  name="number"
                  disabled
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
                  value={list[0].exp_date}
                  maxLength="4"
                  disabled
                />
              </div>
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">安全碼</label>
              </div>
              <div className="col-2 px-0">
                <input
                  type="tel"
                  name="cvc"
                  className=" border-0 form-control"
                  value={list[0].cvc}
                  maxLength="3"
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <h1 className="buytitle valign-text-middle notosans-normal-old-copper-32px">
        新增卡片
      </h1>
      <div
        id="PaymentForm"
        className="manger-profile my-border-radius d-flex align-items-center"
      >
        <div className="cards d-flex ms-5">
          <Cards
            number={number}
            name={name}
            expiry={date}
            cvc={cvc}
            focused={focus}
          />
          <form>
            <div className="card-name row py-2">
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">持卡人姓名</label>
              </div>
              <div className="col-7 px-0">
                <input
                  type="text"
                  className="form-control border-0"
                  value={name}
                  name="name"
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                  onFocus={(e) => SetFocus(e.target.name)}
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
                  value={number}
                  maxLength="16"
                  name="number"
                  onChange={(e) => {
                    SetNumber(e.target.value);
                  }}
                  onFocus={(e) => SetFocus(e.target.name)}
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
                  value={date}
                  maxLength="4"
                  onChange={(e) => {
                    SetDate(e.target.value);
                  }}
                  onFocus={(e) => SetFocus(e.target.name)}
                />
              </div>
              <div className=" d-flex col-3  justify-content-end align-items-end">
                <label className=" pe-3">安全碼</label>
              </div>
              <div className="col-2 px-0">
                <input
                  type="tel"
                  name="cvc"
                  className=" border-0 form-control"
                  value={cvc}
                  maxLength="3"
                  onChange={(e) => {
                    SetCvc(e.target.value);
                  }}
                  onFocus={(e) => SetFocus(e.target.name)}
                />
              </div>
            </div>
            <button className="button-submit" onClick={handleSubmit}>
              送出
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pay;
