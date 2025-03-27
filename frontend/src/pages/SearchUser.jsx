import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import { getUsersRole } from "../services/users/api";

const UserSearch = () => {
  // Datos simulados de usuarios
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users); // Filtrados
  const [searchQuery, setSearchQuery] = useState(""); // Valor de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const pageSize = 5; // Número de registros por página

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersRole();
        setUsers(data.body);
        setFilteredUsers(data.body);
      } catch (err) {
        alert("Error al obtener usuarios");
      }
    };
    fetchData();
  }, []);
  // Filtrar los usuarios cuando el usuario escribe algo
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar los usuarios según el nombre, placa o apartamento
    const result = users.filter((user) => {
      return (
        user.full_name.toLowerCase().includes(query) || // Filtra por nombre
        (user.vehicle1_id && user.vehicle1_id.toLowerCase().includes(query)) || // Filtra por placa vehículo1
        (user.vehicle2_id && user.vehicle2_id.toLowerCase().includes(query)) || // Filtra por placa vehículo2
        user.apartment_number.toLowerCase().includes(query) // Filtra por apartamento
      );
    });

    setFilteredUsers(result); // Actualiza los usuarios filtrados
    setCurrentPage(1); // Resetear a la primera página después de la búsqueda
  };

  // Cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(filteredUsers.length / pageSize)) {
      return; // No hacer nada si la página está fuera de rango
    }
    setCurrentPage(newPage);
  };
  return (
    <div className="container mt-3">
      <h2>Buscar Usuarios</h2>
      <input
        type="text"
        className="form-control mb-3 mt-3"
        placeholder="Buscar por nombre, placa o apartamento"
        value={searchQuery}
        onChange={handleSearch}
      />

      <h3 className="mt-3 mb-3">Resultados de la Búsqueda:</h3>
      {/* Aquí renderizamos el componente de la tabla de usuarios */}
      <UserTable
        users={filteredUsers}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserSearch;
