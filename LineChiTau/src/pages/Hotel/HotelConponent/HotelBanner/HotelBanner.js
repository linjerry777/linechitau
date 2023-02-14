import React from 'react';

import './HotelBanner.scss';
import { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';

const HotelBanner = ({
  bannerSearchBar,
  positionAbsolute,
  justifyContentCenter,
  my2,
  widthControl,
  dNone,
  listDNone,
  setDetailStartDate,
  setDetailEndDate,
  setelectedRoomAmount,
}) => {
  const storage = localStorage;
  const Now = Date.now();
  const initStartDate = moment(Now).format('YYYY/MM/DD');
  const initEndDate = moment(Now).add(1, 'days').format('YYYY/MM/DD');
  const [startDate, setStartDate] = useState(
    localStorage.getItem('startDate') === null
      ? initStartDate
      : localStorage.getItem('startDate')
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem('endDate') === null
      ? initEndDate
      : localStorage.getItem('endDate')
  );
  const [destination, setDestination] = useState(
    localStorage.getItem('destination') === null
      ? '台北'
      : localStorage.getItem('destination')
  );
  // console.log(localStorage.getItem('destination'));
  const [dateFromTO, setDateFromTO] = useState(`${startDate} - ${endDate}`);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openConditions, setOpenConditions] = useState(false);
  const navigate = useNavigate();
  const [conditions, setConditions] = useState({
    adult:
      localStorage.getItem('adult') === null
        ? 2
        : localStorage.getItem('adult'), //初始人數,房間數為一
    children:
      localStorage.getItem('children') === null
        ? 0
        : localStorage.getItem('children'), //可以不一定要有小孩
    room:
      localStorage.getItem('room') === null ? 1 : localStorage.getItem('room'),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/HotelList/${destination}`);
    storage.setItem(
      'orderItem',
      JSON.stringify([
        {
          startDate,
          endDate,
          conditions,
        },
      ])
    );
    localStorage.setItem('destination', destination);
    localStorage.setItem('adult', conditions['adult']);
    localStorage.setItem('children', conditions['children']);
    localStorage.setItem('room', conditions['room']);
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);
    setOpenCalendar(false);
    setOpenConditions(false);
  };

  const handleSubmitDetail = (event) => {
    event.preventDefault();
    storage.setItem(
      'orderItem',
      JSON.stringify([
        {
          startDate,
          endDate,
          conditions,
        },
      ])
    );
    localStorage.setItem('adult', conditions['adult']);
    localStorage.setItem('children', conditions['children']);
    localStorage.setItem('room', conditions['room']);
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);
    setOpenCalendar(false);
    setOpenConditions(false);
    setDetailEndDate(endDate);
    setDetailStartDate(startDate);
    setelectedRoomAmount(conditions.room);
    console.log('11111', conditions.room);
  };

  const handleInputChange = (event) => {
    event.persist();
    setDestination(event.target.value);
  };
  const conditionsSelect = ['成人', '兒童', '客房'];
  const plusNum = (type) => {
    const newConditions = { ...conditions };
    if (Number(newConditions[type]) <= 9) {
      newConditions[type] = Number(newConditions[type]) + 1;
      setConditions(newConditions);
    } else {
      newConditions[type] = 10;
      setConditions(newConditions);
    }
    // console.log(newConditions);
  };
  const minusNum = (type) => {
    const newConditions = { ...conditions };
    if (type === 'children') {
      if (Number(newConditions[type]) > 2) {
        newConditions[type] = Number(newConditions[type]) - 1;
        setConditions(newConditions);
      } else {
        newConditions[type] = 0;
        setConditions(newConditions);
      }
    } else {
      if (Number(newConditions[type]) >= 2) {
        newConditions[type] = Number(newConditions[type]) - 1;
        setConditions(newConditions);
      } else {
        newConditions[type] = 1;
        setConditions(newConditions);
      }
    }
  };
  useEffect(() => {
    setDateFromTO(`${startDate} - ${endDate}`);
  }, [startDate, endDate]);
  return (
    <div
      className={`hotel-search-bar d-flex my-border-radius ${justifyContentCenter} ${my2} ${bannerSearchBar} ${positionAbsolute} ${widthControl}`}
    >
      <div className={`${dNone}`}>
        <div className="nav-foot-small d-flex">
          <span className="material-symbols-outlined">location_on</span>目的地
        </div>
        <input
          type="text"
          placeholder="請輸入目的地"
          className="form-control bg-transparent my-p"
          required
          value={destination}
          onChange={(event) => {
            handleInputChange(event);
          }}
        />
      </div>
      <div>
        <div className="listItem">
          <span className="date">
            <div>
              <div
                className="nav-foot-small d-flex"
                onClick={() => {
                  setOpenCalendar(!openCalendar);
                }}
              >
                <span className="material-symbols-outlined">
                  calendar_month
                </span>
                入住/退房時間
              </div>
              <div className="d-flex justify-content-center d-none">
                <div className="w-50">
                  <input value={startDate} className="form-control" />
                </div>
                <div className="w-50">
                  <input value={endDate} className="form-control" />
                </div>
              </div>
              <div
                className="display-box nav-foot-small"
                onClick={() => {
                  setOpenCalendar(!openCalendar);
                }}
              >
                {dateFromTO}
              </div>
              <div className="listItem">
                {openCalendar && (
                  <Calendar
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                )}
              </div>
            </div>
          </span>
        </div>
      </div>
      <div>
        <div className="nav-foot-small d-flex">
          <span className="material-symbols-outlined">group</span>人數 / 間數
        </div>
        <input
          className="form-control bg-transparent my-p"
          value={`${conditions['adult']}位成人 / ${conditions['children']} 位小孩 / ${conditions['room']} 間房間`}
          onClick={() => {
            setOpenConditions(!openConditions);
          }}
        />
        <input className="d-none" value={conditions['adult']} />
        <input className="d-none" value={conditions['children']} />
        <input className="d-none" value={conditions['room']} />
        {openConditions && (
          <div className="select-room p-1">
            {conditionsSelect.map((value, index) => {
              let type;
              switch (value) {
                case '成人':
                  type = 'adult';
                  break;
                case '兒童':
                  type = 'children';
                  break;
                case '客房':
                  type = 'room';
                  break;
                default:
                  break;
              }
              return (
                <div
                  className="d-flex justify-content-around my-2 "
                  key={index}
                >
                  <p className="my-auto">{value}</p>
                  <button
                    className="my-btn nav-foot-small d-flex align-items-center py-2"
                    onClick={() => {
                      minusNum(type);
                    }}
                  >
                    {' '}
                    -{' '}
                  </button>
                  <p className="my-auto">{conditions[type]}</p>
                  <button
                    className="my-btn nav-foot-small d-flex align-items-center py-2"
                    onClick={() => {
                      plusNum(type);
                    }}
                  >
                    {' '}
                    +{' '}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button
        className={`my-btn nav-foot-small d-flex align-items-center pe-1 py-3 ${dNone}`}
        onClick={handleSubmit}
      >
        <span className="material-symbols-outlined">search</span>
      </button>
      <button
        className={`my-btn nav-foot-small d-flex align-items-center pe-1 py-3 ${listDNone}`}
        onClick={handleSubmitDetail}
      >
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
};

export default HotelBanner;
