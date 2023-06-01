/* This update performs an additional command to set the default value of the "id_new" column as uuid_generate_v4() before updating the values */

exports.up = function (knex) {
    return knex.schema.alterTable('cars_inventory', function (table) {
        table.uuid('id_new').defaultTo(knex.raw('uuid_generate_v4()')).notNullable();
    })
        .then(function () {
            return knex.raw('ALTER TABLE cars_inventory ALTER COLUMN id_new SET DEFAULT uuid_generate_v4()');
        })
        .then(function () {
            return knex.raw('UPDATE cars_inventory SET id_new = uuid_generate_v4()');
        })
        .then(function () {
            return knex.schema.alterTable('cars_inventory', function (table) {
                table.dropColumn('id');
                table.renameColumn('id_new', 'id');
                table.primary('id');
            });
        });
};

exports.down = function (knex) {
    return knex.schema.alterTable('cars_inventory', function (table) {
        table.dropPrimary();
        table.renameColumn('id', 'id_new');
        table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).notNullable().alter();
        table.dropColumn('id_new');
        table.primary('id');
    });
};
