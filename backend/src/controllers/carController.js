const carModel = require('../models/carModel');

const readAllCars = async (req, res) => {
  const cars = await carModel.readAllCars();

  return res.status(201).json(cars);
}

const createCar = async (req, res) => {
  const createdCar = await carModel.createCar(req.body);

  return res.status(201).json(createdCar);
};

const readCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await carModel.readCarById(id);
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      return res.status(200).json(car);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { readAllCars, createCar, readCarById }
