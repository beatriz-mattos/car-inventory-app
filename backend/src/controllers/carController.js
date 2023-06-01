const carModel = require('../models/carModel');

const readAllCars = async (req, res) => {
    const cars = await carModel.readAllCars();

    return res.status(201).json(cars);
}

module.exports = { readAllCars }
