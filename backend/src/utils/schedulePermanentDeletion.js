const carModel = require('../models/carModel');
const cron = require('node-cron');
const knex = require('knex');
const knexfile = require('../../knexfile');

const db = knex(knexfile.development);

const schedulePermanentDeletion = async (id) => {
    // Schedule permanent deletion after 3 minutes for fun and testing purposes :)
    cron.schedule('*/3 * * * *', async () => {
        try {
            const car = await db('cars_inventory').where({ id }).first();
            if (car && car.deleted) {
                await carModel.permanentDeleteCarById(id);
                console.log(`Car permanently deleted with id: ${id}`);
            }
        } catch (error) {
            console.error(`Error deleting car with id: ${id}`);
        }
    });
}

module.exports = { schedulePermanentDeletion };
