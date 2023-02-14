import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Transpotation.scss';

const Transpotation = ({ hotelDetail }) => {
  const [aroundSpots, setAroundSpots] = useState([]);
  useEffect(() => {
    async function getAroundSpots() {
      if (Object.keys(hotelDetail).length > 0) {
        let response = await axios.get(
          'http://localhost:3001/api/aroundSpots/' + hotelDetail.region
        );
        // console.log(response.data[0]);
        setAroundSpots(response.data);
      }
    }
    getAroundSpots();
  }, [hotelDetail]);
  function distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    return dist;
  }
  return (
    <>
      <div
        className="container-xxl transpotation p-3 mx-auto mt-5"
        id="transportation"
      >
        <h3 className="h3">地點和交通</h3>
        <div className="row">
          <div className="col-6 row">
            <ul className="list-unstyled spot-box mt-3">
              {aroundSpots
                .map((spot, spot_i) => {
                  const result = distance(
                    parseFloat(hotelDetail.geo_location_Y),
                    parseFloat(hotelDetail.geo_location_X),
                    parseFloat(spot.Py),
                    parseFloat(spot.Px),
                    'K'
                  );
                  spot.distance = result;
                  return spot;
                })
                .filter((aroundSpots, aroundSpots_i) => {
                  return aroundSpots.distance < 5;
                })
                .map((scenic, scenic_i) => {
                  if (scenic_i < 5)
                    return (
                      <li className="my-p d-flex my-2">
                        <div class="material-symbols-outlined me-4">
                          location_on
                        </div>
                        <p className="me-4">{scenic.Name}</p>
                        <p>{Math.round(scenic.distance * 100) / 100}公里</p>
                      </li>
                    );
                })}
            </ul>
          </div>
          <div className="col-6"></div>
        </div>
      </div>
    </>
  );
};

export default Transpotation;
