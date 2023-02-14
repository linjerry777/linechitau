import React from 'react';
import logo from '../../img/cute-cat.jpg';
import './Recommend.scss';

const Recommend = () => {
  return (
    <>
      <div className="recommend-pr container-xxl pt-5 pb-2">
        <div className="words d-flex justify-content-center">
          <div className="mx-5">
            <img src={logo} alt="logo" width="500" />
          </div>
          <div className="pt-5 mx-5">
            <h4 className="my-heading pb-4">選擇來七桃</h4>
            <p className="pt-2 recommend-pr-text nav-foot-small">
              在疫情爆發前根據觀光局的統計自由行旅客占比將近8成，在如此懸殊比例下，旅遊性質網站如雨後春筍般出現在市面上，有許多耳熟能詳的，也還有許多在努力增加市占的網頁，但對於一些比較少以自由行方式出遊的人時比較容易會忽略一些旅遊網站的眉眉角角，且操作介面通常較為複雜，且有很多不同的投放性質廣告，為了避免這些問題我們會著重於以下三點來突顯出「來七桃」這個品牌。
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommend;
