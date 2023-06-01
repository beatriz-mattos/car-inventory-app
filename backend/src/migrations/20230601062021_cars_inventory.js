exports.up = function (knex) {
    return knex.schema.createTable('cars_inventory', function (table) {
        table.increments('id');
        table.string('registration_plate');
        table.string('chassis_number');
        table.string('renavam');
        table.string('model');
        table.string('brand');
        table.integer('year');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('cars_inventory');
};
