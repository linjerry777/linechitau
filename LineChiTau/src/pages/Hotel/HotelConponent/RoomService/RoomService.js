import React from 'react';
import pic3 from '../../img/Hotel1/rocky-DBL.jpg';
import './RoomService.scss';

const RoomService = () => {
  return (
    <>
      <div className="container-xxl hotel-room-service p-3 mt-5">
        <h3 className="h3">設施服務</h3>
        <div className="row">
          <div className="col-6 row">
            <ul className="list-unstyled room-service-box col-6 mt-3">
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">wifi</div>
                <p>WIFI</p>
              </li>
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">pool</div>
                <p>泳池</p>
              </li>
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">fitness_center</div>
                <p>健身房</p>
              </li>
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">restaurant</div>
                <p>餐廳</p>
              </li>
            </ul>
            <ul className="list-unstyled room-service-box col-6 mt-3">
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">local_bar</div>
                <p>BAR</p>
              </li>
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">local_parking</div>
                <p>停車場</p>
              </li>
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">
                  local_laundry_service
                </div>
                <p>洗衣間</p>
              </li>
              <li className="my-p d-flex my-2">
                <div class="material-symbols-outlined me-4">meeting_room</div>
                <p>會議室</p>
              </li>
            </ul>
          </div>
          <div className="col-6">
            <div className="m-auto room-service-picbox">
              <img src={pic3} alt="pic3" className="room-service-pic" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomService;
