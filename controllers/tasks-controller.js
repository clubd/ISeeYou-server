const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
    try {
        const data = await knex("tasks");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Tasks: ${err}`)
    }
};

module.exports = {
    index,
};