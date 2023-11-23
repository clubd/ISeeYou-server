const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
    try {
        const data = await knex("tasks");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Tasks: ${err}`)
    }
};

const findOne = async (req, res) => {
    try {
        const tasksFound = await knex("tasks")
            .where({ id: req.params.id });

        if (tasksFound.length === 0) {
            return res.status(404).json({
                message: `Task with ID ${req.params.id} not found`
            });
        }

        const taskData = tasksFound[0];
        res.json(taskData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve data for task with ID ${req.params.id}`,
        });
    }
};

module.exports = {
    index,
    findOne,
};