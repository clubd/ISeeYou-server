/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("id").primary();
            table.string("firstName").notNullable();
            table.string("lastName").notNullable();
            table.string("email").notNullable();
            table.string("phone").notNullable();
            table.string("password").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
        .createTable("tasks", (table) => {
            table.increments("id").primary();
            table.string("title").notNullable();
            table.text("description").notNullable();
            table.string("status").notNullable();
            table.string("priorityLevel").notNullable();
            table.integer("users_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
            table.timestamp("deadline").defaultTo(knex.fn.now());
        })
        .createTable("assigns", (table) => {
            table.increments("id").primary();
            table.integer("users_id")
                .unsigned()
                .references("users.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.integer("tasks_id")
                .unsigned()
                .references("tasks.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.timestamp("created_at").defaultTo(knex.fn.now());
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable("assigns").dropTable("tasks").dropTable("user");
};
