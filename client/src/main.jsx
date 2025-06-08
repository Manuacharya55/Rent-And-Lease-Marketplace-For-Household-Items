import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./styles/general.css";
import { ProductProvider } from "./context/ProductContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
    <Toaster />
  </UserProvider>
);
