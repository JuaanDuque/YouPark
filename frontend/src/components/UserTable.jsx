import React, { useState } from "react";
import { createUser } from "../services/users/api";
import { useNavigate } from "react-router-dom";

const UserTable = ({ users, currentPage, pageSize, onPageChange }) => {
  const [showModal, setShowModal] = useState(false); // Para controlar si se muestra el modal
  const [selectedUser, setSelectedUser] = useState(null); // El usuario seleccionado
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  let newErrors = {};
  const validateVehicles = () => {
    const validateVehicle = (vehicle, vehicleType, vehicleName) => {
      // Verificar si vehicle no es null ni undefined antes de llamar a trim()
      if (vehicle && vehicle !== "" && (!vehicleType || vehicleType === "0")) {
        newErrors[`${vehicleName}Type`] =
          "Debes ingresar el tipo del vehículo.";
      }

      if (
        (vehicleType === "1" || vehicleType === "2") &&
        (!vehicle || vehicle.trim() === "")
      ) {
        newErrors[`${vehicleName}_id`] =
          "Debes ingresar la placa del vehículo.";
      } else if (vehicle && vehicle.length < 5) {
        // Aseguramos mínimo de 5 caracteres
        newErrors[`${vehicleName}_id`] =
          "La placa debe tener al menos 5 caracteres.";
      }
    };

    validateVehicle(
      selectedUser.vehicle1_id,
      selectedUser.vehicle1Type,
      "vehicle1"
    );
    validateVehicle(
      selectedUser.vehicle2_id,
      selectedUser.vehicle2Type,
      "vehicle2"
    );
    if (
      Number(selectedUser.vehicle1Type) === 1 &&
      Number(selectedUser.vehicle2Type) === 1
    ) {
      newErrors.vehicle2Type = "Solo puedes registrar un carro.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert(Object.values(newErrors).join("\n"));
      return false;
    }

    return true;
  };

  // Función para manejar la edición del usuario
  const handleEditClick = (user) => {
    setSelectedUser(user); // Asignamos el usuario seleccionado al estado
    setShowModal(true); // Mostramos el modal
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedUser(null);
    newErrors = {
      vehicle1_id: null,
      vehicle2_id: null,
      vehicle1Type: null,
      vehicle2Type: null,
    };
    setErrors(newErrors); // Limpiamos la selección del usuario
  };

  // Función para manejar la actualización del usuario
  const handleSaveChanges = async () => {
    if (!validateVehicles()) return;
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const data = {
      token: token,
      ...storedUser,
      newUser: { ...selectedUser },
    };
    try {
      await createUser(data);
      alert("Usuario actualizado satisfactoriamente");
      newErrors = {
        vehicle1_id: null,
        vehicle2_id: null,
        vehicle1Type: null,
        vehicle2Type: null,
      };
      setErrors(newErrors);
      navigate(0);
    } catch (err) {
      alert("Error al crear el usuario");
    }
    newErrors = {
      vehicle1_id: null,
      vehicle2_id: null,
      vehicle1Type: null,
      vehicle2Type: null,
    };
    setErrors(newErrors);
    // Aquí se manejarían los cambios, por ejemplo, haciendo un POST para actualizar el usuario
    handleClose(); // Cierra el modal después de guardar los cambios
  };
  // Función para dividir los usuarios en páginas
  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / pageSize);

  return (
    <>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Placa 1</th>
            <th>Placa 2</th>
            <th>Apartamento</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.identification_number}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.phone}</td>
                <td>{user.vehicle1_id}</td>
                <td>{user.vehicle2_id}</td>
                <td>{user.apartment_number}</td>
                <td>{user.active ? "Sí" : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEditClick(user)} // Abre el modal con los datos del usuario
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron usuarios</td>
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
      {/* Modal de edición */}
      {showModal && selectedUser && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Usuario</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                      className="form-control"
                      type="text"
                      value={selectedUser.full_name}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          full_name: e.target.value,
                        });
                      }}
                      disabled
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Número de Identificación
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={selectedUser.identification_number}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                      className="form-control"
                      type="text"
                      value={selectedUser.phone}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          phone: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <div className="flex-grow-1 me-2">
                      <label className="form-label">Placa Vehículo 1</label>
                      <input
                        className={`form-control border ${
                          errors.vehicle1_id ? "border-danger" : ""
                        }`}
                        type="text"
                        minLength={5}
                        maxLength={6}
                        value={selectedUser.vehicle1_id || ""}
                        onChange={(e) => {
                          setSelectedUser({
                            ...selectedUser,
                            vehicle1_id:
                              e.target.value === "" ? null : e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Tipo</label>
                      <select
                        className={`form-select ${
                          errors.vehicle1Type ? "border border-danger" : ""
                        }`}
                        value={selectedUser.vehicle1Type || "0"}
                        onChange={(e) => {
                          setSelectedUser({
                            ...selectedUser,
                            vehicle1Type: e.target.value,
                          });
                        }}
                      >
                        <option value="0">Seleccionar</option>
                        <option value="1">Carro</option>
                        <option value="2">Moto</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3 d-flex align-items-center">
                    <div className="flex-grow-1 me-2">
                      <label className="form-label">Placa Vehículo 2</label>
                      <input
                        className={`form-control border ${
                          errors.vehicle2_id ? "border-danger" : ""
                        }`}
                        type="text"
                        minLength={5}
                        maxLength={6}
                        value={selectedUser.vehicle2_id || ""}
                        onChange={(e) => {
                          setSelectedUser({
                            ...selectedUser,
                            vehicle2_id:
                              e.target.value === "" ? null : e.target.value,
                          });
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Tipo</label>
                      <select
                        className={`form-select ${
                          errors.vehicle2Type ? "border border-danger" : ""
                        }`}
                        value={selectedUser.vehicle2Type || "0"}
                        onChange={(e) => {
                          setSelectedUser({
                            ...selectedUser,
                            vehicle2Type: e.target.value,
                          });
                        }}
                      >
                        <option value="0">Seleccionar</option>
                        <option value="1">Carro</option>
                        <option value="2">Moto</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Apartamento</label>
                    <input
                      className="form-control"
                      type="text"
                      value={selectedUser.apartment_number}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          apartment_number: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Activo</label>
                    <select
                      className="form-select"
                      value={selectedUser.active === 1 ? "1" : "0"}
                      onChange={(e) => {
                        setSelectedUser({
                          ...selectedUser,
                          active: e.target.value === "1" ? 1 : 0,
                        });
                      }}
                    >
                      <option value="1">Sí</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveChanges();
                  }}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTable;
