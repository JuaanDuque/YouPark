import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeModal from "./QRcodeModal";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createReservation,
  updateReservation,
} from "../services/reservations/api";
import { updateParkingSlot } from "../services/parkingslot/api";

const StepThree = ({ selectedCell, handlePreviousStep }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationId, setReservationId] = useState(0);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleConfirm = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      ...selectedCell,
      user: user,
    };
    try {
      const response = await createReservation(data);
      const newReservationId = response.body.reservationId;
      await updateReservation({
        id: newReservationId,
        qr_code: `Reserva ID: ${newReservationId}, Celda: ${selectedCell.slot_number}, Vehiculo: ${selectedCell.vehicle_type_id}`,
      });
      await updateParkingSlot({ id: selectedCell.id, status: 0 });
      setReservationId(newReservationId);
      setIsConfirmed(true);
    } catch (err) {
      console.log(err);
      alert(err.body);
    }
  };

  const handleCloseModal = () => {
    setIsConfirmed(false);
    navigate(0);
  };

  return (
    <div>
      <h2>Confirmación de la Celda</h2>
      <p className="mt-1">Celda seleccionada: {selectedCell.slot_number}</p>
      <p className="mt-1">
        Tipo de vehículo:{" "}
        {selectedCell.vehicle_type_id === 1 ? "Carro" : "Moto"}
      </p>

      <div className="mt-2">
        <p>
          <strong>Términos y Condiciones</strong>
        </p>
        <div
          className="condition"
          style={{
            maxHeight: "240px",
            maxWidth: "500px",
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#ffffff",
          }}
        >
          <p>
            Al hacer una reserva, usted acepta las condiciones del parqueadero,
            las cuales incluyen el pago por adelantado, la disponibilidad de
            espacio y la responsabilidad sobre el cuidado de su vehículo. El
            parqueadero no se hace responsable por daños ocasionados al vehículo
            durante el tiempo de estacionamiento. La reserva es válida solo para
            el vehículo registrado en este sistema.
          </p>
          <p>
            El usuario debe asegurarse de estacionar el vehículo dentro de las
            líneas delimitadas en la zona de estacionamiento. En caso de que el
            vehículo esté fuera de las áreas asignadas o impida el movimiento de
            otros vehículos, el parqueadero se reserva el derecho de mover el
            vehículo sin responsabilidad alguna.
          </p>
          <p>
            El tiempo de estacionamiento está limitado a las horas previamente
            establecidas en el sistema. En caso de que el vehículo no sea
            retirado antes del tiempo de cierre, el parqueadero cobrará una
            tarifa adicional.
          </p>
          <p>
            El parqueadero tiene derecho a modificar los términos y condiciones
            en cualquier momento. Se recomienda revisar las condiciones antes de
            realizar cualquier reserva. Para más detalles, consulte nuestra
            página web.
          </p>
        </div>
        <div>
          <input
            type="checkbox"
            id="termsCheck"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsCheck" className="ms-2 mt-1">
            Acepto los Términos y Condiciones
          </label>
        </div>
      </div>

      <div className="position-fixed bottom-0 start-50 translate-middle-x mb-3">
        <button
          onClick={handlePreviousStep}
          className="btn btn-secondary me-2 mt-2"
        >
          Atrás
        </button>
        <button
          className="btn btn-primary me-2 mt-2"
          disabled={!isChecked}
          onClick={handleConfirm}
        >
          Confirmar Reserva
        </button>
      </div>

      {/* Usamos el componente QRCodeModal si la reserva ha sido confirmada */}
      {isConfirmed && (
        <QRCodeModal
          selectedCell={selectedCell}
          reservationId={reservationId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default StepThree;
