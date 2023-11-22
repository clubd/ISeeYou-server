const userData = require("../seed-data/users");
const taskData = require("../seed-data/tasks");
const assignData =  require ("../seed-data/assigns");

exports.seed = async function(knex) {
  await knex("assigns").del();
  await knex("tasks").del();
  await knex("users").del();
  await knex("users").insert(userData);
  await knex("tasks").insert(taskData);
  await knex("assigns").insert(assignData);
};