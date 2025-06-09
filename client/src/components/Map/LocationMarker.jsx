import axios from "axios";
import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const LocationMarker = ({ position, setPosition, setAddress }) => {
  const key = import.meta.env.VITE_KEY;
  
  useMapEvents({
    async click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      const { data } = await axios.get(
        `https://us1.locationiq.com/v1/reverse?key=${key} &lat=${e.latlng.lat}&lon=${e.latlng.lng}&format=json&`
      );
      const {
        country,
        state,
        state_district: district,
        village: city,
        postcode: zipCode,
      } = data.address;

      setAddress({
        country,
        state,
        district,
        city,
        zipCode,
        address: data.display_name,
      });
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You clicked here</Popup>
    </Marker>
  );
};

export default LocationMarker;
