import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import QRCodeModal from "../components/QRcodeModal";
import ParkingslotModal from "./ParkingslotModal";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = (setIsAuthenticated) => {
  const reservations = [
    {
      id: 1,
      qr_code: "Reserva ID: 1, Celda: A1, Vehiculo: Carro", // Aquí se define la cadena qr_code
      status: "Confirmada",
      reservation_date: "2025-03-25 12:00:00",
      slot_number: "A1",
      vehicle_id: "Carro",
    },
    {
      id: 2,
      qr_code: "Reserva ID: 2, Celda: M2, Vehiculo: Moto", // Aquí se define la cadena qr_code
      status: "Pendiente",
      reservation_date: "2025-03-26 14:30:00",
      slot_number: "M2",
      vehicle_id: "Moto",
    },
    {
      id: 3,
      qr_code: "Reserva ID: 3, Celda: A3, Vehiculo: Carro", // Aquí se define la cadena qr_code
      status: "Cancelada",
      reservation_date: "2025-03-27 16:45:00",
      slot_number: "A3",
      vehicle_id: "Carro",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCreateSlotModalOpen, setIsCreateSlotModalOpen] = useState(false);

  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("user"));
  const role = data.role_id;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleOpenModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleOpenModalSlot = () => {
    setIsCreateSlotModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const handleCloseCreateSlotModal = () => {
    setIsCreateSlotModalOpen(false);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg border-bottom"
        style={{ backgroundColor: "#3cb7ea" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src="/public/logoRecorte.png"
              className="rounded-circle w-image-home"
              alt="Logo"
              style={{ backgroundColor: "#ffffff" }}
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
                <Link
                  className="nav-link active"
                  to="/home"
                  style={{ color: "white" }}
                >
                  Reservar
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "white" }}
                >
                  Mis reservas
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {reservations.slice(0, 4).map((reservation) => (
                    <li key={reservation.id}>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => handleOpenModal(reservation)} // Abre el modal al hacer clic
                      >
                        <div className="d-flex align-items-center">
                          {/* Aquí usamos qr_code directamente para generar el QR */}
                          <QRCodeCanvas
                            value={reservation.qr_code} // Usamos la cadena qr_code para el valor del QR
                            size={30} // Tamaño del código QR
                            style={{ marginRight: "10px" }} // Espacio entre el QR y el texto
                          />
                          <div>
                            <p style={{ margin: 0, fontSize: "12px" }}>
                              {reservation.status} -{" "}
                              {reservation.reservation_date}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
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
                    style={{ color: "white" }}
                  >
                    Usuarios
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ backgroundColor: "#e3f2fd" }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/search-user">
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
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle active"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "white" }}
                  >
                    Celdas
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ backgroundColor: "#ffffff" }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/search-slot">
                        Buscar celdas
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleOpenModalSlot()}
                      >
                        Crear celdas
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
                  style={{ color: "white" }}
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
      {/* Usamos el componente QRCodeModal si una reserva está seleccionada */}
      {isModalOpen && (
        <QRCodeModal
          selectedCell={selectedReservation}
          reservationId={selectedReservation.id}
          handleCloseModal={handleCloseModal}
        />
      )}
      {isCreateSlotModalOpen && (
        <ParkingslotModal
          show={isCreateSlotModalOpen}
          handleClose={handleCloseCreateSlotModal}
        />
      )}
    </div>
  );
};

export default Navbar;
