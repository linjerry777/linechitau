import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import pic1 from './images/pic1.png';
import pic2 from './images/pic2.png';
import place from './images/place.png';
import coin from './images/coin.png';
import logo from './images/logo.png';
import clock from './images/clock.svg';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { JwtCsrfTokenContext } from '../../../../utils/csrf-hook/useJwtCsrfToken';
import Pagination from '../../../layouts/Pagination';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import NewsTicker, {
  Directions,
  TickerStates,
} from 'react-advanced-news-ticker';
import './Coupon.scss';
import { logoutUrl } from '../../../../utils/csrf-hook/server-config';
const CouponItem = () => {
  const { jwtToken, userF, logout, jwtDecodedData } =
    useContext(JwtCsrfTokenContext);
  const [member, setMember] = useState({});
  const [coupon, setCoupon] = useState([]);
  const [couponed, setCouponed] = useState([]);
  console.log('userF', userF.email);
  console.log(jwtToken);
  const navigate = useNavigate();
  // const location = useLocation();
  const couponitem = async () => {
    const res = await fetch(
      `http://localhost:3001/api/coupon/couponitem/${jwtDecodedData.email}`
    );
    const listdata = await res.json();
    // console.log(JSON.parse(response));
    console.log(listdata);
    setCoupon(listdata.filter((item) => item.valid === 1));
    setCouponed(listdata.filter((item) => item.valid === 0));
    console.log('coupon', coupon);
    return listdata;
  };
  const {
    data: listdata,
    isLoading,
    isError,
  } = useQuery('listdetail', couponitem, {
    cacheTime: 1000,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(4);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  console.log(listdata);

  if (coupon.error) {
    return (
      <>
        <span>找不到訂單</span>
      </>
    );
  }
  const currentPosts = coupon.slice(firstPostIndex, lastPostIndex);
  const currentPostsed = couponed.slice(firstPostIndex, lastPostIndex);

  if (listdata === undefined) {
    return <>loading</>;
  }
  console.log('coupon1', coupon);
  return (
    <>
      <Tabs type="button">
        <TabPane tab="可使用" itemKey="1">
          {currentPosts.map((item, index) => {
            return (
              <>
                <div className="coupon-item">
                  <div className="item1">
                    <img src={logo} alt="" />
                    <div>棲桃購物</div>
                  </div>
                  <div className="item2">
                    <h1>{item.discount}折</h1>
                    <h6>低消$2000</h6>
                    <h6 className="h6-2">1.11新春狂購月</h6>
                    <div className="text-icon">
                      <img src={clock} alt="" />
                      <h6>2023.01.11起生效</h6>
                    </div>
                  </div>
                  <div className="item3">
                    <button className="my-btn">領取</button>
                    <p>使用規則</p>
                  </div>
                </div>
              </>
            );
          })}
          <Pagination
            totalPosts={coupon.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          {/* <div className="coupon-item">
        <div className="item1">
          <img src={logo} alt="" />
          <div>棲桃購物</div>
        </div>
        <div className="item2">
          <h1>{}折</h1>
          <h6>低消$2000</h6>
          <h6 className="h6-2">1.11新春狂購月</h6>
          <div className="text-icon">
            <img src={clock} alt="" />
            <h6>2023.01.11起生效</h6>
          </div>
        </div>
        <div className="item3">
          <button className="my-btn">領取</button>
          <p>使用規則</p>
        </div>
      </div> */}
        </TabPane>
        <TabPane tab="不可使用" itemKey="2">
          {currentPostsed.map((item, index) => {
            return (
              <>
                <div className="coupon-item">
                  <div className="item1">
                    <img src={logo} alt="" />
                    <div>棲桃購物</div>
                  </div>
                  <div className="item2">
                    <h1>{item.discount}折</h1>
                    <h6>低消$2000</h6>
                    <h6 className="h6-2">1.11新春狂購月</h6>
                    <div className="text-icon">
                      <img src={clock} alt="" />
                      <h6>2023.01.11起生效</h6>
                    </div>
                  </div>
                  <div className="item3">
                    <button className="my-btn">領取</button>
                    <p>使用規則</p>
                  </div>
                </div>
              </>
            );
          })}
          <Pagination
            totalPosts={couponed.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          {/* <div className="coupon-item">
        <div className="item1">
          <img src={logo} alt="" />
          <div>棲桃購物</div>
        </div>
        <div className="item2">
          <h1>{}折</h1>
          <h6>低消$2000</h6>
          <h6 className="h6-2">1.11新春狂購月</h6>
          <div className="text-icon">
            <img src={clock} alt="" />
            <h6>2023.01.11起生效</h6>
          </div>
        </div>
        <div className="item3">
          <button className="my-btn">領取</button>
          <p>使用規則</p>
        </div>
      </div> */}
        </TabPane>
      </Tabs>
    </>
  );
};

export default CouponItem;
