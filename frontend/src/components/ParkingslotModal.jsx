import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createParkingslot,
  updateParkingSlot,
} from "../services/parkingslot/api";

const ParkingSlotModal = ({ show, handleClose, parkingSlot }) => {
  const [formData, setFormData] = useState({
    id: 0,
    slot_number: "",
    location: "1",
    status: 1,
    vehicle_type_id: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (parkingSlot) {
      setFormData({
        id: parkingSlot.id,
        slot_number: parkingSlot.slot_number,
        location: parkingSlot.location,
        status: parkingSlot.status,
        vehicle_type_id: parkingSlot.vehicle_type_id,
      });
    }
  }, [parkingSlot]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    if (formData.slot_number.length < 2) {
      alert("El slot_number debe tener al menos dos caracteres.");
      return;
    }
    const firstChar = formData.slot_number[0].toUpperCase();
    const secondChar = formData.slot_number[1];
    const expectedFirstChar = formData.vehicle_type_id === "1" ? "A" : "M";
    if (firstChar !== expectedFirstChar) {
      alert(
        `El primer carácter debe ser "${expectedFirstChar}" para el vehículo seleccionado.`
      );
      return;
    }

    if (secondChar !== formData.location) {
      alert(
        "El segundo carácter debe corresponder a la ubicación seleccionada."
      );
      return;
    }
    try {
      if (formData.id != 0) {
        await updateParkingSlot(formData);
        alert("Se ha actualizado con exito");
      } else {
        await createParkingslot(formData);
        alert("Se ha creado con exito");
      }
      handleClose();
      navigate(0);
    } catch {
      alert("Error interno, vuelvalo a intentar más tarde.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Slot de Estacionamiento</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Número de Slot</label>
                <input
                  className="form-control"
                  type="text"
                  name="slot_number"
                  value={formData.slot_number}
                  onChange={handleInputChange}
                  required
                  style={{ textTransform: "uppercase" }}
                />
                <small className="form-text text-muted">
                  El primer carácter es A si es carro o M si es moto, y el
                  segundo carácter debe ser la ubicación.
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label">Ubicación</label>
                <select
                  className="form-select"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Ubicación 1</option>
                  <option value="2">Ubicación 2</option>
                  <option value="3">Ubicación 3</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Tipo de Vehículo</label>
                <select
                  className="form-select"
                  name="vehicle_type_id"
                  value={formData.vehicle_type_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">Carro</option>
                  <option value="2">Moto</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlotModal;
