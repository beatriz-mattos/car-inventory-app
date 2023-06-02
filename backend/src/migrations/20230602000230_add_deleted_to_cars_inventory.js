exports.up = function (knex) {
    return knex.schema.alterTable('cars_inventory', function (table) {
        table.boolean('deleted').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('cars_inventory', function (table) {
        table.dropColumn('deleted');
    });
};