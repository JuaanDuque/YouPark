import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import SearchUser from "./pages/SearchUser";
import CreateUser from "./pages/CreateUser";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Reservation from "./pages/Reservation";
import ParkingSlotSearch from "./pages/ParkingslotSearch";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(true); // Estado para el cargado

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false); // Después de verificar el token, cambia el estado de carga a false
  }, []);

  // Si está cargando, mostramos el spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Routes>
      {/* Página de Login (Pública) */}
      <Route
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Rutas protegidas dentro del Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Reservation />} />
        <Route path="search-slot" element={<ParkingSlotSearch />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="search-user" element={<SearchUser />} />
        {/* <Route path="myaccount" element={<MyAccount />} /> */}
      </Route>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default App;
