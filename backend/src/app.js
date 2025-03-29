const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const config = require("./config");
const vehicles = require("./modules/vehicles/routes");
const users = require("./modules/users/routes");
const auth = require("./modules/auth/routes");
const parkingslot = require("./modules/parkingslot/routes");
const reservations = require("./modules/reservations/routes");
const error = require("./network/errors");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Permite peticiones desde el frontend
app.use(morgan("dev"));
app.use(express.json()); // Permite recibir JSON en las peticiones
app.use(express.urlencoded({ extended: true }));

//configuracion
app.set("port", config.app.port);

// Rutas
app.use("/api/vehicles", vehicles);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/parkingslot", parkingslot);
app.use("/api/reservations", reservations);
app.use(error);

module.exports = app;
