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
    console.log('??????');
  }
  let statusText =
    result.state === 0 ? (
      <>
        <Link
          to={`/payment/Hotel/CheckOut/${id}`}
          className="my-btn check-out"
          onclick={() => {
            console.log('click');
            // navigate(`/payment/Hotel/CheckOut/${id}`); // ?????????/target???
          }}
        >
          ?????????
        </Link>
        <Link className="my-btn check-out" to={`/profile/pay-order/${id}`}>
          Linepay
        </Link>
      </>
    ) : result.state === 1 ? (
      '?????????'
    ) : (
      '?????????'
    );

  return (
    <div className="container-listdetail">
      <div className="confirm-order">
        <div className="top-listdetail">
          <div className="text1 h1">????????????</div>

          <div className="text2">
            <div className="t-1">
              ?????????:
              <br />
              {result.order_id}
            </div>
            <div className="t-2">
              ????????????:{moment(result.order_date).format('YYYY/MM/DD')}
            </div>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <div className="letf-1">
              ???????????????NT$
              {result.discount === 0
                ? result.total_price
                : result.total_price * (result.discount / 10)}
            </div>
            <div className="left-2">???????????????{statusText}</div>
          </div>
          <div className="btn">
            {/* <button className="my-btn mx-2">????????????</button> */}

            {/* <Link
              to={`/hotelDetail/${result.company_name}`}
              className="my-btn "
            >
              ????????????
            </Link> */}
          </div>
        </div>
      </div>
      <div className=" order-infomation">
        <div className="title-listdetail">
          <div className=" h1">????????????</div>
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
                  <div className="subtitle">??????8???</div>
                  <div className="sub-item">
                    <div className="sub-item-title">????????????</div>
                    <div className="sub-item-text">{v.room_name}</div>
                  </div>
                  <hr />
                  <div className="sub-item">
                    <div className="sub-item-title">????????????</div>
                    <div className="sub-item-text">
                      {moment(v.start_date).format('YYYY/MM/DD')}
                    </div>
                  </div>
                  <hr />
                  <div className="sub-item">
                    <div className="sub-item-title">????????????</div>
                    <div className="sub-item-text">{v.detail_amount}??????</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="list-detail">
          <img src={''} alt="" />
          <div className="list-item">
            <div className="subtitle">??????8???</div>
            <div className="sub-item">
              <div className="sub-item-title">????????????</div>
              <div className="sub-item-text">??????&???????????????</div>
            </div>
            <hr />
            <div className="sub-item">
              <div className="sub-item-title">????????????</div>
              <div className="sub-item-text">2020???9???5??? 1:00PM(????????????)</div>
            </div>
            <hr />
            <div className="sub-item">
              <div className="sub-item-title">????????????</div>
              <div className="sub-item-text">{result.total_amount}?????????</div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="qa">
        <div className="top-listdetail h1">??????????????????????</div>
        <hr />
        <div className="bottom">
          <button className="my-btn">????????????</button>
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
