import React, { useState, useEffect, useContext } from 'react';
import '../layout/payment.scss';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
  useNavigate,
} from 'react-router-dom';
import ProgressBar from '../PaymentComponent/ProgressBar/ProgressBar';

import PurchaseItem from '../PaymentComponent/PurchaseItem';
import ContactPerson from '../PaymentComponent/ContactPerson/ContactPerson';
import UseDiscount from '../PaymentComponent/UseDiscount/UseDiscount';
import SubTotalList from '../PaymentComponent/SubTotalList/SubTotalList';
import { JwtCsrfTokenContext } from '../../../utils/csrf-hook/useJwtCsrfToken';
import axios from 'axios';

const TravelPaymentDetail = (props) => {
  const currentStep = 2;

  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  const navigate = useNavigate();
  const moment = require('moment');

  const userEmail = jwtDecodedData.email;
  const orderIdNum = Date.now();
  const orderId = 'NT' + orderIdNum;
  const orderDate = moment(orderIdNum).format('YYYY-MM-DD HH:mm:ss');

  const storage = localStorage;
  const cartStorage = storage.getItem('cart');
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsToPay, setCartItemsToPay] = useState([]);
  const [cartItemsLength, setCartItemsLenght] = useState(cartItems.length);
  const [cartItemsTotalPrice, setCartItemsTotalPrice] = useState(0);
  const [itemDetail, setItemDetail] = useState({});
  const [finalPrice, setFinalPrice] = useState(0);

  const [userCoupon, setUserCoupon] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountId, setDiscountId] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [country, setCountry] = useState('');
  const [lang, setLang] = useState('');

  const updateValue = {
    setName: (value) => {
      setName(value);
    },
    setTel: (value) => {
      setTel(value);
    },
    setEmail: (value) => {
      setEmail(value);
    },
    setCountry: (value) => {
      setCountry(value);
    },
    setLang: (value) => {
      setLang(value);
    },
    setDiscountPrice: (value) => {
      setDiscountPrice(value);
    },
    setFinalPrice: (value) => {
      setFinalPrice(value);
    },
    setDiscount: (value) => {
      setDiscount(value);
    },
    setDiscountId: (value) => {
      setDiscountId(value);
    },
    setCartItems: (value) => {
      setCartItems(value);
    },
    setCartItemsToPay: (value) => {
      setCartItemsToPay(value);
    },
    setItemDetail: (value) => {
      setItemDetail(value);
    },
  };

  useEffect(() => {
    if (cartStorage === []) {
      setCartItems([]);
    } else {
      setCartItems(JSON.parse(storage.getItem('cart')));
    }

    async function getUserCoupons() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/Detail/Travel/userCoupons/${jwtDecodedData.email}`
      );
      console.log('=====userCoupon====', response.data);
      setUserCoupon(response.data);
    }
    getUserCoupons();
  }, []);
  useEffect(() => {
    storage.setItem('cart', JSON.stringify(cartItems));
    const cartPrice = cartItems
      .map((cartItem, index) => {
        // console.log('item map', cartItem);
        // console.log('item map totalPrice', typeof cartItem.totalPrice);
        // setCartItemsTotalPrice(cartItemsTotalPrice + cartItem.totalPrice);
        // console.log('price map', cartItemsTotalPrice);
        return cartItem.totalPrice;
      })
      .reduce((acc, cur) => acc + cur, 0);
    setCartItemsTotalPrice(cartPrice);
    setFinalPrice(cartPrice);
    setCartItemsLenght(cartItems.length);
  }, [cartItems]);
  useEffect(() => {
    async function getUseCoupon() {
      let response = await axios.get(
        `http://localhost:3001/api/payment/Detail/Travel/coupon/${discountId}`
      );
      console.log(
        'getUseCoupongetUseCoupongetUseCoupongetUseCoupon',
        response.data
      );
      setDiscount(response.data[0].discount);
      // console.log('=======discount======', response.data[0].discount);
      // setFinalPrice(finalPrice * (discount / 10));
      // console.log('?????? finalPrice-gb', finalPrice);
      // console.log('?????? discount-gb', discount / 10);
      // console.log('??????-gb', finalPrice * (discount / 10));
    }
    getUseCoupon();
    console.log('?????? finalPrice', finalPrice);
    console.log('?????? discount', discount / 10);
    console.log('??????', finalPrice * (discount / 10));
  }, [discountId]);
  // useEffect(() => {
  //   setFinalPrice(finalPrice);
  // }, [finalPrice]);
  const [isChecked, setIsChecked] = useState(false);
  async function handleArgee(e) {
    if (e.target.checked) {
      console.log(' checked');
    } else {
      console.log('no checked');
    }
    setIsChecked((current) => !current);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // !????????????????????????
    if (userEmail !== '') {
      let orderData = {
        userEmail: userEmail,
        orderIdNum: orderIdNum,
        orderDate: orderDate,
        formData: {
          name: name,
          tel: tel,
          email: email,
          country: country,
          lang: lang,
        },
        product: cartItems,
        totalPrice: cartItemsTotalPrice,
        finalPrice:
          discount === 0 ? cartItemsTotalPrice : finalPrice * (discount / 10),
        amount: cartItemsLength,
        discount: discount,
        discountId: discountId,
      };
      console.log(
        '=================handleSubmit===================:',
        orderData
      );
      // * ajax
      if (!isChecked) {
        alert('??????????????? ???????????????????????????');
      } else {
        try {
          let response = await axios.post(
            'http://localhost:3000/api/payment/Detail/Travel/order',
            orderData
          );

          navigate(`/payment/Travel/CheckOut/${orderId}`);
        } catch (e) {
          alert('order go go ');
        }
        storage.removeItem('cart');
      }
    } else {
      alert('????????????????????????????????????');
      navigate(`/login1`);
    }
  }

  console.log('========cartItems========', cartItems);
  console.log('paDetail cartItemsTotalPrice', cartItemsTotalPrice);
  console.log('payDetial discount', discount);
  console.log('payDetialID discountId', discountId);

  return (
    <>
      <ProgressBar currentStep={currentStep} />

      <main className="container  pe-0 main-width">
        <div className=" d-flex p-0">
          {/* <!-- TODO ??????(?????????) --> */}
          <div className="item-list  col-8  gy-5 ">
            {/* <!-- NOTE ????????????  --> */}
            <div className="item-section pb-0 row col-12  mt-3 rounded-0 rounded-top ">
              <div className="contact-title d-flex align-items-center p-0">
                <h3 className="title">????????????</h3>
              </div>
            </div>
            {cartItems.length > 0 ? (
              <PurchaseItem
                cartItems={cartItems}
                cartItemsToPay={cartItemsToPay}
                updateValue={updateValue}
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center my-heading">
                ???????????????????????????????????????!
              </div>
            )}

            {/* <!-- NOTE ???????????? --> */}
            <div className="item-section row col-12  my-3">
              <ContactPerson
                email={email}
                name={name}
                tel={tel}
                country={country}
                lang={lang}
                updateValue={updateValue}
              />
            </div>
            {/* <!-- NOTE ?????? --> */}
            <UseDiscount
              userCoupon={userCoupon}
              updateValue={updateValue}
              discountId={discountId}
              discount={discount}
            />
            {/* <UseDiscount /> */}
            {/* NOTE <!-- * ???????????? --> */}
            <div className="rule-section  row col-12 pb-5">
              <div className="argee px-1 pb-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  name="subscribe"
                  id="subscribe"
                  value={isChecked}
                  className=" mx-3"
                  onChange={handleArgee}
                />
                ?????????????????????<a href="">???????????????</a>
                ????????????????????????????????????
              </div>
              <div className="alert alert-danger m-0">
                ??????????????????????????????????????????????????????????????????
              </div>
            </div>
          </div>

          {/* NOTE <!-- TODO ?????????(?????????) --> */}
          <div className="sub-list col-4 mx-0">
            {/* NOTE <!-- * total?????? --> */}
            <SubTotalList
              cartItems={cartItems}
              cartItemsTotalPrice={cartItemsTotalPrice}
              discountId={discountId}
              discount={discount}
              discountPrice={discountPrice}
              finalPrice={finalPrice}
              updateValue={updateValue}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default TravelPaymentDetail;
