import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddressPage from "./pages/AddressPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/map" element={<AddressPage/>} />
        <Route
          path="/register"
          element={<RegisterPage/>}
        />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
