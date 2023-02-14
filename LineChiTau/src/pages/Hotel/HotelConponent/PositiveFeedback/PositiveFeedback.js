import React from 'react';
import pic3 from '../../img/Hotel1/rocky-DBL.jpg';
import './PositiveFeedback.scss';

export const PositiveFeedback = () => {
  return (
    <>
      <div className="positive-feedback container-xxl pt-5 pb-2 mb-5">
        <h4 className="title my-heading text-center mb-5">用戶好評</h4>
        <div className="cards d-flex justify-content-center">
          <div>
            <div className="small-card mx-3">
              <div className="position-relative">
                <span class="material-symbols-rounded my-p position-absolute recommand-tag">
                  bookmark
                </span>
                <img
                  src={pic3}
                  alt="pic3"
                  className="card-pic my-border-radius"
                />
                <h6 className="nav-foot-small my-2">娜路彎銀河酒店</h6>
                <p className="my-p text-hide">
                  娜路彎銀河酒店位於台東市，設有全年開放的室外泳池和 SPA
                  中心。此住宿附設免費私人停車位。 此住宿距離台東火車站 10
                  分鐘車程。此住宿距離鐵花村音樂聚落和台東鐵道藝術村。
                </p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div class="material-symbols-outlined my-p">
                      location_on
                    </div>
                    <p className="my-p">台東市</p>
                  </div>
                  <div className="d-flex">
                    <div class="material-symbols-outlined my-p">paid</div>
                    <p className="my-p">1000 / 晚</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="small-card mx-3">
                <div className="position-relative">
                  <span class="material-symbols-rounded my-p position-absolute tag on-hover">
                    bookmark
                  </span>
                  <img
                    src={pic3}
                    alt="pic3"
                    className="card-pic my-border-radius"
                  />
                  <h6 className="nav-foot-small my-2">娜路彎銀河酒店</h6>
                  <p className="my-p text-hide">
                    娜路彎銀河酒店位於台東市，設有全年開放的室外泳池和 SPA
                    中心。此住宿附設免費私人停車位。 此住宿距離台東火車站 10
                    分鐘車程。此住宿距離鐵花村音樂聚落和台東鐵道藝術村。
                  </p>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div class="material-symbols-outlined my-p">
                        location_on
                      </div>
                      <p className="my-p">台東市</p>
                    </div>
                    <div className="d-flex">
                      <div class="material-symbols-outlined my-p">paid</div>
                      <p className="my-p">1000 / 晚</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-hover my-p d-flex justify-content-center m-auto pt-1">
              <p>訂房去</p>
              <div class="material-symbols-outlined">arrow_forward</div>
            </div>
          </div>
          <div>
            <div className="small-card mx-3">
              <div className="position-relative">
                <span class="material-symbols-rounded my-p position-absolute tag">
                  bookmark
                </span>
                <img
                  src={pic3}
                  alt="pic3"
                  className="card-pic my-border-radius"
                />
                <h6 className="nav-foot-small my-2">娜路彎銀河酒店</h6>
                <p className="my-p text-hide">
                  娜路彎銀河酒店位於台東市，設有全年開放的室外泳池和 SPA
                  中心。此住宿附設免費私人停車位。 此住宿距離台東火車站 10
                  分鐘車程。此住宿距離鐵花村音樂聚落和台東鐵道藝術村。
                </p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div class="material-symbols-outlined my-p">
                      location_on
                    </div>
                    <p className="my-p">台東市</p>
                  </div>
                  <div className="d-flex">
                    <div class="material-symbols-outlined my-p">paid</div>
                    <p className="my-p">1000 / 晚</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="small-card mx-3">
              <div className="position-relative">
                <span class="material-symbols-rounded my-p position-absolute tag">
                  bookmark
                </span>
                <img
                  src={pic3}
                  alt="pic3"
                  className="card-pic my-border-radius"
                />
                <h6 className="nav-foot-small my-2">娜路彎銀河酒店</h6>
                <p className="my-p text-hide">
                  娜路彎銀河酒店位於台東市，設有全年開放的室外泳池和 SPA
                  中心。此住宿附設免費私人停車位。 此住宿距離台東火車站 10
                  分鐘車程。此住宿距離鐵花村音樂聚落和台東鐵道藝術村。
                </p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div class="material-symbols-outlined my-p">
                      location_on
                    </div>
                    <p className="my-p">台東市</p>
                  </div>
                  <div className="d-flex">
                    <div class="material-symbols-outlined my-p">paid</div>
                    <p className="my-p">1000 / 晚</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PositiveFeedback;
