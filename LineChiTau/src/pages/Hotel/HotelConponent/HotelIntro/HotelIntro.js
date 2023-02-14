import React, { useState, useEffect } from 'react';
import './HotelIntro.scss';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';

const HotelIntro = ({ hotelDetail }) => {
  let DefaultIcon = L.icon({
    iconUrl: icon,
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setisFixed] = useState(false);
  let stars = [];
  for (let i = 1; i <= hotelDetail.stars; i++) {
    stars.push(
      <span class="material-symbols-outlined hotel-star-fill">star</span>
    );
  }

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
  } = hotelDetail;
  const hotelServiceList = [
    { service: 'WIFI', value: wifi, icon: 'wifi' },
    { service: '泳池', value: pool, icon: 'pool' },
    { service: '健身房', value: gym, icon: 'fitness_center' },
    { service: '餐廳', value: restaurant, icon: 'restaurant' },
    { service: 'BAR', value: bar, icon: 'local_bar' },
    { service: '停車場', value: parking, icon: 'local_parking' },
    { service: '洗衣間', value: laundry, icon: 'local_laundry_service' },
    { service: '會議室', value: meeting_room, icon: 'meeting_room' },
    { service: '娛樂間', value: arcade, icon: 'sports_esports' },
    { service: '電梯', value: elevator, icon: 'elevator' },
    { service: '行李寄放', value: store_luggage, icon: 'luggage' },
    { service: '櫃台服務', value: counter, icon: 'countertops' },
  ];
  const hotelServiceListFilter = hotelServiceList.filter((v, i) => {
    return v.value !== 0;
  });

  const chunk = 3;
  const hotelServiceListFilterChunk = [];
  for (let i = 0; i < hotelServiceListFilter.length; i += chunk) {
    hotelServiceListFilterChunk.push(
      hotelServiceListFilter.slice(i, i + chunk)
    );
  }
  // console.log(hotelServiceListFilter);

  const handleScroll = (event) => {
    setScrollPosition(window.pageYOffset);
    // console.log(window.pageYOffset)
    let fixed = window.pageYOffset >= 695 ? true : false;
    setisFixed(fixed);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
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
      <div className="container-xxl HotelIntro">
        <nav className={`nav-hotelIntro ${isFixed ? 'fixed' : 'mt-3'}`}>
          <ul className="list-unstyled d-flex justify-content-around my-0">
            <li>
              <a href="#room" className="fixed-bar-a">
                客房
              </a>
            </li>
            <li>
              <a href="#transportation" className="fixed-bar-a">
                交通位置
              </a>
            </li>
            <li>
              <a href="#comment" className="fixed-bar-a">
                評論區
              </a>
            </li>
            <li>
              <a href="#rule" className="fixed-bar-a">
                注意事項
              </a>
            </li>
          </ul>
        </nav>
        <div className="row mt-4">
          <div className="col-8 left-side ">
            <h3 className="my-topic">{hotelDetail.company_name}</h3>
            <div>{stars}</div>
            <p className="my-p mt-2">{hotelDetail.address}</p>
            <div className="my-3">
              <h4 className="my-4 my-heading">飯店設施服務</h4>
              <div className="">
                {hotelServiceListFilterChunk.map((v_ul, i_ul) => {
                  return (
                    <ul className="list-unstyled service-box row" key={i_ul}>
                      {v_ul.map((service, service_i) => {
                        return (
                          <li
                            className="nav-foot d-flex my-2 col-4"
                            key={service.service}
                          >
                            <div class="material-symbols-outlined me-4">
                              {service.icon}
                            </div>
                            <p>{service.service}</p>
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-4 right-side">
            <div className="map m-auto position-relative">
              {Object.keys(hotelDetail).length > 0 && (
                <MapContainer
                  center={[
                    hotelDetail.geo_location_Y,
                    hotelDetail.geo_location_X,
                  ]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: '220px', position: 'relative' }}
                  className="leaflet-hotel-list"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      hotelDetail.geo_location_Y,
                      hotelDetail.geo_location_X,
                    ]}
                    key={hotelDetail.company_name}
                  >
                    <Popup>{hotelDetail.company_name}</Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
            <div className="mt-3">
              <h4>周邊景點</h4>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelIntro;
