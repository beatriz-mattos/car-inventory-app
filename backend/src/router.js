const express = require('express');
const carController = require('./controllers/carController');

const router = express.Router();

router.get('/cars', carController.readAllCars);

module.exports = router;
