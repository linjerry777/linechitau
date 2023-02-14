import React, { useEffect, useState } from 'react';
import HotellistBox from '../HotelConponent/HotellistBox/HotellistBox';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HotelBanner from '../HotelConponent/HotelBanner/HotelBanner';

const Hotellist = () => {
  return (
    <>
      <HotelBanner
        justifyContentCenter={'justify-content-center'}
        my2={'my-2'}
        widthControl={'width-control'}
        listDNone={'d-none'}
      />
      <HotellistBox />
    </>
  );
};

export default Hotellist;
