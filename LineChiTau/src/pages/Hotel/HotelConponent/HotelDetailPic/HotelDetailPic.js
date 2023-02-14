import React, { useState } from 'react';
import './HotelDetailPic.scss';
import pic3 from '../../img/Hotel1/rocky-DBL.jpg';

const HotelDetailPic = (props) => {
  const { hotelDetail, setOpenPicBox } = props;
  const { company_banner } = hotelDetail;
  let banner = [];
  if (typeof company_banner === 'string') {
    banner = company_banner.split(',');
  }
  // console.log(company_banner, banner);
  return (
    <>
      <div
        className="container-xxl Hotel-Detail-Pic"
        onClick={() => {
          setOpenPicBox(true);
        }}
      >
        <div className="row mt-4">
          <div className="col-8 left-side">
            <div className="main-pic-box">
              <img
                src={`/images/${banner[0]}`}
                className="main-pic"
                alt="main"
              />
            </div>
          </div>
          <div className="col-4 d-flex flex-column justify-content-between">
            <div className="vice-pic-box mb-3">
              <img
                src={`/images/${banner[1]}`}
                className="vice-pic"
                alt="vice"
              />
            </div>
            <div className="vice-pic-box">
              <img
                src={`/images/${banner[2]}`}
                className="vice-pic"
                alt="vice"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetailPic;
