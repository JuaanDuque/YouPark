const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const vehicles = require('./modules/vehicles/routes');
const error = require('./network/errors');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuracion
app.set('port',config.app.port);

//rutas
app.use('/api/vehicles',vehicles);
app.use(error);

module.exports = app;