import React, { useState } from "react";
import ParkingSlotTable from "../components/ParkingslotTable";

const ParkingSlotSearch = () => {
  // Datos simulados de los parkingslots
  const [parkingslots] = useState([
    { id: 1, slot_number: "A1", vehicle_type: 1, location: "1", status: 1 },
    { id: 2, slot_number: "B2", vehicle_type: 2, location: "2", status: 1 },
    { id: 3, slot_number: "C3", vehicle_type: 1, location: "3", status: 0 },
    { id: 4, slot_number: "D4", vehicle_type: 1, location: "1", status: 1 },
    { id: 5, slot_number: "E5", vehicle_type: 2, location: "2", status: 0 },
    { id: 6, slot_number: "F6", vehicle_type: 1, location: "3", status: 1 },
  ]);

  const [filteredSlots, setFilteredSlots] = useState(parkingslots); // Slots filtrados
  const [searchQuery, setSearchQuery] = useState(""); // Valor de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const pageSize = 5; // Número de registros por página

  // Filtrar los parkingslots cuando el usuario escribe algo
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar los parkingslots por slot_number, location o vehicle_type
    const result = parkingslots.filter((slot) => {
      return (
        slot.slot_number.toLowerCase().includes(query) || // Filtra por slot_number
        slot.location.toLowerCase().includes(query) || // Filtra por location
        (slot.vehicle_type && slot.vehicle_type.toString().includes(query)) // Filtra por vehicle_type
      );
    });

    setFilteredSlots(result); // Actualiza los parkingslots filtrados
    setCurrentPage(1); // Resetear a la primera página después de la búsqueda
  };

  // Cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(filteredSlots.length / pageSize)) {
      return; // No hacer nada si la página está fuera de rango
    }
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-3">
      <h2>Buscar Slots de Estacionamiento</h2>
      <input
        type="text"
        className="form-control mb-3 mt-3"
        placeholder="Buscar por slot, ubicación o tipo de vehículo"
        value={searchQuery}
        onChange={handleSearch}
      />

      <h3 className="mt-3 mb-3">Resultados de la Búsqueda:</h3>

      {/* Tabla de parkingslots filtrados */}
      <ParkingSlotTable
        parkingslots={filteredSlots}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ParkingSlotSearch;
