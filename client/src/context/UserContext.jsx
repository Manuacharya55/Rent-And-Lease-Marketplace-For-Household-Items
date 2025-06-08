import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // creating states for the user and address
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [address, setAddress] = useState(null);

  //   setting token to local storage
  const setLocalStorage = (isAdmin, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    setToken(token);
    setIsAdmin(isAdmin);
  };

  //   fetching token present in local storage
  const fetchLocalStorage = () => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  };

  //   clearing local storage
  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setIsAdmin(null);
  };

  //   initial setup of token
  useEffect(() => {
    fetchLocalStorage();
  }, []);

  return <UserContext.Provider
    value={{
      setLocalStorage,
      clearLocalStorage,
      user,
      address,
      token,
      isAdmin,
    }}
  >
    {children}
  </UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Cannot Access Data Outside Context");
  }

  return context
};
