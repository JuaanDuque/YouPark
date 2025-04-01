import React, { useState } from "react";
import Stepper from "../components/Stepper";

const Reservation = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [vehicleType, setVehicleType] = useState(null);

  // Lógica para habilitar/deshabilitar botones según los valores de vehicle1Type y vehicle2Type
  const isCarButtonDisabled =
    user.vehicle1Type !== 1 && user.vehicle2Type !== 1;
  const isMotoButtonDisabled =
    user.vehicle1Type !== 2 && user.vehicle2Type !== 2;
  const handleCarClick = () => setVehicleType(1);
  const handleMotoClick = () => setVehicleType(2);

  return (
    <div className="text-center">
      {!vehicleType ? (
        <div>
          {/* Contenedor para centrar los dos párrafos */}
          <div
            className="justify-content-center mx-auto my-4 p-1 border rounded-pill"
            style={{ width: "200px" }}
          >
            Bienvenido tilin
          </div>
          <div
            className="mx-auto my-4 p-4 bg-white rounded border"
            style={{ width: "400px" }}
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
              <img
                src={"/public/carro.png"}
                alt="Carro"
                style={{ width: "70px" }}
              />
            </button>
          </div>
          <div>
            <button
              onClick={handleMotoClick}
              disabled={isMotoButtonDisabled}
              className="button-vehicle p-3 mt-3"
            >
              <img
                src={"/public/moto.png"}
                alt="Moto"
                style={{ width: "70px" }}
              />
            </button>
          </div>
        </div>
      ) : (
        <Stepper vehicleType={vehicleType} />
      )}
    </div>
  );
};

export default Reservation;
