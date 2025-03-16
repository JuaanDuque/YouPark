import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = (setIsAuthenticated) => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("user"));
  const role = data.role_id;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom fixed-top"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img
            src="/public/logoRecorte.png"
            className="rounded-circle w-image-home"
            alt="Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                Reservar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/home">
                Mis reservas
              </Link>
            </li>
          </ul>
          {/* Mostrar el menú solo si el rol es 1 (Administrador) */}
          {role === 1 && (
            <ul className="navbar-nav">
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle active"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Usuarios
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  style={{ backgroundColor: "#e3f2fd" }}
                >
                  <li>
                    <Link className="dropdown-item" to="/search-users">
                      Buscar usuarios
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/create-user">
                      Crear usuarios
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          <ul className="navbar-nav">
            <li className="nav-item dropdown ">
              <Link
                className="nav-link dropdown-toggle active"
                to="/home"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mi cuenta
              </Link>
              <ul
                className="dropdown-menu dropdown-menu-end"
                style={{ backgroundColor: "#e3f2fd" }}
              >
                <li>
                  <Link className="dropdown-item" to="/home">
                    Datos personales
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item dropdown-item-out"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
