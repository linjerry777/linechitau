import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import pic3 from '../../img/Hotel1/rocky-DBL.jpg';
import './RoomSelect.scss';
import HotelBanner from '../HotelBanner/HotelBanner';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import axios from 'axios';

const RoomSelect = (props) => {
  const storage = localStorage;
  const { roomDetail } = props;
  const [isOpenService, setIsOpenService] = useState(false);
  const [dateOrderAmountFilter, setDateOrderAmountFilter] = useState([]);
  // console.log('roomDetail', roomDetail);
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate'));
  const [endDate, setEndDate] = useState(localStorage.getItem('endDate'));
  const [selectedRoomAmount, setelectedRoomAmount] = useState(
    localStorage.getItem('room')
  );
  const [roomOrderList, setRoomOrderList] = useState([]);
  const moment = extendMoment(Moment);
  const enumerateDaysBetweenDates = (startDate, endDate) => {
    let daysList = [];
    const start = moment(startDate);
    const end = moment(endDate).subtract(1, 'day');
    const day = end.diff(start, 'days');
    daysList.push(start.format('YYYYMMDD'));
    for (let i = 1; i <= day; i++) {
      daysList.push(start.add(1, 'days').format('YYYYMMDD'));
    }
    return daysList;
  };
  const roomDetailArrange = roomDetail.map((v, i) => {
    // console.log('pic', v.picture);
    const picArray = v.picture.split(',');
    // console.log('picArray', picArray);
    return {
      id: v.id,
      hotel_name: v.hotel_name,
      room_name: v.room_name,
      room_type: v.room_type.toString(),
      price: v.price,
      amount: v.amount.toString(),
      description: v.description,
      picture: picArray,
      room: v.room,
      寵物友善房: v.pet,
      液晶電視: v.tv,
      提供餐點: v.meal,
      迷你吧: v.mini_bar,
      窗戶房: v.window,
      邊間: v.corner,
      高樓層: v.high_floor,
      獨立浴室: v.bathroom,
      浴缸房: v.tub,
      淋浴間: v.shower,
      沙發: v.sofa,
      吹風機: v.hair_dryer,
      冷氣機: v.cooler,
      暖氣機: v.warmer,
      晨喚服務: v.morning_call,
      免費拖鞋: v.slipper,
      睡袍: v.pajamas,
      空氣清淨機: v.air_purifier,
    };
  });
  console.log(roomDetail);
  const chunk = 3;
  const roomDetailArrangeChunk = [];
  for (let i = 0; i < roomDetailArrange.length; i += chunk) {
    roomDetailArrangeChunk.push(roomDetailArrange.slice(i, i + chunk));
  }
  useEffect(() => {
    if (roomDetail.length > 0) {
      // console.log('aaa', roomDetail[0].hotel_name);
      async function getOrderList() {
        let response = await axios.get(
          `http://localhost:3001/api/hotelDetail/${roomDetail[0].hotel_name}/orderList`
        );
        setRoomOrderList(response.data);
        // console.log(response.data);
      }
      getOrderList();
    }
  }, [roomDetail]);

  useEffect(() => {
    // 拿到客人選的日期
    const selectedDate = enumerateDaysBetweenDates(startDate, endDate);
    //整理拿到的orderList資料型態
    const dateOrderList = roomOrderList
      .map((order) => {
        const startDate = moment(order.start_date).format('YYYYMMDD');
        const endDate = moment(order.end_date).format('YYYYMMDD');
        const betweenDates = enumerateDaysBetweenDates(startDate, endDate);
        return betweenDates.map((date) => {
          return { date: date, room: order.product_id, amount: order.amount };
        });
      })
      .flatMap((v) => {
        return v;
      });
    // console.log('roomOrderList', roomOrderList);
    // console.log('dateOrderList', dateOrderList);
    //篩選成只有旅客選的日期
    //將同樣日期和房型的amount組合起來
    const dateOrderAmount = [];
    const map = new Map();

    for (const item of dateOrderList) {
      const key = `${item.date}_${item.room}`;
      if (!map.has(key)) {
        map.set(key, { date: item.date, room: item.room, amount: 0 });
        dateOrderAmount.push(map.get(key));
      }
      map.get(key).amount += item.amount;
    }

    const dateOrderAmountFilter = dateOrderAmount.filter((v) => {
      return selectedDate.includes(v.date);
    });
    // console.log('dateOrderAmountFilter', dateOrderAmountFilter);
    setDateOrderAmountFilter(dateOrderAmountFilter);
  }, [startDate, endDate, roomOrderList]);

  const findMin = function (array, v) {
    if (array.length === 0) {
      return v;
    }
    let min = Number.MAX_SAFE_INTEGER;
    array.forEach((v) => {
      if (v < min) {
        min = v;
      }
    });
    return min;
  };

  return (
    <>
      <div className="container-xxl room-select-box" id="room">
        <h3 className="h3">選擇房型</h3>
        <HotelBanner
          dNone={'d-none'}
          justifyContentCenter={'justify-content-center'}
          my2={'my-2'}
          setDetailStartDate={setStartDate}
          setDetailEndDate={setEndDate}
          setelectedRoomAmount={setelectedRoomAmount}
        />
        <div>
          <div>
            {roomDetailArrangeChunk.map((firstChunk, firstChunk_i) => {
              return (
                <ul
                  className={`list-unstyled d-flex justify-content-start mb-5`}
                  key={firstChunk_i}
                >
                  {firstChunk.map((room, room_i) => {
                    const roomLeast = findMin(
                      dateOrderAmountFilter.map((v, i) => {
                        if (v.room === room.id) return room.amount - v.amount;
                        else {
                          return room.amount;
                        }
                      }),
                      room.amount
                    );
                    console.log('aaa', roomLeast, selectedRoomAmount);
                    return (
                      <li
                        className={`room-type-card mx-5  ${
                          roomLeast < selectedRoomAmount ? 'd-none' : 'd-block'
                        }`}
                        key={room_i}
                      >
                        <div className="room-pic-box d-flex">
                          {room.picture.map((pic, pic_i) => {
                            return (
                              <img
                                src={`/images/${pic}`}
                                className="room-pic"
                                alt="room-pic"
                                key={pic_i}
                              />
                            );
                          })}
                        </div>
                        <div className="px-3 pt-3 mb-1">
                          <h5 className="my-heading">{room.room_name}</h5>
                          <p className="my-p">{room.description}</p>
                          <ul className="my-p mb-1">
                            <li>
                              最多可入住 {room.room_type}
                              人(含額外成人與孩童)
                            </li>
                            {Object.keys(room)
                              .filter((key) => room[key] === 1)
                              .map((v, i) => {
                                if (i <= 4) {
                                  return <li key={i}>{v}</li>;
                                } else if (i > 4) {
                                  return (
                                    <div
                                      key={i}
                                      className={
                                        isOpenService ? 'd-none' : 'd-none'
                                      }
                                    >
                                      <li key={i}>{v}</li>
                                    </div>
                                  );
                                }
                              })}
                          </ul>
                          <div className="d-flex my-p">
                            <p
                              className="me-1"
                              // onClick={setIsOpenService(!isOpenService)}
                            >
                              剩餘間數
                            </p>
                            <div>
                              {findMin(
                                dateOrderAmountFilter.map((v, i) => {
                                  if (v.room === room.id)
                                    return room.amount - v.amount;
                                  else {
                                    return room.amount;
                                  }
                                }),
                                room.amount
                              ) === Number.MAX_SAFE_INTEGER
                                ? room.amount
                                : findMin(
                                    dateOrderAmountFilter.map((v, i) => {
                                      if (v.room === room.id)
                                        return room.amount - v.amount;
                                      else {
                                        return room.amount;
                                      }
                                    }),
                                    room.amount
                                  )}
                            </div>
                            {/* <div class="material-symbols-outlined play-arrow">
                              play_arrow
                            </div> */}
                          </div>
                          <h6 className="nav-foot-small mb-1">可全額退款</h6>
                          <p className="my-p">入住兩周前</p>
                          <div className="my-p">
                            <p className="mb-1">
                              NT${room.price} / 每晚 / 每間
                            </p>
                            <p className="mb-1">價格明細</p>
                            <p className="mb-1 my-p-small">
                              NT${room.price} / 每晚 * 共
                              {
                                enumerateDaysBetweenDates(startDate, endDate)
                                  .length
                              }
                              晚 * 共{selectedRoomAmount} 間
                            </p>
                            <p className="mb-1">
                              總價 NT$
                              {room.price *
                                enumerateDaysBetweenDates(startDate, endDate)
                                  .length *
                                selectedRoomAmount}
                            </p>
                          </div>
                        </div>
                        <div className="text-center select-btn-box pt-2">
                          <Link
                            className="text-decoration-none cart-link-btn"
                            to={'/payment/Hotel/Detail'}
                            onClick={() => {
                              storage.setItem(
                                'hotelRoom',
                                JSON.stringify([
                                  {
                                    roomName: room.room_name,
                                    companyName: room.hotel_name,
                                  },
                                ])
                              );

                              // NOTE 暫時的 時間 跟 間數

                              console.log('click');
                            }}
                          >
                            <button className="my-p booking-select-btn px-3 mb-2">
                              訂房
                            </button>
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomSelect;
