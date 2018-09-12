'use strict'

var express = require ('express');
var userController = require('../controllers/user');
var api = express.Router();
var middlewareAuth = require('../middlewares/authenticated')

api.get('/user', userController.getUsers);
api.get('/user/:id', userController.getUserById);
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);

module.exports = api;