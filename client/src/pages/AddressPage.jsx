import React, { useState } from "react";
import Container from "../components/Layout/Container";
import Map from "../components/Map/Map";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useUser } from "../context/UserContext";
import { postRequest } from "../api/post";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
    const {token} = useUser();
    const navigate = useNavigate();
    const URL = "http://localhost:5000/api/v1/address/"
  const [address, setAddress] = useState({
    country: "",
    state: "",
    district: "",
    city: "",
    zipCode: "",
    address: "",
  });
  const [coordinates, setCoordinates] = useState([]);

  const handleClick=async (e)=>{
    e.preventDefault();
    if(!token) return
    const data = {
        ...address,coordinates
    }

    console.log(data)
    const response = await postRequest(URL,data,token)
    console.log(response)
    if(response.success){
        toast.success(response.message)
        setAddress()
        setCoordinates([])
        navigate("/home")
    }else{
        toast.error(response.message)
    }
  }

  return (
    <Container>
      <Map setAddress={setAddress} setCoordinates={setCoordinates} coordinates={coordinates}/>
      <div id="login">
        <form>
          <h1>Address</h1>

          {Object.keys(address).map((curEle) => {
            return (
              <Input
                type={"text"}
                value={address[curEle]}
                placeholder={`your ${curEle} will be displayed`}
                name={curEle}
              />
            );
          })}

          <Button name={"Add Address"} event={handleClick} />
        </form>
      </div>
    </Container>
  );
};

export default AddressPage;
