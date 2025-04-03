import React, { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { cancelReservation } from "../services/reservations/api";

const QRCodeModal = ({
  selectedCell,
  reservationId,
  handleCloseModal,
  qrCode,
}) => {
  const navigate = useNavigate();
  const handleDownloadQR = () => {
    // Obtener el canvas de QR generado por QRCodeCanvas
    const canvas = document.getElementById("qr-code-canvas");
    const imageUrl = canvas.toDataURL("image/png"); // Convertimos el canvas a una imagen PNG
    const link = document.createElement("a");
    link.href = imageUrl; // Establecemos la URL de la imagen
    link.download = "codigo-qr.png"; // Establecemos el nombre de la descarga
    link.click(); // Simulamos el clic para descargar la imagen
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!reservationId) {
        reservationId = qrCode.split(",")[0].split(":")[1].trim();
      }
    };
    fetchData();
  }, []);

  const handleCancelClick = async () => {
    try {
      if (!reservationId) {
        reservationId = qrCode.split(",")[0].split(":")[1].trim();
      }
      await cancelReservation({ id: parseInt(reservationId) });
      alert("Se canceló de manera exitosa la reservación");
      navigate(0);
    } catch {
      alert("No se pudo cancelar la reservación");
    }
  };
  return (
    <div
      className="modal show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Código QR de Reserva</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body d-flex flex-column align-items-center justify-content-center">
            <p className="text-center">
              {selectedCell.status != 1
                ? `Su reserva está ${selectedCell.status}`
                : "¡Reserva exitosa!"}
            </p>
            <p className="text-center">
              {selectedCell.status === 1 || selectedCell.status === "Activa"
                ? "Recuerda presentar el código QR en la talanquera"
                : "¡Pero puedes volver a reservar!"}
            </p>
            <div className="d-flex justify-content-center mb-3">
              <QRCodeCanvas
                id="qr-code-canvas"
                value={
                  qrCode
                    ? qrCode
                    : `Reserva ID: ${reservationId}, Celda: ${selectedCell.slot_number}, Vehiculo: ${selectedCell.vehicle_type_id}`
                }
                size={256} // Tamaño del QR
              />
            </div>
            <button
              className="btn btn-success mt-3 mb-3"
              onClick={handleDownloadQR}
            >
              Descargar Código QR
            </button>
            {(selectedCell.status === 1 ||
              selectedCell.status === "Activa") && (
              <button
                className="btn btn-danger mt-3 mb-3"
                onClick={handleCancelClick}
              >
                Cancelar Reserva
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
