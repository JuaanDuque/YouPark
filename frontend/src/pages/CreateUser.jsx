import React, { useState } from "react";
import { createUser } from "../services/users/api";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    identification_number: "",
    phone: "",
    email: "",
    tower: "",
    apartment_number: "",
    vehicle1_id: null,
    vehicle2_id: null,
    vehicle1Type: 0,
    vehicle2Type: 0,
    role_id: 2,
    active: 1,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        (name === "vehicle1" || name === "vehicle2") && value === ""
          ? null
          : value,
    }));
  };
  let newErrors = {};
  const validateVehicles = () => {
    const validateVehicle = (vehicle, vehicleType, vehicleName) => {
      if (vehicle != null && (!vehicleType || vehicleType === "0")) {
        newErrors[`${vehicleName}Type`] =
          "Debes ingresar el tipo del vehículo.";
      }
      if ((vehicleType === "1" || vehicleType === "2") && !vehicle.trim()) {
        newErrors[vehicleName] = "Debes ingresar la placa del vehículo.";
      }
    };

    validateVehicle(formData.vehicle1_id, formData.vehicle1Type, "vehicle1");
    validateVehicle(formData.vehicle2_id, formData.vehicle2Type, "vehicle2");

    if (formData.vehicle1Type === "1" && formData.vehicle2Type === "1") {
      newErrors.vehicle2Type = "Solo puedes registrar un carro.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert(Object.values(newErrors).join("\n"));
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateVehicles()) return;

    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const data = {
      token: token,
      ...storedUser,
      newUser: { ...formData, id: 0 },
    };
    try {
      await createUser(data);
      alert("Usuario creado satisfactoriamente");
      newErrors = {
        vehicle1_id: null,
        vehicle2_id: null,
        vehicle1Type: null,
        vehicle2Type: null,
      };
      setFormData({
        full_name: "",
        identification_number: "",
        phone: "",
        email: "",
        tower: "",
        apartment_number: "",
        vehicle1_id: "",
        vehicle2_id: "",
        vehicle1Type: 0,
        vehicle2Type: 0,
        role_id: 2,
        active: 1,
      });
      setErrors(newErrors);
    } catch (err) {
      alert("Error al crear el usuario");
    }
  };
  return (
    <div
      className="container mt-4 justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Primera Columna */}
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Nombre Completo</label>
              <input
                className="form-control rounded-4 border"
                name="full_name"
                id="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Identificación</label>
              <input
                className="form-control rounded-4 border"
                name="identification_number"
                id="identification_number"
                value={formData.identification_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                className="form-control rounded-4 border"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                className="form-control rounded-4 border"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Segunda Columna */}
          <div className="col-md-6">
            <div className="mb-3 d-flex align-items-center">
              <div className="flex-grow-1 me-2">
                <label className="form-label">Vehículo 1</label>
                <input
                  className={`form-control rounded-4 border ${
                    errors.vehicle1_id ? "border-danger" : ""
                  }`}
                  name="vehicle1_id"
                  id="vehicle1_id"
                  minLength={5}
                  maxLength={6}
                  value={formData.vehicle1_id ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Tipo</label>
                <select
                  className={`form-select rounded-4 border ${
                    errors.vehicle1Type ? "border-danger" : ""
                  }`}
                  name="vehicle1Type"
                  value={formData.vehicle1Type}
                  onChange={handleChange}
                >
                  <option value="0">Seleccionar</option>
                  <option value="1">Carro</option>
                  <option value="2">Moto</option>
                </select>
              </div>
            </div>

            <div className="mb-3 d-flex align-items-center">
              <div className="flex-grow-1 me-2">
                <label className="form-label">Vehículo 2</label>
                <input
                  className={`form-control rounded-4 border ${
                    errors.vehicle2_id ? "border-danger" : ""
                  }`}
                  name="vehicle2_id"
                  id="vehicle2_id"
                  minLength={5}
                  maxLength={6}
                  value={formData.vehicle2_id ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Tipo</label>
                <select
                  className={`form-select rounded-4 border ${
                    errors.vehicle2Type ? "border-danger" : ""
                  }`}
                  name="vehicle2Type"
                  value={formData.vehicle2Type}
                  onChange={handleChange}
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
                className="form-control rounded-4 border"
                name="apartment_number"
                id="apartment_number"
                value={formData.apartment_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Torre</label>
              <input
                className="form-control rounded-4 border"
                name="tower"
                id="tower"
                value={formData.tower}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Botón de Envío */}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary rounded-4 px-5">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
