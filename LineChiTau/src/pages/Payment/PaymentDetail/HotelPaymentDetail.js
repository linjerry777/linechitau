import React, { useEffect, useState, useContext } from 'react';
import '../layout/payment.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';

import './HotelPaymentDetail.scss';
import ProgressBar from '../PaymentComponent/ProgressBar/ProgressBar';
import ProductImg from '../../Hotel/img/banner.svg';
import RoomItem from '../PaymentComponent/RoomItem/RoomItem';
import RoomItemHotel from '../PaymentComponent/RoomItemHotel/RoomItemHotel';
import RoomService from '../PaymentComponent/RoomServiceRule/RoomService';
import RoomRule from '../PaymentComponent/RoomServiceRule/RoomRule';
import RoomBooker from '../PaymentComponent/RoomBooker/RoomBooker';
import RoomMemo from '../PaymentComponent/RoomMemo/RoomMemo';
import UseDiscount from '../PaymentComponent/UseDiscount/UseDiscount';
import RoomArriveTime from '../PaymentComponent/RoomArriveTime/RoomArriveTime';
import { JwtCsrfTokenContext } from '../../../utils/csrf-hook/useJwtCsrfToken';
const moment = require('moment');

const HotelPaymentDetail = (props) => {
  const currentStep = 2;
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  console.log('jwtDecodedData．userEmail', jwtDecodedData.email);
  console.log('jwtToken', jwtToken);
  const storage = localStorage;
  const hotelName = JSON.parse(storage.getItem('hotelRoom'))[0].companyName;
  const roomName = JSON.parse(storage.getItem('hotelRoom'))[0].roomName;
  const [paymentRoomDetail, setPaymentRoomDetail] = useState([]);
  const [hotelImg, setHotelImg] = useState('');
  const [userCoupon, setUserCoupon] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(jwtDecodedData.email);
  const [tel, setTel] = useState('');
  const [country, setCountry] = useState('');
  const [lang, setLang] = useState('');
  const isDisabled = false;
  const [memo, setMemo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountId, setDiscountId] = useState(0);
  const name = lastName + firstName;

  const userEmail = jwtDecodedData.email;
  const orderIdNum = Date.now();
  const orderId = 'NH' + orderIdNum;
  const orderDate = moment(orderIdNum).format('YYYY-MM-DD HH:mm:ss');
  const orderDateNow = moment(orderIdNum).format('YYYY-MM-DD');

  const ordersItem = JSON.parse(storage.getItem('orderItem'));
  const orderItem = ordersItem[0];
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoomDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/Detail/Hotel/${hotelName}/${roomName}`
      );
      // console.log(response.data);
      setPaymentRoomDetail(response.data[0]);
      setHotelImg(response.data[0].picture);
      console.log('INNGG in api ', response.data[0].picture);
    }
    getRoomDetail();
    async function getUserCoupons() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/Detail/Hotel/userCoupons/${jwtDecodedData.email}`
      );
      console.log('=====userCoupon====', response.data);
      setUserCoupon(response.data);
    }
    getUserCoupons();
  }, []);
  useEffect(() => {
    async function getUseCoupon() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/Detail/Hotel/coupon/${discountId}`
      );
      console.log(
        'getUseCoupongetUseCoupongetUseCoupongetUseCoupon',
        response.data
      );
      setDiscount(response.data[0].discount);
      console.log('=======discount======', response.data[0].discount);
    }
    getUseCoupon();
  }, [discountId]);
  console.log(
    '===============paymentRoomDetail================：',
    paymentRoomDetail
  );
  console.log('===============userCoupon================：', userCoupon);

  const updateValue = {
    setFirstName: (value) => {
      setFirstName(value);
    },
    setLastName: (value) => {
      setLastName(value);
    },
    setEmail: (value) => {
      setEmail(value);
    },
    setTel: (value) => {
      setTel(value);
    },
    setCountry: (value) => {
      setCountry(value);
    },
    setLang: (value) => {
      setLang(value);
    },
    setMemo: (value) => {
      setMemo(value);
    },
    setDiscount: (value) => {
      setDiscount(value);
    },
    setDiscountId: (value) => {
      setDiscountId(value);
    },
  };
  // NOTE 假價格
  const HotelImg = hotelImg.split(',');
  const amount = orderItem.conditions.room;
  const totalPrice = amount * paymentRoomDetail.price;
  console.log('orderDate：', orderDate);
  console.log('======memo=====', memo);
  async function handleSubmit(e) {
    e.preventDefault();
    // !關閉表單預設行為
    if (userEmail !== '') {
      let orderData = {
        userEmail: userEmail,
        orderIdNum: orderIdNum,
        orderDate: orderDate,
        formData: {
          name: name,
          email: email,
          tel: tel,
          country: country,
          lang: lang,
        },
        memo: memo,
        companyName: paymentRoomDetail.hotel_name,
        hotelImg: HotelImg[0],
        productId: paymentRoomDetail.hotel_room_list_id,
        price: paymentRoomDetail.price,
        totalPrice: totalPrice,
        amount: amount,
        startDate: orderItem.startDate,
        endDate: orderItem.endDate,
        discount: discount,
        discountId: discountId,
      };
      console.log(
        '=================handleSubmit===================:',
        orderData
      );
      // * ajax
      try {
        let response = await axios.post(
          'http://localhost:3000/api/payment/Detail/Hotel/order',
          orderData
        );

        navigate(`/payment/Hotel/CheckOut/${orderId}`);
      } catch (e) {
        alert('order go go ');
      }
      storage.removeItem('hotelRoom');
    } else {
      alert('請先登入後再繼續購買流程');
      navigate(`/login1`);
    }
  }
  console.log('ooooorrerder', ordersItem);
  console.log('XXXXXXXXXrrerder', orderItem);
  console.log('updateValue', updateValue);

  return (
    <>
      <ProgressBar currentStep={currentStep} />
      <main className="container payment-main-width px-0">
        {/* <!-- TODO 訂房商品資訊、飯店+房型+訂房規則--> */}
        <div className="row my-3 mx-0 justify-content-between">
          {/* <!-- NOTE  訂房商品資訊--> */}
          <div className="col-4 p-0 mx-0">
            <RoomItem
              paymentRoomDetail={paymentRoomDetail}
              orderItem={orderItem}
            />
          </div>
          {/* <!-- NOTE  飯店+房型+訂房規則--> */}
          <div className="col-8 row pe-0">
            <div className="col-12 row px-0 mb-4">
              {/* <!-- NOTE 飯店名 --> */}
              <RoomItemHotel
                paymentRoomDetail={paymentRoomDetail}
                HotelImg={HotelImg[0]}
              />
            </div>
            <div className="room-info col-12 row p-3">
              {/* <!-- NOTE 房型服務資訊 --> */}
              <RoomService paymentRoomDetail={paymentRoomDetail} />
              <RoomRule />
            </div>
          </div>
        </div>

        {/* <!-- TODO 個人資料、MEMO --> */}
        <div className="row my-3 mx-0 justify-content-between">
          {/* <!-- NOTE 填寫個人資料 --> */}
          <div className="col-4 p-0 mx-0 ">
            <RoomBooker
              firstName={firstName}
              lastName={lastName}
              email={email}
              tel={tel}
              country={country}
              lang={lang}
              updateValue={updateValue}
            />
          </div>
          {/* <!-- NOTE MEMO --> */}
          <div className="col-8 row pe-0 ">
            <RoomMemo
              isDisabled={isDisabled}
              memo={memo}
              updateValue={updateValue}
            />
          </div>
        </div>

        <div className="row w-100 mx-0 mb-3  ">
          <UseDiscount
            userCoupon={userCoupon}
            updateValue={updateValue}
            discountId={discountId}
            discount={discount}
          />
        </div>
        {/* <!-- TODO 前往付款button --> */}
        <div className="topay d-flex justify-content-center w-25 mx-auto pt-4 pb-5 row ">
          <button className=" my-btn col-auto align-items-center mx-1 py-1">
            <Link
              className="text-decoration-none d-flex align-items-center"
              to={'/'}
            >
              返回<span className="material-symbols-rounded">undo</span>
            </Link>
          </button>
          <button
            className=" my-btn col text-decoration-none mx-1"
            onClick={handleSubmit}
          >
            <span
              className="text-decoration-none "
              //to={`/payment/Hotel/CheckOut/${orderId}`}
            >
              前往付款
            </span>
          </button>
        </div>
      </main>
    </>
  );
};

export default HotelPaymentDetail;
