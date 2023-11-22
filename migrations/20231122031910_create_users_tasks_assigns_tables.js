/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    createTable("users", (table) => {
        table.increments("id").primary();
        table.string("firstName").notNullable();
        table.string("lastName").notNullable();
        table.string("email").notNullable();
        table.string('phone').notNullable();
        table.string('password').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {

};
