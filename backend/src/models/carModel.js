const knex = require('knex');
const knexfile = require('../../knexfile');

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

module.exports = { readAllCars };
