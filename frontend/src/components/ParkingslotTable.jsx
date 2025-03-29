import React, { useState } from "react";
import ParkingSlotModal from "./ParkingslotModal";

const ParkingSlotTable = ({
  parkingslots,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [selectedParkingSlot, setSelectedParkingSlot] = useState(null); // Slot seleccionado

  const handleEditClick = (parkingSlot) => {
    setSelectedParkingSlot(parkingSlot); // Asigna el slot seleccionado
    setShowModal(true); // Muestra el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cierra el modal
    setSelectedParkingSlot(null); // Limpia el parking slot seleccionado
  };

  // Paginación
  const indexOfLastSlot = currentPage * pageSize;
  const indexOfFirstSlot = indexOfLastSlot - pageSize;
  const currentSlots = parkingslots.slice(indexOfFirstSlot, indexOfLastSlot);

  const totalPages = Math.ceil(parkingslots.length / pageSize);

  return (
    <>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Slot Número</th>
            <th>Ubicación</th>
            <th>Tipo de Vehículo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentSlots.length > 0 ? (
            currentSlots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.id}</td>
                <td>{slot.slot_number}</td>
                <td>{slot.location}</td>
                <td>{slot.vehicle_type === 1 ? "Carro" : "Moto"}</td>
                <td>{slot.status === 1 ? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEditClick(slot)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron slots de estacionamiento</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="fixed-bottom d-flex justify-content-center py-3 mb-4">
        <button
          className="btn btn-secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="mx-3">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      {/* Modal de Edición */}
      <ParkingSlotModal
        show={showModal}
        handleClose={handleCloseModal}
        parkingSlot={selectedParkingSlot}
      />
    </>
  );
};

export default ParkingSlotTable;
