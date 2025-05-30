import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/login" element={<h1>Welcome to the Login Page</h1>} />
        <Route path="/register" element={<h1>Welcome to the Register Page</h1>} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
