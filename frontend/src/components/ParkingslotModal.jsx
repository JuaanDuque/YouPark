import React, { useState, useEffect } from "react";

const ParkingSlotModal = ({ show, handleClose, parkingSlot }) => {
  const [formData, setFormData] = useState({
    slot_number: "",
    location: "1",
    status: 1,
    vehicle_type: 1, // Tipo de vehículo: 1 para Carro, 2 para Moto
  });

  useEffect(() => {
    if (parkingSlot) {
      setFormData({
        slot_number: parkingSlot.slot_number,
        location: parkingSlot.location,
        status: parkingSlot.status,
        vehicle_type: parkingSlot.vehicle_type || 1, // Por defecto Carro
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

  const handleSaveChanges = () => {
    handleClose();
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
                />
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
                  name="vehicle_type"
                  value={formData.vehicle_type}
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
