import '../../../../css/global-style.scss';
import './MainSelector.scss';
import { useState } from 'react';
import PlanDetails from './PlanDetails/PlanDetails';
import { useEffect } from 'react';
import AmountSelector from './AmountSelector/AmountSelector';
// import AmountSelector from './AmountSelector/AmountSelector';

export default function MainSelector({ planData, tripId, tripName, cartPic }) {
  //圖片檔案名稱
  console.log(cartPic);
  //購買用的state
  const storage = localStorage;
  const [departTime, setDepartTime] = useState('');
  const [amountA, setAmountA] = useState(0);
  const [amountC, setAmountC] = useState(0);
  const [amountE, setAmountE] = useState(0);
  const [planId, setPlanId] = useState('');
  const [planName, setPlanName] = useState('');
  //單價
  const [priceA, setPriceA] = useState(0);
  const [priceC, setPriceC] = useState(0);
  const [priceE, setPriceE] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [content, setContent] = useState();
  const [notice, setNotice] = useState();
  //要傳給購物車的格式
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
    cartPic: cartPic,
  };

  function checkDate() {
    if (!departTime) {
      alert('請記得選擇出發日期');
    }
  }

  useEffect(() => {
    setTotalPrice(amountA * priceA + amountE * priceE + amountC * priceC);
  }, [priceA, priceE, priceC, amountA, amountE, amountC]);

  // useEffect(() => {
  //   console.log('Content', content);
  //   console.log('notice', notice);
  // }, [content, notice]);

  return (
    <>
      <div className="main-selector">
        <div className="title-and-clear-btn d-flex justify-content-between">
          <h3 className="title-underline box-title">選擇日期及方案</h3>
        </div>
        <p className="my-p">請選擇參加日期</p>
        <div className="time-selector-wrapper d-flex">
          <input
            type="date"
            value={departTime}
            className="form_control preserved_date round-btn"
            onChange={(e) => {
              setDepartTime(e.target.value);
            }}
          ></input>
        </div>
        <p className="my-p">請選擇方案類型</p>
        <div className="plan-wrapper d-flex flew-wrap">
          {planData
            ? planData.map((item) => (
                <button
                  key={item.plan_id}
                  className="service"
                  value={item.plan_id}
                  onClick={() => {
                    checkDate();
                    setPlanId(item.plan_id);
                    setPlanName(item.plan_name);
                    setPriceA(item.price_adu);
                    setPriceE(item.price_eld);
                    setPriceC(item.price_chi);
                    // setContent(JSON.parse(item.content));
                    // setNotice(JSON.parse(item.plan_notice));
                  }}
                >
                  {item.plan_name}
                </button>
              ))
            : 0}
        </div>
        <p className="my-p">人數</p>
        <div className="preserved-amount-wrapper d-flex flex-wrap">
          {planId ? (
            <AmountSelector
              amountA={amountA}
              amountE={amountE}
              amountC={amountC}
              setAmountA={setAmountA}
              setAmountE={setAmountE}
              setAmountC={setAmountC}
              totalPrice={totalPrice}
            />
          ) : null}
        </div>
        <div className="final-total my-topic d-flex justify-content-between">
          {`NT$\t` + totalPrice}
          <div className="cart-and-buy d-flex justify-content-evenly">
            <button
              onClick={() => {
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
              className="do-cart round-btn my-p d-flex align-items-center"
            >
              放入購物車
            </button>
          </div>
        </div>
      </div>
      <PlanDetails />
    </>
  );
}
