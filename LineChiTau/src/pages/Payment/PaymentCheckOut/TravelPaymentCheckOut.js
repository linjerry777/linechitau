import React, { useEffect, useState, useContext } from 'react';
import './TravelPaymentCheckOut.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';

import ProductImg from '../../Hotel/img/banner.svg';
import ProgressBar from '../PaymentComponent/ProgressBar/ProgressBar';
import UserData from '../PaymentComponent/UserData/UserData';

import PaymentMethod from '../PaymentComponent/PaymentMethod/PaymentMethod';
import CheckOutItemList from '../PaymentComponent/CheckOutItemList/CheckOutItemList';
import CheckOutCreditCard from '../PaymentComponent/CheckOutCreditCard/CheckOutCreditCard';
import UseDiscount from '../PaymentComponent/UseDiscount/UseDiscount';
import { JwtCsrfTokenContext } from '../../../utils/csrf-hook/useJwtCsrfToken';

const moment = require('moment');

const TravelPaymentCheckOut = () => {
  const currentStep = 3;
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  const { orderId } = useParams();
  let navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState([]);
  const [initTab, setInitTab] = useState(0);
  const [description, setDescription] = useState('');
  const [booker, setBooker] = useState('');

  useEffect(() => {
    console.log('orderId', orderId);
    async function getOrderDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/CheckOut/Travel/${orderId}`
      );
      console.log('responseDATA', response.data);
      if (!response.data[0]) return;
      setOrderDetail(response.data);
      setDescription(response.data[0].description);
      setBooker(JSON.parse(response.data[0].description)[0].booker);
      setInitTab(response.data[0].order_detail_id);
      // setHotelImg(response.data[0].hotel_img);
    }
    getOrderDetail();
    // const memo = JSON.parse(description)[0].memo;
    console.log('=-============memo======================', orderDetail);
    console.log('=-============setInitTab======================', initTab);
  }, []);
  console.log('=-============orderDetail======================', orderDetail);
  console.log('=-============setInitTab Out======================', initTab);

  const [userCreditCard, setUserCreditCard] = useState({});
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const creditCard = {
    number: number,
    name: name,
    expDate: expDate,
    cvc: cvc,
    focus: focus,
  };
  const updateValue = {
    setNumber: (value) => {
      setNumber(value);
    },
    setName: (value) => {
      setName(value);
    },
    setExpDate: (value) => {
      setExpDate(value);
    },
    setCvc: (value) => {
      setCvc(value);
    },
    setFocus: (value) => {
      setFocus(value);
    },
    // setMemo: (value) => {
    //   setMemo(value);
    // },
  };

  async function handleGetCard(e) {
    e.preventDefault();
    // !????????????????????????
    console.log('=======jwtDecodedData.email========', jwtDecodedData.email);
    // * ajax
    try {
      let response = await axios.get(
        `http://localhost:3001/api/payment/CheckOut/Travel/creditCard/${jwtDecodedData.email}`,
        {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }
      );

      console.log('OPENAI???????????????????????????', response.data[0]);
      setNumber(response.data[0].card_number);

      setName(response.data[0].cardholder_name);

      setExpDate(response.data[0].exp_date);

      setCvc(response.data[0].cvc);
    } catch (e) {
      alert('?????????????????????');
    }
    console.log('setCard', userCreditCard.card_number);
    console.log('setCard', userCreditCard.cardholder_name);
    console.log('setCard', userCreditCard.exp_date);
    console.log('setCard', userCreditCard.cvc);
  }
  async function handleCheckOut(e) {
    e.preventDefault();
    // !????????????????????????
    if (!number) {
      alert('???????????????');
    } else if (!name) {
      alert('????????????????????????');
    } else if (!expDate) {
      alert('?????????????????????');
    } else if (!cvc) {
      alert('??????????????????');
    }
    // else if (!isChecked) {
    //   alert('??????????????? ???????????????????????????');
    // }
    else {
      // * ajax

      try {
        let response = await axios.post(
          `http://localhost:3000/api/payment/CheckOut/Travel/order/CheckOut`,
          { orderId },
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
          }
        );
      } catch (e) {
        alert('????????????');
      }
      navigate(`/profile/listdetail/${orderId}`);
    }
  }
  console.log('=======Detail===', orderDetail);
  return (
    <>
      <ProgressBar currentStep={currentStep} />

      <main className="container main-width px-0">
        {/* <!-- TODO ?????????????????????TOTAL?????? --> */}
        <div className=" row w-100 px-0 mx-0 ">
          <div className="col-4 ps-0 my-3">
            {/* <PaymentMethod /> */}
            <UserData booker={booker} />
          </div>
          <div className="col-8 pe-0 my-3">
            {console.log('list------', orderDetail)}
            <CheckOutItemList orderItems={orderDetail} initTab={initTab} />
          </div>
        </div>
        {/* <!-- TODO ?????????????????? --> */}
        <div className=" row w-100 px-0 mx-0">
          <div className="col-12 px-0">
            <div className="payment-detail d-flex flex-column mb-3 px-5 ">
              <div className="contact-title d-flex align-items-center justify-content-between my-3 px-0">
                <h3 className="title">??????????????????</h3>
                <button
                  className="my-card-btn d-flex align-items-center justify-content-around  "
                  onClick={handleGetCard}
                >
                  <span className="material-symbols-rounded">credit_card</span>
                  <span>???????????????</span>
                </button>
              </div>
              <CheckOutCreditCard
                creditCard={creditCard}
                userCreditCard={userCreditCard}
                updateValue={updateValue}
              />
              <div className="notice w-100 py-3 text-right">
                <h5 className="d-flex justify-content-end">
                  ???????????????CVC ?????????
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- TODO ???????????? --> */}
        {/* <!-- NOTE ???????????? --> */}
        <div className="rule-section  col-12 pb-5">
          <div className="d-flex justify-content-center">
            <button className="my-btn w-25 " onClick={handleCheckOut}>
              ????????????
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default TravelPaymentCheckOut;
