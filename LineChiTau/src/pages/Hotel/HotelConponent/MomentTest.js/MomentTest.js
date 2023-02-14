import React, { useEffect } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

function MomentTest() {
  const moment = extendMoment(Moment);
  const enumerateDaysBetweenDates = (startDate, endDate) => {
    let daysList = [];
    const start = moment(startDate);
    const end = moment(endDate);
    const day = end.diff(start, 'days');
    daysList.push(start.format('YYYY-MM-DD'));
    for (let i = 1; i <= day; i++) {
      daysList.push(start.add(1, 'days').format('YYYY-MM-DD'));
    }
    return daysList;
  };

  console.log(enumerateDaysBetweenDates('2021-06-09', '2021-07-09'));

  return <div>MomentTest</div>;
}

export default MomentTest;
