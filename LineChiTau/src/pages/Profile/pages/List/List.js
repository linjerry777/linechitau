import React, { useState, useContext } from 'react';

import pic1 from './images/pic1.png';
import pic2 from './images/pic2.png';
import place from './images/place.png';
import coin from './images/coin.png';
import './List.scss';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import TList from './TList';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';
import TListLayout from './Spinner/TListLayout';
import RecommendToC from '../../layouts/Recommend';
import Recommend from '../../layouts/Recommend';
const List = () => {
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  console.log('userF', userF.email);
  console.log(jwtToken);
  const [items, setItems] = useState({});
  console.log('jwtDecodedData', jwtDecodedData);
  const getUser = async ({ queryKey }) => {
    // const response = await fetch(
    //   `https://reqres.in/api/users?page=${userF.name}`
    // );

    const response = await fetch(
      `http://localhost:3001/api/userlist/list/${jwtDecodedData.email}`
    );
    // const response = await fetch('./users.json');
    console.log('收到', response);
    const list = await response.json();
    console.log(list);
    setItems(list.data);
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
    // cacheTime: 1000,
    // enabled: false,
  });
  if (!jwtToken) {
    return (
      <>
        <div className="container-list">
          <h1 className="buytitle valign-text-middle notosans-normal-old-copper-32px">
            最新清單
          </h1>
          <div className="buylist">
            <div className="buylist-items">
              <TListLayout />
              <Link to="/login" className="TListSpinner">
                <button className="my-btn ">請登入</button>
              </Link>
            </div>
          </div>

          <Recommend />
        </div>
      </>
    );
  }
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
        <div className="container-list">
          <h1 className="buytitle valign-text-middle notosans-normal-old-copper-32px">
            最新清單
          </h1>
          <div className="buylist">
            <div className="buylist-items">
              <span>找不到訂單</span>
            </div>
          </div>

          <Recommend />
        </div>
      </>
    );
  }
  return (
    <div className="container-list">
      <h1 className="buytitle valign-text-middle notosans-normal-old-copper-32px">
        最新清單
      </h1>
      <div className="buylist">
        <div className="buylist-items">
          <TList />
        </div>
      </div>
      {!list.error && (
        <Link
          color="black"
          to="/profile/alllist"
          className="my-btn seeall"
          onClick={() => {
            console.log('click');
          }}
          disabled
        >
          查看全部
        </Link>
      )}

      <Recommend lovename={'精選推薦'} />
    </div>
  );
};

export default List;
