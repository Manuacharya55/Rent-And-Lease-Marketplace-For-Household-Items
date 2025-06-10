import React, { useEffect, useState } from "react";
import Container from "../components/Layout/Container";
import Map from "../components/Map/Map";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useUser } from "../context/UserContext";
import { postRequest } from "../api/post";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../api/get";
import { patchRequest } from "../api/patch";

const AddressPage = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const URL = "http://localhost:5000/api/v1/address/";

  const [isEditing, setIsEditing] = useState(true);
  const [id, setId] = useState();
  const [address, setAddress] = useState({
    country: "",
    state: "",
    district: "",
    city: "",
    zipCode: "",
    address: "",
  });
  const [coordinates, setCoordinates] = useState([]);

  const fetchLocation = async () => {
    if (!token) return;

    const response = await getRequest(URL, token);
    if (response.success) {
      console.log(response);
      const { country, state, district, city, zipCode, address, _id } =
        response.data;
      const { coordinates } = response.data.location;

      setAddress({ country, state, district, city, zipCode, address });
      setCoordinates(coordinates);
      setId(_id);
    }
  };

  if (isEditing) {
    useEffect(() => {
      if (token) {
        fetchLocation();
      }
    }, [token]);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!token) return;
    const data = {
      ...address,
      coordinates,
    };

    let response;
    if (isEditing) {
      response = await patchRequest(URL, id, data, token);
    } else {
      response = await postRequest(URL, data, token);
    }

    if (response.success) {
      toast.success(response.message);
      setAddress();
      setCoordinates([]);
      navigate("/home");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Container>
      <Map
        setAddress={setAddress}
        setCoordinates={setCoordinates}
        coordinates={coordinates}
      />
      <div id="login">
        <form>
          <h1>Address</h1>

          {Object.keys(address).map((curEle, index) => {
            return (
              <Input
                type={"text"}
                value={address[curEle]}
                placeholder={`your ${curEle} will be displayed`}
                name={curEle}
                key={index}
              />
            );
          })}

          <Button
            name={`${isEditing ? "Edit Address" : "Add Address"}`}
            event={handleClick}
          />
        </form>
      </div>
    </Container>
  );
};

export default AddressPage;
