import React, { useState, useEffect } from 'react';
// import pic3 from '../../img/Hotel1/rocky-DBL.jpg';
import './Recommend.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserLikeBookmark from '../../Hotel/HotelConponent/UserLikeBookmark/UserLikeBookmark';
export const Recommend = ({ love, lovename, setLove }) => {
  const [cardIsHover, setCardIsHover] = useState(false);
  const [hotelList, setHotelList] = useState([]);
  const [listFilter, setListFilter] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [viewMoreCount, setViewMoreCount] = useState(0);
  const getListFilter = function () {
    const chunk = 3;
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

  return (
    <>
      <div className="recommend-to-jerry container-xxl  pb-2">
        <h4 className="jerry-title title my-heading text-center  ">
          {lovename ? lovename : null}
        </h4>
        {displayList.map((v, i) => {
          return (
            v && (
              <div className="jerry-card cards d-flex justify-content-center mb-5" key={i}>
                {v.map((v2, i2) => {
                  return (
                    <div className="hover-area" key={v2.company_name}>
                      <div className="small-card mx-3">
                        <div className="position-relative">
                          <UserLikeBookmark
                            hotel={v2.company_name}
                            position={'position-absolute'}
                            setLove={setLove}
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
                        <div class="material-symbols-outlined">
                          arrow_forward
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          );
        })}
        {/*  <div className="text-center mt-3 mb-5">
          <button
            className="my-btn nav-foot"
            onClick={() => {
              setViewMoreCount(viewMoreCount + 1);
            }}
          >
            查看更多
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Recommend;
