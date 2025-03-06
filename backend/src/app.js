const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const vehicles = require('./modules/vehicles/routes');
const users = require('./modules/users/routes');
const error = require('./network/errors');
const auth = require('./modules/auth/routes');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Permitir solicitudes desde el frontend
app.use(cors({ origin: 'http://localhost:5173' }));

//configuracion
app.set('port',config.app.port);

//rutas
app.use('/api/vehicles',vehicles);
app.use('/api/users',users);
app.use('/api/auth',auth)
app.use(error);

module.exports = app;