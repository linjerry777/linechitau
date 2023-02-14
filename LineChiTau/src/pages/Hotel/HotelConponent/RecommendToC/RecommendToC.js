import React, { useState, useEffect, useContext } from 'react';
import './RecommendToC.scss';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';
import UserLikeBookmark from '../UserLikeBookmark/UserLikeBookmark';

export const RecommendToC = () => {
  const navigate = useNavigate();

  const { jwtToken, init, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  init(axios);
  console.log(JwtCsrfTokenContext);
  // console.log('userF', userF.email);
  const [cardIsHover, setCardIsHover] = useState(false);
  const [userLikeList, setUserLikeList] = useState([]);
  const [userLikeListObject, setUserLikeListObject] = useState({});

  const [hotelList, setHotelList] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [viewMoreCount, setViewMoreCount] = useState(0);
  const getListFilter = function () {
    const chunk = 4;
    const newListFilter = [];
    for (let i = 0; i < hotelList.length; i += chunk) {
      newListFilter.push(hotelList.slice(i, i + chunk));
    }
    // console.log('newListFilter', newListFilter);
    setListFilter(newListFilter);
  };
  const getDisplayList = function () {
    const newDisplayList = [];
    for (let i = 0; i < viewMoreCount; i++) {
      newDisplayList.push(listFilter[i]);
    }
    // console.log('newDisplayList', newDisplayList);
    setDisplayList(newDisplayList);
  };
  useEffect(() => {
    async function getHotelList() {
      let response = await axios.get(
        'http://localhost:3001/api/hotel/recommandToC'
      );
      setHotelList(response.data);
      // console.log(response.data);
    }
    getHotelList();
  }, []);

  useEffect(() => {
    getListFilter();
    getDisplayList();
  }, [hotelList]);

  useEffect(() => {
    if (listFilter.length > 0) setViewMoreCount(1);
  }, [listFilter]);

  useEffect(() => {
    getDisplayList();
  }, [viewMoreCount]);
  useEffect(() => {
    async function getUserLikeList() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelDetail/userLike/${jwtDecodedData.email}`
      );
      setUserLikeList(response.data);
      console.log('setUserLikeList', response.data);
    }
    if (jwtToken) getUserLikeList();
  }, []);
  useEffect(() => {
    const result = {};
    userLikeList.forEach((v) => {
      result[v.company_name] = v.valid;
    });
    // console.log('result', result);
    setUserLikeListObject(result);
  }, [userLikeList]);
  console.log('UserLikeListObject', userLikeListObject);
  const postUserLikeDB = async function (url, userEmail, hotel, valid) {
    let response = await axios.post(url, {
      email: userEmail,
      hotel: hotel,
      valid: valid,
    });
    async function getUserLikeList() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelDetail/userLike/${jwtDecodedData.email}`
      );
      setUserLikeList(response.data);
      console.log('setUserLikeList', response.data);
    }
    if (jwtToken) getUserLikeList();
    console.log(response.data);
  };

  return (
    <div className="recommend-to-c container-xxl pt-5 pb-2">
      <h4 className="title my-heading text-center mb-5">精選推薦給您</h4>
      {displayList.map((v, i) => {
        return (
          v && (
            <div className="cards d-flex justify-content-center mb-5" key={i}>
              {v.map((v2, i2) => {
                return (
                  <div className="hover-area" key={v2.company_name}>
                    <div className="small-card mx-3">
                      <div className="position-relative">
                        <UserLikeBookmark
                          hotel={v2.company_name}
                          position={'position-absolute'}
                        />
                        {v2.company_banner.split(',').map((pic, i) => {
                          if (i === 0) {
                            return (
                              <div key={i}>
                                <img
                                  src={`/images/${pic}`}
                                  alt={v2.company_name}
                                  className="card-pic my-border-radius"
                                />
                              </div>
                            );
                          }
                        })}

                        <h6 className="nav-foot-small my-2">
                          {v2.company_name}
                        </h6>
                        <p className="my-p text-hide">{v2.introduction}</p>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex">
                            <div class="material-symbols-outlined my-p">
                              location_on
                            </div>
                            <p className="my-p">{v2.region}</p>
                          </div>
                          <div className="d-flex">
                            <div class="material-symbols-outlined my-p">
                              paid
                            </div>
                            <p className="my-p">
                              {v2.lowest_price}
                              <span className="my-p-small"> 起 </span> / 晚
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      role="button"
                      className="card-hover my-p d-flex justify-content-center m-auto pt-2"
                    >
                      <Link
                        to={`/HotelDetail/${v2.company_name}`}
                        className="link"
                      >
                        <p>訂房去</p>
                      </Link>
                      <div class="material-symbols-outlined">arrow_forward</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        );
      })}
      <div className="text-center mt-3 mb-5">
        <button
          className="my-btn nav-foot"
          onClick={() => {
            setViewMoreCount(viewMoreCount + 1);
          }}
        >
          查看更多
        </button>
      </div>
    </div>
  );
};

export default RecommendToC;
