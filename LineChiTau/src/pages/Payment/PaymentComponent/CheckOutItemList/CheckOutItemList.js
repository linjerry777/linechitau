import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useOutletContext,
} from 'react-router-dom';
import CheckOutItemListTabBody from './CheckOutItemListTab.js/CheckOutItemListTabBody';
import CheckOutItemListTabTitle from './CheckOutItemListTab.js/CheckOutItemListTabTitle';

const CheckItemList = (props) => {
  console.log(props);
  const [subTotal, setSubTotal] = useState(0);
  const [tabId, setTabId] = useState(0);
  const [currentTab, setCurrentTab] = useState(props.initTab);
  console.log('TAB init', props.initTab);
  const handleTabClick = (tabClick) => {
    setCurrentTab(tabClick);
  };
  const updateValue = {
    setSubTotal: (value) => {
      setSubTotal(value);
    },
    setTabId: (value) => {
      setTabId(value);
    },
  };
  console.log('list------', props.orderItems);
  useEffect(() => {
    setCurrentTab(props.initTab);
  }, [props.initTab]);
  return (
    <>
      <div className="sub-section h-100 row justify-content-center justify-content-between  mb-3 px-3  mx-0">
        <div className="items-tabs d-flex flex-column row col-4 py-3 mx-0">
          {props.orderItems.map((orderItem, index) => (
            <CheckOutItemListTabTitle
              key={index}
              id={orderItem.order_detail_id}
              title={orderItem.trip_name}
              updateTab={handleTabClick}
              currentTab={currentTab}
            />
          ))}
        </div>
        <div className="items col-8 row py-3 mx-0">
          {props.orderItems.map((orderItem, index) => (
            <CheckOutItemListTabBody
              key={index}
              currentTab={currentTab}
              id={orderItem.order_detail_id}
              orderItem={orderItem}
              updateValue={updateValue}
              // itemName={orderItem.itemName}
              // itemChosen={orderItem.itemChosen}
              // price={orderItem.price}
              // amount={orderItem.amount}
              // chosenStartDate={orderItem.chosenStartDate}
              // chosenEndDate={orderItem.chosenEndDate}
            ></CheckOutItemListTabBody>
          ))}
        </div>
        <div className="sub-total sub-price d-flex justify-content-between mb-3 align-items-center px-3">
          {' '}
          總計：{' '}
          <span>
            {/* {props.cartItems.map((cartItem, index) => {
              subTotal += parseInt(cartItem.price * cartItem.amount);
            })} */}
            {subTotal} 元
          </span>
        </div>
      </div>
    </>
  );
};
export default CheckItemList;
