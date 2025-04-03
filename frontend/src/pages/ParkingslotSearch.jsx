import React, { useState, useEffect } from "react";
import ParkingSlotTable from "../components/ParkingslotTable";
import { getParkingslotsAll } from "../services/parkingslot/api";

const ParkingSlotSearch = () => {
  const [parkingslots, setParkingSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState(parkingslots); // Slots filtrados
  const [searchQuery, setSearchQuery] = useState(""); // Valor de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const pageSize = 5; // Número de registros por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParkingslotsAll();
        setParkingSlots(data.body);
        setFilteredSlots(data.body);
      } catch (err) {
        alert("Error al obtener celdas");
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar los parkingslots por slot_number, location o vehicle_type
    const result = parkingslots.filter((slot) => {
      return (
        slot.id.toString().includes(query) ||
        slot.slot_number.toLowerCase().includes(query) || // Filtra por slot_number
        slot.location.toLowerCase().includes(query) // Filtra por location
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
        placeholder="Buscar por id, slot o ubicación"
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
