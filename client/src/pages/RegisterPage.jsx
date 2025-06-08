import React, { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Container from "../components/Layout/Container";
import { NavLink } from "react-router-dom";
import { postRequest } from "../api/post";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const URL = "http://localhost:5000/api/v1/user/register";
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      fullName: user.name,
      email: user.email,
      phoneNumber: user.number,
      password: user.password,
    };
    const response = await postRequest(URL,data);
    if(response.success){
      toast.success(response.message)
    }else{
      toast.error(response.message)
    }
    console.log(response)
  };

  return (
    <Container>
      <div id="login">
        <form>
          <h1>Register Here</h1>
          {Object.keys(user).map((key) => {
            return (
              <Input
                key={key}
                type="text"
                event={handleChange}
                value={user[key]}
                placeholder={`Enter your ${key}`}
                name={key}
              />
            );
          })}
          <NavLink to="/login">Already have an account?</NavLink>

          <Button name={"Register"} event={handleClick} />
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;
