import './MiniProductCard.scss';
import pic from './dolphins_hotel.jpg';
export default function MiniProductCard() {
  //TODO 1.呈現產品圖片、產品名、方案名、方案單價、購買數量、方案總價

  //骨架

  return (
    <>
      <div className="card-wrapper d-flex">
        <div className="img-box">
          <img src={pic} alt="" className="picture" />
        </div>
        <div className="content-wrapper d-flex flex-column justify-content-evenly">
          <div className="content-name">
            南投｜Cona's 妮娜巧克力夢想城堡｜門票｜獨家贈送時尚保冷袋
          </div>
          <div className="content-plan">
            方案：Cona's 妮娜巧克力夢想城堡雙人門票（贈麥當勞100元優惠碼）
          </div>
          <div className="money-wrapper d-flex justify-content-between">
            <div className="amount-unit">1 x 每組(2人)</div>
            <div className="money-total text-danger">NT$ 999,999</div>
          </div>
        </div>
      </div>
    </>
  );
}
