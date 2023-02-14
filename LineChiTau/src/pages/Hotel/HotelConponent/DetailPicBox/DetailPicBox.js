import React, { useEffect, useState } from 'react';
import './DetailPicBox.scss';
import pic3 from '../../img/Hotel1/rocky-DBL.jpg';
import pic2 from '../../img/Hotel1/rocky-DBL2.jpg';
import pic1 from '../../img/Hotel1/rocky-family.jpg';

const DetailPicBox = (props) => {
  const { hotelDetail } = props;
  const { company_banner } = hotelDetail;
  let pic = [];
  if (typeof company_banner === 'string') {
    pic = company_banner.split(',');
  }
  // const pic = [pic1, pic2, pic3];
  const [picNum, setPicNum] = useState(0);
  const [showPicture, setShowPicture] = useState(`/images/${pic[picNum]}`);
  useEffect(() => {
    setShowPicture(`/images/${pic[picNum]}`);
    // console.log(picNum);
  }, [picNum]);
  return (
    <>
      <div className="detail-pic-box">
        <div
          className="material-symbols-outlined close-detail-pic my"
          onClick={() => {
            props.setOpenPicBox(false);
          }}
        >
          close
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div
            class="material-symbols-outlined detail-pic-arrow"
            onClick={() => {
              let picNumPre = picNum;
              picNum === 0 ? (picNumPre = pic.length - 1) : picNumPre--;
              // console.log(picNumPre, pic.length - 1)
              setPicNum(picNumPre);
            }}
          >
            chevron_left
          </div>
          <div className="display-pic">
            <img src={showPicture} alt="" className="display-bigpic-box" />
          </div>
          <div
            class="material-symbols-outlined detail-pic-arrow"
            onClick={() => {
              let picNumPre = picNum;
              picNum === pic.length - 1 ? (picNumPre = 0) : picNumPre++;
              // console.log(picNumPre, pic.length - 1)
              setPicNum(picNumPre);
            }}
          >
            chevron_right
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">
          {pic.map((v, i) => {
            return (
              <div
                key={i}
                className="display-pic-select mx-2 my-4 p-0"
                onClick={() => {
                  setPicNum(i);
                }}
              >
                <img
                  src={`/images/${v}`}
                  alt={v}
                  className={
                    picNum === i ? 'display-pic-box-active' : 'display-pic-box'
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DetailPicBox;
