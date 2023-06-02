const knex = require('knex');
const knexfile = require('../../knexfile');
const { v4: uuidv4 } = require('uuid');

const db = knex(knexfile.development);

const readAllCars = async () => {
    try {
        const cars = await db.select('*').from('cars_inventory');
        return cars;
    } catch (error) {
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
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        };

        await db('cars_inventory').insert(newCar);

        return { message: 'Just created a new car!', newCar };
    } catch (error) {
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

const updateCarById = async (id, carData) => {
    try {
        const { registration_plate, chassis_number, renavam, model, brand, year } = carData;
        await db('cars_inventory').where({ id }).update({
            registration_plate,
            chassis_number,
            renavam,
            model,
            brand,
            year,
            updated_at: db.fn.now()
        });
        return { message: 'Successfully updated car' };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const permanentDeleteCarById = async (id) => {
    try {
        await db('cars_inventory').where({ id }).del();
        return { message: 'Permanently deleted car' };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const softDeleteCarById = async (id) => {
    try {
        const car = await db('cars_inventory').where({ id }).first();

        if (!car) return null;
        if (car.deleted) return car;

        // Mark the car as deleted by setting a flag "deleted" to true
        await db('cars_inventory').where({ id }).update({ deleted: true });

        return {
            message:
                'Car successfully soft-deleted! Attention, it will be permanently deleted within 6 minutes'
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    readAllCars,
    createCar,
    readCarById,
    updateCarById,
    permanentDeleteCarById,
    softDeleteCarById
};

