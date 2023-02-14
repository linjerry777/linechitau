import React, { useEffect, useState } from 'react';
import ShoppingCartCard from './ShoppingCartComponent/ShoppongCartCard/ShoppingCartCard';
import './ShoppingCart.scss';
import ProgressBar from '../PaymentComponent/ProgressBar/ProgressBar';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { set } from 'date-fns';

export default function ShoppingCart() {
  const [amount, setAmount] = useState(1);
  const currentStep = 1;
  const storage = localStorage;
  const cartStorage = storage.getItem('cart');
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsToPay, setCartItemsToPay] = useState([]);
  const [cartItemsLength, setCartItemsLenght] = useState(cartItems.length);
  const [cartItemsTotalPrice, setCartItemsTotalPrice] = useState(0);
  const [itemDetail, setItemDetail] = useState({});

  // const [amountA, setAmountA] = useState(0);
  // const [amountC, setAmountC] = useState(0);
  // const [amountE, setAmountE] = useState(0);
  // const [priceA, setPriceA] = useState(0);
  // const [priceC, setPriceC] = useState(0);
  // const [priceE, setPriceE] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  const updateValue = {
    // setAmountA: (value) => {
    //   setAmountA(value);
    // },
    // setAmountC: (value) => {
    //   setAmountC(value);
    // },
    // setAmountE: (value) => {
    //   setAmountE(value);
    // },
    // setPriceA: (value) => {
    //   setPriceA(value);
    // },
    // setPriceC: (value) => {
    //   setPriceC(value);
    // },
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
  const handleClear = function (e) {
    e.preventDefault();
    setCartItems([]);
    storage.setItem('cart', JSON.stringify([]));
  };

  useEffect(() => {
    if (cartStorage === []) {
      setCartItems([]);
    } else {
      setCartItems(JSON.parse(storage.getItem('cart')));
    }
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
  }, [cartItems]);

  console.log('storage.getItem(cart)===null', cartStorage);
  console.log(cartItems);
  console.log('cartItems.length', cartItems.length);
  console.log('Array.isArray(cartItems)', Array.isArray(cartItems));
  console.log('OutCart', itemDetail);
  console.log('cartPrice', cartItemsTotalPrice);
  return (
    <>
      <ProgressBar currentStep={currentStep} />

      <div className="container main-width px-0 mb-5">
        <div>
          <h1 className="h3 title">購物車</h1>
        </div>
        <div className="p-0 m-0 row w-100">
          <div className="main-wrapper col-9 px-0">
            <div className="d-flex align-items-center cart-controll-bar justify-content-between mx-0 py-3 mb-3 row">
              <div className="selector justify-content-center text-center align-items-center col-1">
                <div className=" my-heading col-auto">移除</div>
              </div>
              <div className=" my-heading col-7">商品</div>

              <div className=" my-heading col-auto">
                <button className="my-btn " onClick={handleClear}>
                  清空購物車
                </button>
              </div>
              {/* NOTE 可以按的 */}
            </div>

            <div className="product-wrapper">
              {cartItems.length > 0 ? (
                <ShoppingCartCard
                  cartItem={cartItems}
                  cartItemsToPay={cartItemsToPay}
                  updateValue={updateValue}
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center my-heading">
                  購物車為空，快去加入商品吧!
                </div>
              )}
            </div>

            {/* <h1 className="h3 mt-5 title">以下活動需要重新認證</h1>
            <div className="product-wrapper mt-3">
              
            </div> */}
          </div>
          <div className=" col-3">
            <div className="cart-totalSub px-4 py-4">
              <div className="total nav-foot-small pt-3">
                總計 {cartItems.length} 項
              </div>

              <div class="my-topic  py-3">NT$ {cartItemsTotalPrice}</div>
              <div className="d-flex justify-content-center ">
                <Link
                  className="text-decoration-none cart-link-btn"
                  to={'/payment/Travel/Detail'}
                >
                  <button className="my-btn my-p px-3">前往結帳</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
