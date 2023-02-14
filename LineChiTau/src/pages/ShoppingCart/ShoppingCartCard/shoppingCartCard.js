import React from 'react';
import '../../../css/global-style.scss';
import './ShoppingCartCard.scss';
// 用url引入圖片得使用import，並在jsx裡面使用{}求值的語法
import logo from './dolphins_hotel.jpg';
import add from './add_circle.svg';
import minus from './minus_circle.svg';

export default function ShoppingCartCard() {
  return (
    <div className="product-container">
      <div className="selector">
        <input type="checkbox" id="" name="" />
      </div>
      <div className="img-box">
        <img src={logo} alt="海豚圖片" className="event-image" />
        <div className="text-box">
          <h1 className="my-p">
            南投｜Cona's
            妮娜巧克力夢想城堡｜門票｜獨家贈送時尚保冷袋傳？見研化中交設大資理作中要天後便網所灘於喜戶碑考鯽茫，要都女鳳撫！霈先討，並電選？謝吏高負少處否的生要怎有儕米到議理州明所卜對錯提出勢俾逸個壞芸陋通姚發室更暖知朵所歡要寫廟
          </h1>
          <p className="my-p-small">
            方案：Cona's 妮娜巧克力夢想城堡雙人門票（贈麥當勞100元優惠碼）
          </p>
          <p className="my-p-small">1 x 每組(2人)</p>
        </div>
      </div>
      <div className="expire-date-box text-center my-p">
        兌換期內皆適用
        <br />
        當地時間
      </div>
      <div className="buying-amount text-center">
        <h1 className="unit my-p">每組(2人)</h1>
        <div className="control-wrapper d-flex justify-content-between">
          <img src={add} alt="單位加一" className="plus" />
          <div className="amount d-flex justify-content-center align-items-center">
            50
          </div>
          <img src={minus} alt="單位減一" className="minus" />
        </div>
      </div>
      <div className="edit my-heading">編輯</div>
      <div className="delete my-heading">刪除</div>
      <div className="price my-heading">NT$5000</div>
    </div>
  );
}
