const express = require('express');
const config = require('./config');
const vehicles = require('./modules/vehicles/rutes');

const app = express();

//configuracion
app.set('port',config.app.port);

//rutas
app.use('/api/vehicles',vehicles);
module.exports = app;