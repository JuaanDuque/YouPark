import React, { useState } from "react";
import Stepper from "../components/Stepper";
import QRreadEntranceExit from "../components/QRreadEntranceExit"; // Asegúrate de tener la ruta correcta

const Reservation = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [vehicleType, setVehicleType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Lógica para habilitar/deshabilitar botones según los valores de vehicle1Type y vehicle2Type
  const isCarButtonDisabled =
    user.vehicle1Type !== 1 && user.vehicle2Type !== 1;
  const isMotoButtonDisabled =
    user.vehicle1Type !== 2 && user.vehicle2Type !== 2;

  const handleCarClick = () => setVehicleType(1);
  const handleMotoClick = () => setVehicleType(2);

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="text-center">
      {!vehicleType ? (
        <div>
          <div
            className="justify-content-center mx-auto my-4 p-1 border rounded-pill"
            style={{ width: "300px" }}
          >
            Bienvenido tilin
          </div>
          <div
            className="mx-auto my-4 p-4 bg-white rounded border"
            style={{ width: "300px" }}
          >
            Selecciona cual es tu medio de transporte para hacer su reserva
            dando click.
          </div>
          <div>
            <button
              onClick={handleCarClick}
              disabled={isCarButtonDisabled}
              className="button-vehicle mb-4 p-3"
            >
              <img src={"/carro.png"} alt="Carro" style={{ width: "70px" }} />
            </button>
          </div>
          <div>
            <button
              onClick={handleMotoClick}
              disabled={isMotoButtonDisabled}
              className="button-vehicle p-3 mt-3"
            >
              <img src={"/moto.png"} alt="Moto" style={{ width: "70px" }} />
            </button>
          </div>
          <div
            className="justify-content-center mx-auto border rounded-pill"
            style={{ marginTop: "50px", width: "300px" }}
          >
            Simulación de la entrada o salida del parqueadero
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "50px" }}
          >
            <button
              className="button-vehicle me-3 p-2 ms-1"
              onClick={() => handleOpenModal(1)}
            >
              <img
                src={"/entrada.png"}
                alt="Entrada"
                style={{ width: "40px" }}
              />
            </button>
            <button
              className="button-vehicle p-2 me-1"
              onClick={() => handleOpenModal(0)}
            >
              <img src={"/salida.png"} alt="Salida" style={{ width: "40px" }} />
            </button>
          </div>
        </div>
      ) : (
        <Stepper vehicleType={vehicleType} />
      )}

      {/* Invocación del modal */}
      <QRreadEntranceExit
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
      />
    </div>
  );
};

export default Reservation;
