const carModel = require('../models/carModel');
const { schedulePermanentDeletion } = require('../utils/schedulePermanentDeletion');

const readAllCars = async (req, res) => {
  const cars = await carModel.readAllCars();

  return res.status(200).json(cars);
}

const createCar = async (req, res) => {
  try {
    const createdCar = await carModel.createCar(req.body);
    return res.status(201).json(createdCar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
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

const updateCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await carModel.updateCarById(id, req.body);

    if (!updatedCar) {
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.status(200).json(updatedCar);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

const permanentDeleteCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await carModel.permanentDeleteCarById(id);

    if (!deletedCar) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(204).json(deletedCar);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const softDeleteCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.softDeleteCarById(id);

    if (!car) {
      res.status(404).json({ error: 'Car not found' });
    } else if (car.deleted) {
      res.status(409).json({ error: 'Car is already soft-deleted' });
    } else {
      schedulePermanentDeletion(id);
      res.status(200).json({
        message: 'Car soft-deleted successfully! It will be permanently deleted within 3 minutes.'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  readAllCars,
  createCar,
  readCarById,
  updateCarById,
  permanentDeleteCarById,
  softDeleteCarById
}
