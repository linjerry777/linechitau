import React from 'react';
import ShoppingCartCard from './ShoppingCartCard/shoppingCartCard';
import './ShoppingCart.scss';

export default function ShoppingCart() {
  return (
    <div className="big-wrapper">
      <h1 className="my-topic">購物車</h1>
      <div className="main-wrapper ">
        <div className="d-flex align-items-center justify-content-between interaction-container">
          <input type="checkbox" name="" id="" className="item1" />
          <div className="item2 my-heading">全選</div>
          <div className="item3 my-heading">剩餘產品</div>
          <div className="item4 my-heading">清除已失效產品</div>
        </div>
        <div className="buy-container">
          <div className="total my-heading">總計 5 項</div>
          <div className="price-and-buy d-flex flex-column justify-content-evenly">
            <h1 class="my-topic text-center">NT$ 99999</h1>
            <button className="my-btn my-heading">結帳去</button>
          </div>
        </div>
        <div className="product-wrapper">
          <ShoppingCartCard />
        </div>
      </div>

      <h1 className="my-topic mt-5">以下活動需要重新認證</h1>
      <div className="product-wrapper mt-3">
        <ShoppingCartCard />
      </div>
    </div>
  );
}
