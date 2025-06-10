import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LocationMarker from "./LocationMarker";

const Map = ({ setAddress, setCoordinates, coordinates }) => {
  const [loading, setLoading] = useState(true);

  const setLocation = () => {
    const success = (location) => {
      const { latitude, longitude } = location.coords;
      setCoordinates([latitude, longitude]);
      setLoading(false);
    };

    const handleError = (err) => {
      console.log(err);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, handleError);
    } else {
      toast("please allow application to access your location");
    }
  };

  useEffect(() => {
    setLocation();
  }, []);

  return loading ? (
    "loading"
  ) : (
    <MapContainer
      center={{ lat: coordinates[0], lng: coordinates[1] }}
      zoom={10}
      scrollWheelZoom={true}
      style={{ width: "calc(100% - 400px)", height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker
        position={coordinates}
        setPosition={setCoordinates}
        setAddress={setAddress}
      />
    </MapContainer>
  );
};

export default Map;
