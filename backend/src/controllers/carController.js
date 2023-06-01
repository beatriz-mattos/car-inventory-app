const carModel = require('../models/carModel');

const readAllCars = async (req, res) => {
  const cars = await carModel.readAllCars();

  return res.status(201).json(cars);
}

const createCar = async (req, res) => {
  const createdCar = await carModel.createCar(req.body);

  return res.status(201).json(createdCar);
};

module.exports = { readAllCars, createCar }
