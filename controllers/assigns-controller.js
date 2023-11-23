const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
    try {
        const data = await knex("assigns");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving Assignments: ${error}`,
        });
    }
};

module.exports = {
    index
}