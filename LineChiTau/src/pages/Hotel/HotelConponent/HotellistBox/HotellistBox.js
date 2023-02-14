import React, { useEffect, useState } from 'react';
import './HotellistBox.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import HotelListFilter from '../HotelListFilter/HotelListFilter';
import axios from 'axios';
import DisplayMap from '../DisplayMap/DisplayMap';
import UserLikeBookmark from '../UserLikeBookmark/UserLikeBookmark';

const HotellistBox = ({ hotelServiceListArray }) => {
  const [error, setError] = useState();
  const { region } = useParams();
  const [hotelList, setHotelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelType = ['全部', '飯店', '民宿', '青旅'];
  const [filterCondition, setFilterCondition] = useState({
    type: '1',
    hotelService: [],
    priceFrom: 0,
    priceTo: Number.MAX_SAFE_INTEGER,
  });
  // console.log('aaaa', filterCondition);

  const [hotelListArrange, setHotelListArrange] = useState([]);
  useEffect(() => {
    async function getHotelList() {
      let response = await axios.get(
        `http://localhost:3001/api/hotelList/${region}`
      );
      // console.log(response.data);
      setHotelList(response.data);
    }

    getHotelList();
  }, [region]);
  useEffect(() => {
    const newhotelListArrange = hotelList.map((room, i) => {
      const {
        wifi,
        pool,
        gym,
        restaurant,
        bar,
        parking,
        laundry,
        meeting_room,
        arcade,
        elevator,
        store_luggage,
        counter,
        pet,
        tv,
        meal,
        mini_bar,
        window,
        corner,
        bathroom,
        tub,
        shower,
        sofa,
        hair_dryer,
        cooler,
        warmer,
        morning_call,
        slipper,
        pajamas,
        high_floor,
        air_purifier,
      } = room;
      const hotelServiceList = [
        { service: 'WIFI', value: wifi },
        { service: '泳池', value: pool },
        { service: '健身房', value: gym },
        { service: '餐廳', value: restaurant },
        { service: 'BAR', value: bar },
        { service: '停車場', value: parking },
        { service: '洗衣間', value: laundry },
        { service: '會議室', value: meeting_room },
        { service: '娛樂間', value: arcade },
        { service: '電梯', value: elevator },
        { service: '行李寄放', value: store_luggage },
        { service: '櫃台服務', value: counter },
        { service: '寵物友善', value: pet },
        { service: '液晶電視', value: tv },
        { service: '提供餐點', value: meal },
        { service: '迷你吧', value: mini_bar },
        { service: '窗戶房', value: window },
        { service: '邊間', value: corner },
        { service: '高樓層', value: high_floor },
        { service: '獨立浴室', value: bathroom },
        { service: '浴缸房', value: tub },
        { service: '淋浴間', value: shower },
        { service: '沙發', value: sofa },
        { service: '吹風機', value: hair_dryer },
        { service: '冷氣機', value: cooler },
        { service: '暖氣機', value: warmer },
        { service: '晨喚服務', value: morning_call },
        { service: '免費拖鞋', value: slipper },
        { service: '睡袍', value: pajamas },
        { service: '空氣清淨機', value: air_purifier },
      ];

      const hotelServiceListFilter = hotelServiceList
        .filter((v, i) => {
          return v.value !== 0;
        })
        .map((v) => {
          return v.service;
        });
      room.service = hotelServiceListFilter;
      room.translate = -300;
      return room;
    });
    setHotelListArrange(newhotelListArrange);
  }, [hotelList]);
  console.log('filterCondition', filterCondition);

  const [hotelListArrangeState, setHotelListArrangeState] = useState([]);
  useEffect(() => {
    if (hotelListArrange.length > 0) setHotelListArrangeState(hotelListArrange);
  }, [hotelListArrange]);

  function filterHotels(hotelArr, conditions, type, priceFrom, priceTo) {
    return hotelArr.filter((hotel) => {
      return (
        conditions.every((condi) => hotel.service.includes(condi)) &&
        (hotel.category === type || hotel.valid == type) &&
        hotel.lowest_price >= priceFrom &&
        hotel.lowest_price <= priceTo
      );
    });
  }
  const getHotelListPage = function (hotelArr) {
    const chunk = 7;
    const newListFilter = [];
    for (let i = 0; i < hotelArr.length; i += chunk) {
      newListFilter.push(hotelArr.slice(i, i + chunk));
    }
    return newListFilter;
  };

  useEffect(() => {
    setHotelListArrangeState(
      getHotelListPage(
        filterHotels(
          hotelListArrange,
          filterCondition.hotelService,
          filterCondition.type,
          filterCondition.priceFrom,
          filterCondition.priceTo
        )
      )
    );
  }, [filterCondition, hotelListArrange]);
  // console.log('1111111', hotelListArrangeState);
  const [pagenation, setPagenation] = useState([]);
  useEffect(() => {
    const ucPagenation = [];
    for (
      let i = 1;
      i <=
      getHotelListPage(
        filterHotels(
          hotelListArrange,
          filterCondition.hotelService,
          filterCondition.type,
          filterCondition.priceFrom,
          filterCondition.priceTo
        )
      ).length;
      i++
    ) {
      ucPagenation.push(i);
    }
    setPagenation(ucPagenation);
  }, [hotelListArrangeState]);
  const [isOpenMap, setIsOpenMap] = useState(false);
  return (
    <>
      <div className="container-xl hotellist-box">
        {isOpenMap && (
          <div className="position-fixed display-map">
            <div
              className="material-symbols-outlined close-detail-pic my"
              onClick={() => {
                setIsOpenMap(false);
              }}
              role="button"
            >
              close
            </div>
            <DisplayMap
              hotelListArrangeState={hotelListArrangeState}
              mapHeight={'60vh'}
            />
          </div>
        )}
        <div className="d-flex justify-content-between align-items-end">
          <p className="my-topic" id="top">
            關鍵字:{localStorage.getItem('destination')} / 共{' '}
            {hotelListArrangeState.length === 0
              ? 0
              : hotelListArrangeState
                  .map((v) => {
                    return v.length;
                  })
                  .reduce((acc, cur) => {
                    return acc + cur;
                  })}{' '}
            項{' '}
          </p>
        </div>

        <div className="row mb-5">
          <div className="col-3 px-3">
            <HotelListFilter
              hotelServiceListArray={hotelServiceListArray}
              hotelType={hotelType}
              setFilterCondition={setFilterCondition}
              filterCondition={filterCondition}
              hotelListArrangeState={hotelListArrangeState}
              setIsOpenMap={setIsOpenMap}
            />
          </div>
          <div className="col-9">
            {hotelListArrangeState.length === 0 ? (
              <p className="title my-banner">查無飯店</p>
            ) : (
              getHotelListPage(
                filterHotels(
                  hotelListArrange,
                  filterCondition.hotelService,
                  filterCondition.type,
                  filterCondition.priceFrom,
                  filterCondition.priceTo
                )
              ).map((hotelListPage, hotelListPage_i) => {
                return (
                  <div
                    key={hotelListPage_i}
                    className={
                      currentPage === hotelListPage_i + 1 ? 'd-block' : 'd-none'
                    }
                  >
                    {hotelListPage.map((room, room_i) => {
                      return (
                        <div className="d-flex" key={room_i}>
                          <div className="products-card row mb-4">
                            <div className="d-flex hotellist-pic-box col-3 px-0 my-border-radius position-relative">
                              <div
                                className="material-symbols-outlined detail-pic-arrow position-absolute detail-pic-arrowpre text-center"
                                onClick={() => {
                                  const newHotelListArrangeState = [
                                    ...hotelListArrangeState,
                                  ];
                                  hotelListPage.map((hotel) => {
                                    let bannerLength =
                                      room.company_banner.split(',').length;
                                    if (
                                      hotel.company_name === room.company_name
                                    ) {
                                      if (hotel.translate === 0) {
                                        hotel.translate =
                                          (bannerLength - 1) * -300;
                                      } else {
                                        hotel.translate += 300;
                                      }
                                    }
                                    console.log(newHotelListArrangeState);
                                    setHotelListArrangeState(
                                      newHotelListArrangeState
                                    );
                                  });
                                }}
                              >
                                chevron_left
                              </div>
                              <div
                                className="d-flex display-pic"
                                style={{
                                  transform: `translateX(${room.translate}px)`,
                                }}
                              >
                                {room.company_banner
                                  .split(',')
                                  .map((pic, i) => {
                                    return (
                                      <div key={i}>
                                        <img
                                          src={`/images/${pic}`}
                                          alt={room.company_name}
                                          className="products-card-pic"
                                        />
                                      </div>
                                    );
                                  })}
                              </div>
                              <div
                                className="material-symbols-outlined detail-pic-arrow position-absolute detail-pic-arrownext"
                                onClick={() => {
                                  const newHotelListArrangeState = [
                                    ...hotelListArrangeState,
                                  ];
                                  let bannerLength =
                                    room.company_banner.split(',').length;
                                  hotelListPage.map((hotel) => {
                                    if (
                                      hotel.company_name === room.company_name
                                    ) {
                                      if (
                                        hotel.translate <=
                                        (bannerLength - 1) * -300
                                      ) {
                                        hotel.translate = 0;
                                      } else {
                                        hotel.translate -= 300;
                                      }
                                    }
                                    // console.log(hotel.translate);
                                    setHotelListArrangeState(
                                      newHotelListArrangeState
                                    );
                                  });
                                }}
                              >
                                chevron_right
                              </div>
                            </div>
                            <div className="mx-3 my-2 col px-0">
                              <h5 className="nav-foot">{room.company_name}</h5>
                              <p className="my-p text-hide">
                                {room.introduction}
                              </p>
                              <ul className="list-unstyled d-flex">
                                {room.service.map((service, service_i) => {
                                  if (service_i <= 6)
                                    return (
                                      <li key={service_i}>
                                        <button className="search-tag my-border-radius my-p mx-1">
                                          {service}
                                        </button>
                                      </li>
                                    );
                                })}
                              </ul>
                              <div className="d-flex justify-content-between my-p">
                                <div className="d-flex">
                                  <div class="material-symbols-outlined ej-fill-icon">
                                    location_on
                                  </div>
                                  <p>{room.address}</p>
                                </div>
                                <div className="d-flex">
                                  <div class="material-symbols-outlined ej-fill-icon">
                                    monetization_on
                                  </div>
                                  <p>
                                    {room.lowest_price}{' '}
                                    <span className="my-p-small">起</span> / 晚
                                  </p>
                                </div>
                                <div>
                                  <UserLikeBookmark hotel={room.company_name} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/HotelDetail/${room.company_name}`}
                            className="my-p booking-btn d-flex flex-column justify-content-center pe-2"
                          >
                            <p>訂</p>
                            <p>房</p>
                            <p>去</p>
                            <span class="material-symbols-outlined">
                              arrow_forward
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}

            <div>
              <ul className="list-unstyled d-flex">
                <li
                  className="pagenation-border px-2 my-p px-2 d-flex justify-content-center previous"
                  role="button"
                >
                  <a
                    href="#top"
                    class="material-symbols-outlined pagenation-arrow"
                    onClick={() => {
                      let newPage = currentPage;
                      if (currentPage === 1) {
                        newPage = 1;
                      } else {
                        newPage -= 1;
                      }
                      setCurrentPage(newPage);
                    }}
                  >
                    navigate_before
                  </a>
                </li>
                {pagenation.map((page, page_i) => {
                  return (
                    <a
                      href="#top"
                      role="button"
                      className={`pagenation-border px-2 my-p px-2 ${
                        page === currentPage ? 'pagenation-border-active' : ''
                      }`}
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                      }}
                    >
                      <li>{page}</li>
                    </a>
                  );
                })}

                <li
                  className="pagenation-border px-2 my-p px-2 d-flex justify-content-center next"
                  role="button"
                >
                  <a
                    href="#top"
                    class="material-symbols-outlined pagenation-arrow"
                    onClick={() => {
                      let newPage = currentPage;
                      if (currentPage === pagenation.length) {
                        newPage = pagenation.length;
                      } else {
                        newPage += 1;
                      }
                      setCurrentPage(newPage);
                    }}
                  >
                    navigate_next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotellistBox;
