import React, { useEffect, useState } from 'react';
import HotelDetailPic from '../HotelConponent/HotelDetailPic/HotelDetailPic';
import HotelIntro from '../HotelConponent/HotelIntro/HotelIntro';
import RoomSelect from '../HotelConponent/RoomSelect/RoomSelect';
import Transpotation from '../HotelConponent/Transpotation/Transpotation';
import RoomService from '../HotelConponent/RoomService/RoomService';
import RoomRule from '../HotelConponent/RoomRule/RoomRule';
import DetailPicBox from '../HotelConponent/DetailPicBox/DetailPicBox';
import './HotelDetail.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HotelComment from '../HotelConponent/HotelComment/HotelComment';

const HotelDetail = (props) => {
  const [openPicBox, setOpenPicBox] = useState(false);
  const [error, setError] = useState(null);
  const { companyName } = useParams();
  // console.log(companyName);

  // 為了處理網址
  let navigate = useNavigate();

  const [hotelDetail, setHotelDetail] = useState({});
  const [roomDetail, setRoomDetail] = useState([]);

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
  }, []);

  return (
    <>
      {openPicBox && (
        <div className="position-fixed detail-pic">
          <DetailPicBox
            setOpenPicBox={setOpenPicBox}
            hotelDetail={hotelDetail}
          />
        </div>
      )}
      <HotelDetailPic setOpenPicBox={setOpenPicBox} hotelDetail={hotelDetail} />
      <HotelIntro hotelDetail={hotelDetail} />
      <RoomSelect roomDetail={roomDetail} />
      <HotelComment hotelDetail={hotelDetail} />
      <Transpotation hotelDetail={hotelDetail} />
      {/* <RoomService roomDetail={roomDetail} /> */}
      <RoomRule hotelDetail={hotelDetail} />
    </>
  );
};

export default HotelDetail;
