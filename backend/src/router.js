const express = require('express');
const carController = require('./controllers/carController');

const router = express.Router();

router.post('/cars', carController.createCar);
router.get('/cars', carController.readAllCars);
//router.get('/cars/:id', carController.readCarById);
//router.put('/cars/:id', carController.updateCarById);
//router.delete('/cars/:id', carController.deleteCarById);

module.exports = router;
