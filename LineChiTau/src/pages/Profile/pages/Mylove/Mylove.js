import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import pic1 from './images/pic1.png';
import pic2 from './images/pic2.png';
import place from './images/place.png';
import coin from './images/coin.png';
import './Mylove.scss';
import '../../layouts/Recommend.scss';
import { useQuery } from 'react-query';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';
import RecommendToC from '../../../Hotel/HotelConponent/RecommendToC/RecommendToC';
import Recommend from '../../layouts/Recommend';
import UserLikeBookmark from '../../../Hotel/HotelConponent/UserLikeBookmark/UserLikeBookmark';
import Pagination from '../../../layouts/Pagination';
// import TListLayout from './Spinner/TListLayout';
const Mylove = () => {
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  console.log('userF', userF.email);
  console.log(jwtToken);
  const [listFilter, setListFilter] = useState([]);

  const [items, setItems] = useState([]);
  const [love, setLove] = useState([]);
  const lovename = '我的最愛';
  const getUser = async ({ queryKey }) => {
    // const response = await fetch(
    //   `https://reqres.in/api/users?page=${userF.name}`
    // );

    const response = await fetch(
      `http://localhost:3001/api/hotelDetail/userLike/${jwtDecodedData.email}/1`
    );
    // const response = await fetch('./users.json');
    console.log('收到', response);
    const list = await response.json();
    console.log(list);
    getListFilter();
    setItems(list);
    return list;
  };

  const {
    data: list,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(['listdata', items], getUser, {
    // refetchOnWindowFocus: false,s
    retry: 0,
    refetchInterval: 1000,
    // cacheTime: 1000,
    // enabled: false,
  });
  console.log('list', list);
  console.log('item', items);
  console.log('listFilter', listFilter);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(2);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = listFilter.slice(firstPostIndex, lastPostIndex);
  console.log('currentPosts', currentPosts);
  const getListFilter = function () {
    const chunk = 3;
    const newListFilter = [];
    for (let i = 0; i < items.length; i += chunk) {
      newListFilter.push(items.slice(i, i + chunk));
    }
    // console.log('newListFilter', newListFilter);
    setListFilter(newListFilter);
  };
  if (list === undefined) {
    return (
      <>
        <span>查無資料</span>
      </>
    );
  }
  if (list.error) {
    return (
      <>
        <span>找不到訂單</span>
      </>
    );
  }
  if (items === undefined) {
    return (
      <>
        <span>查無資料</span>
      </>
    );
  }
  if (items.error) {
    return (
      <>
        <span>找不到訂單</span>
      </>
    );
  }
  // console.log(items[0].company_name);
  return (
    <div className="container-mylove">
      <div className="prefertitle valign-text-middle notosans-normal-old-copper-32px">
        我的最愛
      </div>
      <div className="recommend-to-jerry">
        {currentPosts.map((v, i) => {
          return (
            v && (
              <div className="jerry-card cards d-flex justify-content-center mb-5">
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
                          <div>
                            <img
                              src={`/images/${v2.company_banner.split(',')[0]}`}
                              alt={v2.company_name}
                              className="card-pic my-border-radius"
                            />
                          </div>
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
      </div>
      <Pagination
        totalPosts={listFilter.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      {/* <Recommend love={list} setLove={setLove} /> */}
    </div>
  );
};

export default Mylove;
