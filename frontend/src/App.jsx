import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Navbar />} />
    </Routes>
  );
};

export default App;
