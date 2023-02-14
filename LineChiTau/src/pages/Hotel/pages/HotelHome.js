import React, { useState, useEffect, useContext } from 'react';
import HotelBanner from '../HotelConponent/HotelBanner/HotelBanner';
import PopularCategory from '../HotelConponent/PopularCategory/PopularCategory';
import PopularSearch from '../HotelConponent/PopularSearch/PopularSearch';
import PositiveFeedback from '../HotelConponent/PositiveFeedback/PositiveFeedback';
import Recommend from '../HotelConponent/Recommend/Recommend';
import RecommendToC from '../HotelConponent/RecommendToC/RecommendToC';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './HotelHome.scss';
import MomentTest from '../HotelConponent/MomentTest.js/MomentTest';
import { JwtCsrfTokenContext } from '../../../utils/csrf-hook/useJwtCsrfToken';

const Hotel = (props) => {
  const { jwtToken, init, jwtDecodedData } = useContext(JwtCsrfTokenContext);
  init(axios);

  const [error, setError] = useState(null);
  const { companyName } = useParams();
  // console.log(companyName);

  // 為了處理網址
  let navigate = useNavigate();
  const moment = require('moment');
  const [hotelDetail, setHotelDetail] = useState({});
  const [roomDetail, setRoomDetail] = useState([]);
  const Now = Date.now();
  const initStartDate = moment(Now).format('YYYY/MM/DD');
  const initEndDate = moment(Now).add(1, 'days').format('YYYY/MM/DD');
  useEffect(() => {
    async function getHotelDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelDetail/${companyName}`
      );
      // console.log(response.data[0]);
      setHotelDetail(response.data[0]);
    }
    async function getRoomDetail() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelDetail/${companyName}/rooms`
      );
      // console.log(response.data);
      setRoomDetail(response.data);
    }
    getHotelDetail();
    getRoomDetail();
    localStorage.setItem('adult', 2);
    localStorage.setItem('children', 0);
    localStorage.setItem('room', 1);
    localStorage.setItem('startDate', initStartDate);
    localStorage.setItem('endDate', initEndDate);
    localStorage.setItem('destination', '台北');
  }, []);

  return (
    <>
      <div className="banner position-relative">
        <HotelBanner
          positionAbsolute={'position-absolute'}
          bannerSearchBar={'banner-search-bar'}
          listDNone={'d-none'}
        />
      </div>
      <PopularSearch />
      <PopularCategory />
      <Recommend />
      <RecommendToC />
      {/* <PositiveFeedback /> */}
    </>
  );
};

export default Hotel;
