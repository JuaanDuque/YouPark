import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserEmail } from "../../services/api";
import AlertMessage from "../../components/AlertMessage";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" });

    try {
      const data = await loginUser(formData.email, formData.password);
      const user = await getUserEmail(formData.email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", user.data);
      setAlert({ message: "Inicio de sesión exitoso", type: "success" });

      navigate("/home");
    } catch (err) {
      setAlert({
        message: err.message || "Error al iniciar sesión",
        type: "danger",
      });
    }
  };

  return (
    <div className="container-container-bg d-flex justify-content-center align-items-center no-scroll">
      <div className="p-4" style={{ width: "400px" }}>
        <img
          src="/public/logo.png"
          className="img-fluid d-block mx-auto w-logo"
          alt="Logo"
        ></img>
        <p className="text-center" style={{ color: "#0095d6" }}>
          <strong>Bienvenido</strong>
        </p>
        <p className="text-center" style={{ color: "gray" }}>
          <small>¡Inicia sesión y aparca sin preocupaciones!</small>
        </p>
        <h3 className="text-center mb-3" style={{ color: "#3cb7ea" }}>
          <strong>INICIAR SESIÓN</strong>
        </h3>
        {/* Alerta reutilizable */}
        <AlertMessage message={alert.message} type={alert.type} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill border border-3 mt-2"
              name="email"
              value={formData.email}
              placeholder="Ingresa tu email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control rounded-pill border border-3 mt-2"
              name="password"
              value={formData.password}
              placeholder="Ingresa tu contraseña"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-100 custom-rounded-button mt-3 mb-4"
          >
            Ingresar
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-muted">¿Olvidaste tu contraseña?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
