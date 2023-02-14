import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import Calendar from '../Hotel/HotelConponent/Calendar/Calendar';
import { useNavigate, useParams } from 'react-router-dom';

import AmountSelect from './TripComponent/AmountSelect';
import AddCartModal from './TripComponent/AddCartModal';

import axios from 'axios';
const TripDetail = () => {
  const { tripId } = useParams();

  const storage = localStorage;

  const [tripDetail, setTripDetail] = useState([]);
  const [tripName, setTripName] = useState([]);

  const [departTime, setDepartTime] = useState('');

  const [openCalendar, setOpenCalendar] = useState(false);

  const [amountA, setAmountA] = useState(0);
  const [amountC, setAmountC] = useState(0);
  const [amountE, setAmountE] = useState(0);
  const [planId, setPlanId] = useState('');
  const [planName, setPlanName] = useState('');

  const [priceA, setPriceA] = useState(0);
  const [priceC, setPriceC] = useState(0);
  const [priceE, setPriceE] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [cartItems, setCartItems] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const updateValue = {
    setAmountA: (value) => {
      setAmountA(value);
    },
    setAmountC: (value) => {
      setAmountC(value);
    },
    setAmountE: (value) => {
      setAmountE(value);
    },
    setPriceA: (value) => {
      setPriceA(value);
    },
    setPriceC: (value) => {
      setPriceC(value);
    },
    setPriceE: (value) => {
      setPriceE(value);
    },
    setTotalPrice: (value) => {
      setTotalPrice(value);
    },
    setPlanName: (value) => {
      setPlanName(value);
    },
  };

  useEffect(() => {
    async function getTripDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/trip/TripDetail/trip/${tripId}`
      );
      console.log('responseDATA', response.data);
      if (!response.data[0]) return;
      setTripDetail(response.data);
      setTripName(response.data[0].trip_name);
      // setDescription(response.data[0].description);
      // setMemo(JSON.parse(response.data[0].description)[0].memo);
      // setBooker(JSON.parse(response.data[0].description)[0].booker);
    }
    getTripDetail();
  }, []);

  const cartItem = {
    tripId: tripId,
    tripName: tripName,
    planId: planId,
    planName: planName,
    amountA: amountA,
    amountC: amountC,
    amountE: amountE,
    priceA: priceA,
    priceC: priceC,
    priceE: priceE,
    totalPrice: totalPrice,
    departTime: departTime,
  };
  console.log('cart', cartItems);
  console.log('cart typeof', typeof cartItems);

  console.log('setTripDetail', tripDetail);
  console.log('setTripName', tripName);
  console.log('planId', planId);
  console.log('planName', planName);
  return (
    <>
      商品細節
      <div className="h1">{tripName}</div>
      <div className="row">
        {tripDetail.map((plan, index) => {
          return (
            <div>
              <input
                type="radio"
                name="plan"
                value={plan.plan_id}
                onChange={(e) => {
                  setPlanId(e.target.value);
                  setPlanName(plan.plan_name);
                }}
              />{' '}
              {plan.plan_name}
            </div>
          );
        })}
      </div>
      <div>時間</div>
      <input
        type="date"
        value={departTime}
        className="form-control"
        onChange={(e) => {
          setDepartTime(e.target.value);
        }}
      />
      <AmountSelect
        updateValue={updateValue}
        amountA={amountA}
        amountC={amountC}
        amountE={amountE}
        priceA={priceA}
        priceC={priceC}
        priceE={priceE}
        planId={planId}
        totalPrice={totalPrice}
      />
      <button
        className="my-btn"
        onClick={(e) => {
          if (cartItems.length > 0) {
            const newCartItems = [...cartItems];
            newCartItems.push(cartItem);
            setCartItems(newCartItems);
            console.log('cart-detail', newCartItems);
            // setModalOpen(true);
            storage.setItem('cart', JSON.stringify(newCartItems));
          } else {
            const newCartItems = [];
            newCartItems.push(cartItem);
            setCartItems(newCartItems);
            console.log('cart-detail', newCartItems);
            // setModalOpen(true);
            storage.setItem('cart', JSON.stringify(newCartItems));
          }
        }}
      >
        加入購物車
      </button>
      {/* {modalOpen && (
        <AddCartModal updateValue={updateValue} cartItems={cartItems} />
      )} */}
    </>
  );
};

export default TripDetail;
