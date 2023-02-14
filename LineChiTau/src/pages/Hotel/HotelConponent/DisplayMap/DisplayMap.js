import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Link, useParams, useNavigate } from 'react-router-dom';

function DisplayMap({ hotelListArrangeState, mapHeight }) {
  let DefaultIcon = L.icon({
    iconUrl: icon,
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  return (
    <>
      {hotelListArrangeState.length > 0 && (
        <MapContainer
          center={[
            hotelListArrangeState[0][0].geo_location_Y,
            hotelListArrangeState[0][0].geo_location_X,
          ]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: mapHeight }}
          className="leaflet-hotel-list"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hotelListArrangeState.map((chunck, chunck_i) => {
            return chunck.map((hotel, hotel_i) => {
              return (
                <Marker
                  position={[hotel.geo_location_Y, hotel.geo_location_X]}
                  key={hotel.company_name}
                >
                  <Popup>
                    <Link to={`/HotelDetail/${hotel.company_name}`}>
                      {hotel.company_name}
                    </Link>
                  </Popup>
                </Marker>
              );
            });
          })}
        </MapContainer>
      )}
    </>
  );
}

export default DisplayMap;
