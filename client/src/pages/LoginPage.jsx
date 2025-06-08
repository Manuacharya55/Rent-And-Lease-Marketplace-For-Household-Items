import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Container from "../components/Layout/Container";
import { NavLink } from "react-router-dom";
import { postRequest } from "../api/post";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const URL = "http://localhost:5000/api/v1/user/login";
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const{setLocalStorage}=useUser();
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      email: user.email,
      password: user.password,
    };
    const response = await postRequest(URL,data);
    if(response.success){
      toast.success(response.message)
      setLocalStorage(response.data.user.isAdmin ,response.data.token)
    }else{
      toast.error(response.message)
    }
  };

  return (
    <Container>
      <div id="login">
        <form>
          <h1>Login Form</h1>
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
          <NavLink to="/register">Don't have an account?</NavLink>
          <Button name={"Login"} event={handleClick} />
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
