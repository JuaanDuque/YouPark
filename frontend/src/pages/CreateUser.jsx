import React, { useState } from "react";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    numberId: "",
    phone: "",
    apartment: "",
    vehicle1: "",
    vehicle2: "",
    vehicle1Type: 0,
    vehicle2Type: 0,
    role_id: 2,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    console.log("e.target.name", e.target.name);
    console.log("e.target.value", e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validación: Si seleccionó "Carro" (1) o "Moto" (2), debe ingresar una placa
    if (
      (formData.vehicle1Type === "1" || formData.vehicle1Type === "2") &&
      !formData.vehicle1.trim()
    ) {
      newErrors.vehicle1 = "Debes ingresar la placa del vehículo.";
    }
    if (
      (formData.vehicle2Type === "1" || formData.vehicle2Type === "2") &&
      !formData.vehicle2.trim()
    ) {
      newErrors.vehicle2 = "Debes ingresar la placa del vehículo.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Formulario enviado con éxito:", formData);
    newErrors = { vehicle1: null, vehicle2: null };
    setFormData({
      fullName: "",
      numberId: "",
      phone: "",
      apartment: "",
      vehicle1: "",
      vehicle2: "",
      vehicle1Type: 0,
      vehicle2Type: 0,
      role_id: 2,
    });
    setErrors(newErrors);
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
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Número de Identificación</label>
              <input
                className="form-control rounded-4 border"
                name="numberId"
                id="numberId"
                value={formData.numberId}
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
          </div>

          {/* Segunda Columna */}
          <div className="col-md-6">
            <div className="mb-3 d-flex align-items-center">
              <div className="flex-grow-1 me-2">
                <label className="form-label">Vehículo 1</label>
                <input
                  className={`form-control rounded-4 border ${
                    errors.vehicle1 ? "border-danger" : ""
                  }`}
                  name="vehicle1"
                  id="vehicle1"
                  minLength={5}
                  maxLength={6}
                  value={formData.vehicle1}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Tipo</label>
                <select
                  className="form-select rounded-4 border"
                  name="vehicle1Type"
                  value={formData.vehicle1Type}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
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
                    errors.vehicle2 ? "border-danger" : ""
                  }`}
                  name="vehicle2"
                  id="vehicle2"
                  minLength={5}
                  maxLength={6}
                  value={formData.vehicle2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label">Tipo</label>
                <select
                  className="form-select rounded-4 border"
                  name="vehicle2Type"
                  value={formData.vehicle2Type}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="1">Carro</option>
                  <option value="2">Moto</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Apartamento</label>
              <input
                className="form-control rounded-4 border"
                name="apartment"
                id="apartment"
                value={formData.apartment}
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
