import './MiniShoppingCart.scss';
import MiniProductCard from './MiniProductCard/MiniProductCard';

export default function MiniShoppingCart() {
  //TODO 1.按照加入的產品數量，顯示該數量的卡片 2.顯示車裡商品數量&總價格

  //骨架

  return (
    <>
      <div className="cart-wrapper">
        <div className="stuff-container">
          <MiniProductCard />
          <MiniProductCard />
          <MiniProductCard />
        </div>
        <div className="info-container d-flex justify-content-between align-items-center">
          <div className="final-total-money">總計：NT$ 999,999</div>
          <div className="my-btn">進入購物車</div>
        </div>
      </div>
    </>
  );
}
