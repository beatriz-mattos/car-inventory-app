const knex = require('knex');
const knexfile = require('../../knexfile');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const db = knex(knexfile.development);

const readAllCars = async () => {
    try {
        const cars = await db.select('*').from('cars_inventory');
        return cars;
    } catch (error) {
        // TODO: error
        console.error(error);
        throw error;
    }
};

const createCar = async (carData) => {
    try {
        const { registration_plate, chassis_number, renavam, model, brand, year } = carData;
        const newCar = {
            id: uuidv4(),
            registration_plate,
            chassis_number,
            renavam,
            model,
            brand,
            year,
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        await db('cars_inventory').insert(newCar);

        return { message: 'Just created a new car!', newCar };
    } catch (error) {
        // TODO: error
        console.error(error);
        throw error;
    }
}

const readCarById = async (id) => {
    try {
        const car = await db('cars_inventory').where({ id }).first();
        return car;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { readAllCars, createCar, readCarById };
// TODO: updateCarById, deleteCarById
