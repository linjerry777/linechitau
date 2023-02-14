import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
// import "leaflet/dist/leaflet.css";


const MapTest = () => {
    const position = [25.03, 121.6]
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default MapTest