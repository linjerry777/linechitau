import React, { useEffect, useState, useContext } from 'react';

import './HotelPaymentCheckOut.scss';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from 'react-router-dom';
import ProductImg from '../../Hotel/img/banner.svg';
import ProgressBar from '../PaymentComponent/ProgressBar/ProgressBar';

import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from 'react-bootstrap';
import RoomItem from '../PaymentComponent/RoomItem/RoomItem';
import RoomItemHotel from '../PaymentComponent/RoomItemHotel/RoomItemHotel';
import RoomBooker from '../PaymentComponent/RoomBooker/RoomBooker';
import RoomService from '../PaymentComponent/RoomServiceRule/RoomService';
import RoomRule from '../PaymentComponent/RoomServiceRule/RoomRule';
import RoomMemo from '../PaymentComponent/RoomMemo/RoomMemo';
import CheckOutCreditCard from '../PaymentComponent/CheckOutCreditCard/CheckOutCreditCard';
import PaymentMethod from '../PaymentComponent/PaymentMethod/PaymentMethod';
import UserData from '../PaymentComponent/UserData/UserData';

import { JwtCsrfTokenContext } from '../../../utils/csrf-hook/useJwtCsrfToken';
import { set } from 'date-fns';

const moment = require('moment');

const HotelPaymentCheckOut = () => {
  const currentStep = 3;
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  console.log(jwtToken);

  const { orderId } = useParams();
  console.log('orderId', orderId);
  let navigate = useNavigate();

  const storage = localStorage;
  const [orderDetail, setOrderDetail] = useState([]);
  const [getStartDate, setStartDate] = useState('');
  const [getEndDate, setEndDate] = useState('');

  const [description, setDescription] = useState('');
  const [booker, setBooker] = useState('');

  const isDisabled = true;
  const [memo, setMemo] = useState('');
  const [hotelImg, setHotelImg] = useState('');
  // NOTE userEffect
  useEffect(() => {
    console.log('orderId', orderId);
    async function getOrderDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/CheckOut/Hotel/${orderId}`
      );
      console.log('responseDATA', response.data);
      if (!response.data[0]) return;
      setOrderDetail(response.data[0]);
      setStartDate(response.data[0].start_date);
      setEndDate(response.data[0].end_date);
      setDescription(response.data[0].description);
      setMemo(JSON.parse(response.data[0].description)[0].memo);
      setBooker(JSON.parse(response.data[0].description)[0].booker);
      setHotelImg(response.data[0].hotel_img);
    }
    getOrderDetail();
    // const memo = JSON.parse(description)[0].memo;
    console.log('=-============memo======================', memo);
  }, []);
  console.log(
    '=-======+++======orderDetail====++++++++++++=========',
    orderDetail
  );
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
    setMemo: (value) => {
      setMemo(value);
    },
  };
  async function handleGetCard(e) {
    e.preventDefault();
    // !關閉表單預設行為
    console.log('=======jwtDecodedData.email========', jwtDecodedData.email);
    // * ajax
    try {
      let response = await axios.get(
        `http://localhost:3001/api/payment/CheckOut/Hotel/creditCard/${jwtDecodedData.email}`,
        {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }
      );

      console.log('OPENAI好厲害比人還會說話', response.data[0]);
      setNumber(response.data[0].card_number);

      setName(response.data[0].cardholder_name);

      setExpDate(response.data[0].exp_date);

      setCvc(response.data[0].cvc);
    } catch (e) {
      alert('沒有信用卡資料');
    }
    console.log('setCard', userCreditCard.card_number);
    console.log('setCard', userCreditCard.cardholder_name);
    console.log('setCard', userCreditCard.exp_date);
    console.log('setCard', userCreditCard.cvc);
  }
  const [isChecked, setIsChecked] = useState(false);
  async function handleArgee(e) {
    if (e.target.checked) {
      console.log(' checked');
    } else {
      console.log('no checked');
    }
    setIsChecked((current) => !current);
  }
  async function handleCheckOut(e) {
    e.preventDefault();
    // !關閉表單預設行為
    if (!number) {
      alert('請輸入卡號');
    } else if (!name) {
      alert('請輸入持卡人姓名');
    } else if (!expDate) {
      alert('請輸入有效日期');
    } else if (!cvc) {
      alert('請輸入安全碼');
    } else if (!isChecked) {
      alert('請勾選同意 隱私條款與優惠資訊');
    } else {
      // * ajax

      try {
        let response = await axios.post(
          `http://localhost:3000/api/payment/CheckOut/Hotel/order/CheckOut`,
          { orderId },
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
          }
        );
      } catch (e) {
        alert('付款失敗');
      }
      navigate(`/profile/listdetail/${orderId}`);
    }
  }
  console.log('OPENAI好厲害比人還會說話00000', creditCard);

  const startDate = moment(getStartDate).format('YYYY/M/DD');
  console.log('==========startDate=======', startDate);
  const endDate = moment(getEndDate).format('YYYY/M/DD');
  console.log('==========startDate=======', endDate);

  const orderItem = {
    startDate: startDate,
    endDate: endDate,
    conditions: {
      room: orderDetail.amount,
    },
  };
  console.log('=-============orderItem======================', orderItem);
  console.log(
    '=-============conditions======================',
    orderItem.conditions
  );
  console.log(
    '=-============room======================',
    orderItem.conditions.room
  );
  console.log('=-============orderDD======================', orderDetail);
  console.log('=-============memo======================', memo);
  console.log('=-============description======================', description);
  // const memo = JSON.parse(description);

  return (
    <>
      <ProgressBar currentStep={currentStep} />

      <main className="container payment-main-width px-0">
        {/* <!-- TODO 訂房商品資訊、飯店+房型+訂房個資--> */}
        <div className="row my-3 mx-0 justify-content-between">
          {/* <!-- NOTE  訂房商品資訊--> */}
          <div className="col-4 p-0 mx-0">
            <RoomItem paymentRoomDetail={orderDetail} orderItem={orderItem} />
          </div>
          {/* <!-- NOTE  飯店+房型+訂房規則--> */}
          <div className="col-8 row pe-0">
            {/* <!-- NOTE 飯店名 --> */}
            <div className="col-12 row px-0 mb-4">
              <RoomItemHotel
                paymentRoomDetail={orderDetail}
                HotelImg={hotelImg}
              />
            </div>
            <div className="room-info col-12 row p-3 ">
              {/* <!-- NOTE 房型服務資訊 --> */}
              <RoomService paymentRoomDetail={orderDetail} />
              <RoomRule />
            </div>
          </div>
        </div>

        {/* <!-- TODO 付款方式、MEMO --> */}
        <div className="row my-3 mx-0 justify-content-between">
          {/* <!-- NOTE 聯絡資料
           --> */}
          <div className="col-4 p-0 mx-0 ">
            <UserData booker={booker} />
          </div>
          <div className="col-8 row pe-0 ">
            {/* <!-- NOTE MEMO+ARRIVE --> */}
            <RoomMemo isDisabled={isDisabled} memo={memo} />
            {/* <!-- NOTE 抵達時間 資訊 --> */}
          </div>
        </div>
        <form>
          {/* <!-- TODO 付款方式資料 --> */}
          <div className=" row w-100 mx-0">
            <div className="col-12 p-0">
              <div className="payment-detail d-flex flex-column mb-3 px-5 ">
                <div className="contact-title d-flex align-items-center justify-content-between my-3 px-0 pt-3">
                  <h3 className="title">填寫付款資料</h3>
                  <button
                    className="my-btn d-flex align-items-center justify-content-around  "
                    onClick={handleGetCard}
                  >
                    <span className="material-symbols-rounded">
                      credit_card
                    </span>
                    <span>我的信用卡</span>
                  </button>
                </div>
                <CheckOutCreditCard
                  creditCard={creditCard}
                  userCreditCard={userCreditCard}
                  updateValue={updateValue}
                />
                <div className="notice w-100 py-3 text-right">
                  <h5 className="d-flex justify-content-end">
                    本訂單無須CVC 安全碼
                  </h5>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- TODO 提醒 --> */}
          <div className="row w-100 mb-3 mx-0">
            {/* <!-- TODO 提醒--> */}
            <div className=" memo-form col-12 d-flex justify-content-center align-items-center px-5 py-4  mb-3">
              <h4 className="my-0">計畫有變？</h4>
              <ul className="my-0">
                <li className="">
                  {' '}
                  別擔心，在2022年12月19日之前您都可以隨需要更改日期，
                  房客詳細資料，新增特別要求或者取消預定。
                </li>
              </ul>
            </div>
            {/* <!-- TODO 分析與情報通知 --> */}
            <div className="col-4 p-0">
              <div className=" memo-form  d-flex justify-content-center align-items-center px-5 py-4">
                <span>
                  所選日期台北住宿數量有限：
                  <br />
                  快來訂房吧！！！
                </span>
              </div>
            </div>
            <div className="col-8 p-0 ps-3">
              <div className="memo-form h-100 d-flex align-items-center">
                <div className="poicy-argee px-5 py-2 d-flex align-items-center">
                  <input
                    type="checkbox"
                    name="subscribe"
                    id="subscribe"
                    value={isChecked}
                    className=" mx-3"
                    onChange={handleArgee}
                  />
                  是，我同意接受<a href="">隱私權條款</a>
                  並通知我來七桃優惠資訊。
                </div>
              </div>
            </div>
          </div>
          {/* <!-- TODO 前往付款button --> */}
          <div className="topay d-flex justify-content-center w-25 mx-auto pt-4 pb-5 row ">
            <button
              className=" my-btn col text-decoration-none mx-1"
              onClick={handleCheckOut}
            >
              確認付款
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default HotelPaymentCheckOut;
