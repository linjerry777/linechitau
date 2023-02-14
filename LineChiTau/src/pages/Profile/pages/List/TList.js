import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import pic1 from './images/pic1.png';
import { motion, Reorder } from 'framer-motion';
import { useQuery } from 'react-query';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';
import TListLayout from './Spinner/TListLayout';
const TList = ({ value }) => {
  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  console.log('userF', userF.email);
  const moment = require('moment');

  console.log(jwtToken);
  console.log('jwtDecodedData', jwtDecodedData);
  const [items, setItems] = useState({});
  console.log(jwtDecodedData.email);
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
    // refetchInterval: 1000,
    // cacheTime: 1000,
    // enabled: false,
  });
  const [listIndex, setListIndex] = useState(0);
  const [buttonStatus, setbuttonStatus] = useState(true);
  const handleClick = () => {
    if (buttonStatus === true) {
      setListIndex(listIndex - 3);
      setbuttonStatus(false);
    } else {
      setListIndex(listIndex + 3);
      setbuttonStatus(true);
    }
  };
  console.log('list', list);
  // console.log(items);

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
  if (isLoading) {
    return (
      <>
        <span>Loading...</span>
      </>
    );
  }
  if (isFetching) {
    return <>加載中</>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (!jwtToken) {
    return (
      <>
        <TListLayout />
        <Link to="/login" className="TListSpinner">
          <button className="my-btn ">請登入</button>
        </Link>
      </>
    );
  }
  let uniqueOrders = list.filter((item, index, self) => {
    return (
      self.findIndex((t) => {
        return t.order_id === item.order_id;
      }) === index
    );
  });
  console.log('uniqueOrders', uniqueOrders);
  // if (data && data.data) {
  //   return <></>;
  // }

  return (
    <>
      {/* <Reorder.Group value={value} dragListener={false} dragControls={controls}> */}
      {uniqueOrders.map((item, index) => {
        if (index + listIndex >= 3) {
          return;
        }
        return (
          <div className=" overlap-group-1">
            <img
              className="rectangle-1911"
              src={`/images/${item.picture.split(',')[0]}`}
              alt="Rectangle 1911"
            />
            <div className="text">
              <div className="notosans-normal-old-copper-20px">
                {/* {item.order_id} */}
                {item.company_name}&nbsp;
                {item.room_name}
              </div>
              <div className="notosans-normal-sepia-16px">
                {moment(item.order_date).format('YYYY/MM/DD')}
              </div>
              <div className="notosans-normal-sepia-16px">
                實付金額：NT$ {item.total_price}
              </div>
            </div>

            <div className="button">
              <Link key={item.i} to={`/profile/listdetail/${item.order_id}`}>
                <button
                  // onClick={() => {
                  //   setlistid({ listid: v.id, propsOrNot: !false });
                  // }}
                  // listid={listid}
                  className=" button-1 notosans-normal-old-copper-16px"
                >
                  查看更多
                </button>
              </Link>
              <Link
                to={`/hotelDetail/${item.company_name}`}
                className="button-1 notosans-normal-old-copper-16px"
              >
                撰寫評價
              </Link>
            </div>
          </div>
        );
      })}
      {/* <button className="my-btn" onClick={handleClick}>
        {buttonStatus ? `ViewMore` : `ViewLess`}
      </button> */}
      {/* </Reorder.Group> */}
    </>
  );
};

export default TList;
