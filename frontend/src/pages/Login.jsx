import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/login/api";
import { getUserEmail } from "../services/users/api";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData.email, formData.password);
      const user = await getUserEmail(formData.email);
      localStorage.setItem("token", data.body);
      localStorage.setItem("user", JSON.stringify(user.body[0]));
      setIsAuthenticated(true);
      navigate("/home");
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="container-container-bg d-flex justify-content-center align-items-center no-scroll">
      <div className="p-4" style={{ width: "400px" }}>
        <img
          src="/public/logo.png"
          className="d-block mx-auto w-logo mb-4"
          alt="Logo"
        ></img>
        <h3 className="text-center" style={{ color: "#0095d6" }}>
          <strong>Bienvenido</strong>
        </h3>
        <p className="text-center" style={{ color: "gray" }}>
          <small>¡Inicia sesión y aparca sin preocupaciones!</small>
        </p>
        <h2 className="text-center mb-3" style={{ color: "#0095d6" }}>
          <strong>INICIAR SESIÓN</strong>
        </h2>

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
