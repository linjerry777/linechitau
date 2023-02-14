import React from 'react';
import './ProductPictures.scss';
import pic3 from './dolphins_hotel.jpg';

const ProductPictures = () => {
  return (
    <>
        <div className="row mt-4">
          <div className="col-8 left-side">
            <div className="main-pic-box">
              <img src={pic3} className="main-pic" alt="main" />
            </div>
          </div>
          <div className="col-4 d-flex flex-column justify-content-between">
            <div className="vice-pic-box">
              <img src={pic3} className="vice-pic" alt="vice" />
            </div>
            <div className="vice-pic-box">
              <img src={pic3} className="vice-pic" alt="vice" />
            </div>
          </div>
        </div>
    </>
  );
};

export default ProductPictures;
