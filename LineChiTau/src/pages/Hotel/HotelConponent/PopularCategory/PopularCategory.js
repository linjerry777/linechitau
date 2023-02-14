import React from 'react';
import { useState, useEffect } from 'react';
import './PopularCategory.scss';
import { Link } from 'react-router-dom';
import tpe from '../../img/tpe101.jpeg';
import yln from '../../img/yln.jpg';
import png from '../../img/png.jpg';
import knm from '../../img/knm.jpg';
import tnn from '../../img/tnn.jpg';
import tch from '../../img/tch.jpg';
import hul from '../../img/hul.jpg';
import ttt from '../../img/ttt.jpg';

const PopularCategory = (props) => {
  const [category, setCategory] = useState([
    { region: '台北', picture: tpe },
    { region: '宜蘭', picture: yln },
    { region: '澎湖', picture: png },
    { region: '金門', picture: knm },
    { region: '台南', picture: tnn },
    { region: '台中', picture: tch },
    { region: '花蓮', picture: hul },
    { region: '台東', picture: ttt },
  ]);

  const moveLeft = function () {
    const newCategory = [...category];
    newCategory.push(category[0]);
    newCategory.shift();

    // console.log(category);
    setCategory(newCategory);
  };

  const moveRight = function () {
    const newCategory = [...category];
    newCategory.unshift(category[category.length - 1]);
    newCategory.pop();

    // console.log(newCategory);
    setCategory(newCategory);
  };

  return (
    <>
      <div className="popular-category container-xxl pt-5 pb-2">
        <h4 className="title my-heading ms-5 mb-3">熱門地區</h4>
        <div className="d-flex justify-content-center">
          <button className="arrow-btn-box" onClick={moveLeft}>
            <span className="material-symbols-outlined arrow-btn">
              arrow_back
            </span>
          </button>
          <div className="picture-list">
            <div className="picture-box d-flex justify-content-start">
              <ul className="d-flex justify-content-start list-unstyled">
                {category.map((v, i) => {
                  return (
                    <li key={i}>
                      <Link
                        to={`/Hotellist/${v.region}`}
                        className="text-unstyled"
                        onClick={() => {
                          localStorage.setItem('destination', v.region);
                        }}
                      >
                        <img
                          className="picture my-border-radius mx-2"
                          src={v.picture}
                          alt={v}
                        />
                        <p className="text-center my-p">{v.region}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <button className="arrow-btn-box" onClick={moveRight}>
            <span className="material-symbols-outlined arrow-btn">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PopularCategory;
