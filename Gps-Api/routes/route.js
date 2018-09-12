'use strict'

var express = require ('express');
var routeController = require('../controllers/route');
var api = express.Router();
//var middlewareAuth = require('../middlewares/authenticated')

api.get('/route/:id',  routeController.getRouteById);
api.post('/route',  routeController.saveRoute);
api.put('/route/:id',  routeController.updateRoute);
api.get('/route/user/:userId',  routeController.getRoutesByUser);

module.exports = api;