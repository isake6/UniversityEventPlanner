import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import pointer from "../images/pointer.png";

const MyMap = ({ position, zoom }) => {
  const [selectedLocation, setSelectedLocation] = useState([0, 0]);

  const customIcon = new Icon({
    iconUrl: pointer,
    iconSize: [20, 60], // size of the icon
  });
  const MapClickHandler = () => {
    const map = useMap();

    useEffect(() => {
      const handleClick = (e) => {
        setSelectedLocation(e.latlng);
        localStorage.setItem("lat", e.latlng.lat);
        localStorage.setItem("long", e.latlng.lng);
      };

      map.on("click", handleClick);
      return () => {
        map.off("click", handleClick);
      };
    }, [map]);

    useEffect(() => {
      map.flyTo(position);
      setSelectedLocation(position);
    }, [position]);

    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: "30vh", width: "100%" }}
    >
      <MapClickHandler />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={selectedLocation} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
