import React, { useEffect, useContext, useState } from 'react';
import './ListDetail.scss';
import pic1 from '../images/pic1.png';
import { useQuery } from 'react-query';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { JwtCsrfTokenContext } from '../../../../../utils/csrf-hook/useJwtCsrfToken';
import Pagination from '../../../../layouts/Pagination';
// import { Pagination } from '@douyinfe/semi-ui';
const moment = require('moment');
const ListDetail = () => {
  const navigate = useNavigate();
  // const [category, setCategory] = useState([]);

  const { jwtToken, userF, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(2);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  // const listid = props.listid.listid;
  const { id } = useParams();
  /* const detailList = async () => {
    const res = await fetch(
      `http://localhost:3001/api/userlist/list/${jwtDecodedData.email}/${id}`
    );
    const resdetail = await fetch(
      `http://localhost:3001/api/userlist/listdetail/${jwtDecodedData.email}/${id}`
    );
    const listdata = await res.json();
    const listdatadetail = await resdetail.json();
    // console.log(JSON.parse(response));
    return listdata, listdatadetail;
  };
  const {
    data: listdata,
    isLoading,
    isError,
  } = useQuery('listdetail', detailList, {
    cacheTime: 1000,
  }); */
  const settings = {
    dots: true,
  };
  const detailList = async () => {
    const [res, resdetail] = await Promise.all([
      fetch(
        `http://localhost:3001/api/userlist/list/${jwtDecodedData.email}/${id}`
      ),
      fetch(
        `http://localhost:3001/api/userlist/listdetail/${jwtDecodedData.email}/${id}`
      ),
    ]);
    const listdata = await res.json();
    const listdatadetail = await resdetail.json();
    return { listdata, listdatadetail };
  };

  const { data, isLoading, isError } = useQuery(
    ['listdetail', jwtDecodedData.email, id],
    detailList,
    {
      cacheTime: 1000,
    }
  );

  let result, detail;

  if (data === undefined) {
    return <>Loading...</>;
  }
  const { listdatadetail, listdata } = data;
  console.log('data', listdata);

  if (listdata.error) {
    return <>error</>;
  }
  if (data !== undefined) {
    [result] = listdata;
    detail = listdatadetail;
  }
  const currentPosts = detail.slice(firstPostIndex, lastPostIndex);

  console.log('1', data);
  console.log('data', listdata);
  console.log('listdatadetail', listdatadetail);

  console.log(id);
  console.log('result', result);
  console.log('detail', detail);
  console.log(detail.length);
  if (isError) {
    console.log('錯了');
  }
  let statusText =
    result.state === 0 ? (
      <>
        <Link
          to={`/payment/Hotel/CheckOut/${id}`}
          className="my-btn check-out"
          onclick={() => {
            console.log('click');
            // navigate(`/payment/Hotel/CheckOut/${id}`); // 跳轉到/target頁
          }}
        >
          未付款
        </Link>
        <Link className="my-btn check-out" to={`/profile/pay-order/${id}`}>
          Linepay
        </Link>
      </>
    ) : result.state === 1 ? (
      '已付款'
    ) : (
      '已取消'
    );

  return (
    <div className="container-listdetail">
      <div className="confirm-order">
        <div className="top-listdetail">
          <div className="text1 h1">訂單資訊</div>

          <div className="text2">
            <div className="t-1">
              訂單號:
              <br />
              {result.order_id}
            </div>
            <div className="t-2">
              購買時間:{moment(result.order_date).format('YYYY/MM/DD')}
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <div className="letf-1">
              實付金額：NT$
              {result.discount === 0
                ? result.total_price
                : result.total_price * (result.discount / 10)}
            </div>
            <div className="left-2">付款詳情：{statusText}</div>
          </div>
          <div className="btn">
            {/* <button className="my-btn mx-2">查看憑證</button> */}

            {/* <Link
              to={`/hotelDetail/${result.company_name}`}
              className="my-btn "
            >
              撰寫評價
            </Link> */}
          </div>
        </div>
      </div>
      <div className=" order-infomation">
        <div className="title-listdetail">
          <div className=" h1">訂購詳情</div>
          <Pagination
            totalPosts={detail.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        <hr className="hr-listdetail" />
        <div className="detail-page">
          {currentPosts.map((v, i) => {
            return (
              <div className="list-detail">
                <img src={`/images/${v.picture.split(',')[0]}`} alt="" />
                <div className="list-item">
                  <div className="subtitle">限時8折</div>
                  <div className="sub-item">
                    <div className="sub-item-title">方案類型</div>
                    <div className="sub-item-text">{v.room_name}</div>
                  </div>
                  <hr />
                  <div className="sub-item">
                    <div className="sub-item-title">參加日期</div>
                    <div className="sub-item-text">
                      {moment(v.start_date).format('YYYY/MM/DD')}
                    </div>
                  </div>
                  <hr />
                  <div className="sub-item">
                    <div className="sub-item-title">現有預定</div>
                    <div className="sub-item-text">{v.detail_amount}間房</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="list-detail">
          <img src={''} alt="" />
          <div className="list-item">
            <div className="subtitle">限時8折</div>
            <div className="sub-item">
              <div className="sub-item-title">方案類型</div>
              <div className="sub-item-text">賞鯨&環繞龜山島</div>
            </div>
            <hr />
            <div className="sub-item">
              <div className="sub-item-title">參加日期</div>
              <div className="sub-item-text">2020年9月5日 1:00PM(當地時間)</div>
            </div>
            <hr />
            <div className="sub-item">
              <div className="sub-item-title">現有預定</div>
              <div className="sub-item-text">{result.total_amount}位參加</div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="qa">
        <div className="top-listdetail h1">遇到訂單問題嗎?</div>
        <hr />
        <div className="bottom">
          <button className="my-btn">線上客服</button>
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
