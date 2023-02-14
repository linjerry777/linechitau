import React, { useEffect, useState } from 'react';
import './Calendar.scss';
const moment = require('moment');

// 將陣列拆分為每組size個的小陣列[1,2,3,4,5]size2=>[[1,2],[3,4],[5]]
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

function Calendar({ setStartDate, setEndDate }) {
  const [myYear, setMyYear] = useState(2023);
  const [myMonth, setMyMonth] = useState(2);
  let newYear;
  let newMonth;
  const minusMonth = function () {
    if (myMonth === 1) {
      newYear = myYear - 1;
      newMonth = 12;
    } else {
      newYear = myYear;
      newMonth = myMonth - 1;
    }
    setMyYear(newYear);
    setMyMonth(newMonth);
  };
  const plusMonth = function () {
    if (myMonth === 12) {
      newYear = myYear + 1;
      newMonth = 1;
    } else {
      newYear = myYear;
      newMonth = myMonth + 1;
    }
    setMyYear(newYear);
    setMyMonth(newMonth);
  };
  // 一開始未選中日期
  const [myDate, setMyDate] = useState({
    startDate: '',
    endDate: '',
  });
  useEffect(() => {
    setStartDate(myDate.startDate);
    setEndDate(myDate.endDate);
  }, [myDate]);
  let numStart;
  let numEnd;
  if (
    typeof myDate.startDate === 'string' &&
    typeof myDate.endDate === 'string'
  ) {
    // console.log('myDate.startDate', myDate.startDate);
    numStart = moment(myDate.startDate).format('YYYYMMDD');
    if (!myDate.endDate) {
      numEnd = 1;
      // console.log('9999999999', numEnd);
    } else {
      numEnd = moment(myDate.endDate).format('YYYYMMDD');
      // console.log('888888888', numEnd);
    }

    // console.log('aaaaaaa', numStart, numEnd);
  }
  // 呈現yearAndMonth
  const now = new Date();

  // 要得到今天的西元年使用Date物件的getFullYear()，要得到月份使用getMonth()(注意回傳為 0~11)
  const nowY = myYear ? myYear : now.getFullYear();
  // nowM =1-12
  let nowM = myMonth ? myMonth : now.getMonth() + 1; //回傳為 0~11

  // 呈現標題
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六'];

  // 本月有幾天
  // (上個月的最後一天是幾號)
  const days = new Date(nowY, nowM, 0).getDate();
  // 這個月的第一天是星期幾(0-6) (月份為0-11)
  const firstDay = new Date(nowY, nowM - 1, 1).getDay();
  // 本月所有日期的陣列資料
  const daysDataArray = [];
  // 補前面的空白資料
  for (let i = 0; i < firstDay; i++) {
    daysDataArray.push('');
  }
  // 加入本月所有的日期資料
  for (let i = 0; i < days; i++) {
    daysDataArray.push(i + 1);
  }
  // 準備要呈現在網頁上
  const daysDisplayArray = chunk(daysDataArray, 7);
  // console.log(props);
  return (
    <div className="calendar m-auto position-relative">
      <div>
        {/* <div className="display-box nav-foot-small">{`${myDate.startDate} - ${myDate.endDate}`}</div> */}
        <div className="year-title d-flex justify-content-center align-items-center p-1">
          <div
            className="material-symbols-outlined arrow"
            onClick={() => {
              minusMonth();
            }}
          >
            arrow_circle_left
          </div>
          <h2 id="yearAndMonth" className="nav-foot px-5 my-0">
            {nowY + '/' + nowM}
          </h2>
          <div
            className="material-symbols-outlined arrow"
            onClick={() => {
              plusMonth();
            }}
          >
            arrow_circle_right
          </div>
        </div>
        {/* <div className="d-flex justify-content-center d-none">
          <div className="w-50">
            <input value={myDate.startDate} className="form-control" />
          </div>
          <div className="w-50">
            <input value={myDate.endDate} className="form-control" />
          </div>
        </div> */}
        <table border="1" className="calendar-box">
          <thead id="title" className="nav-foot">
            <tr>
              {weekDayList.map(function (v, i) {
                return (
                  <th key={i} className="text-center">
                    {v}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody id="data">
            {daysDisplayArray.map((v, i) => {
              return (
                <tr key={i}>
                  {v.map((item, idx) => (
                    <td
                      role="button"
                      key={idx}
                      className={
                        (moment(`${nowY}/${nowM}/${item}`).format('YYYYMMDD') ==
                          numStart &&
                          item !== '') ||
                        (moment(`${nowY}/${nowM}/${item}`).format('YYYYMMDD') <=
                          numEnd &&
                          moment(`${nowY}/${nowM}/${item}`).format(
                            'YYYYMMDD'
                          ) >= numStart &&
                          item !== '')
                          ? 'my-p date-selected date text-center'
                          : 'my-p date text-center'
                      }
                      onClick={() => {
                        let newMyDate = {};
                        let numStart;
                        let numEnd;
                        if (!myDate.startDate) {
                          newMyDate.startDate = `${nowY}/${nowM}/${item}`;
                          newMyDate.endDate = '';
                        } else if (myDate.startDate && !myDate.endDate) {
                          newMyDate.startDate = myDate.startDate;
                          newMyDate.endDate = `${nowY}/${nowM}/${item}`;
                          numStart = Number(
                            moment(myDate.startDate).format('YYYYMMDD')
                          );
                          numEnd = Number(
                            moment(newMyDate.endDate).format('YYYYMMDD')
                          );
                          // console.log('cccccccc', numStart, numEnd);
                          if (numStart > numEnd) {
                            // console.log('我近來囉');
                            let a = newMyDate.startDate;
                            let b = newMyDate.endDate;
                            newMyDate.startDate = b;
                            newMyDate.endDate = a;
                          }
                        } else if (myDate.endDate && myDate.startDate) {
                          newMyDate.startDate = `${nowY}/${nowM}/${item}`;
                          newMyDate.endDate = '';
                        }
                        // console.log(newMyDate);
                        setMyDate(newMyDate);
                        // console.log(new Date(nowY, nowM - 1, item));
                      }}
                    >
                      <span className="my-p">{item}</span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;
