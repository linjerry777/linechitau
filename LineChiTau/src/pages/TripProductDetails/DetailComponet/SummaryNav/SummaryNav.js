import React from 'react';
import './SummaryNav.scss';

const SummaryNav = ({ listItems = ['客房', '地圖', '評論區', '注意事項'] }) => {
  //行程介紹', '地圖', '評論區

  return (
    <>
      <nav>
        <ul className="list-unstyled d-flex justify-content-around p-2 align-content-center">
          <li>
            <a href="#intro">行程介紹</a>
          </li>
          <li>
            <a href="#map">地圖</a>
          </li>
          <li>
            <a href="#comment">評論區</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SummaryNav;
