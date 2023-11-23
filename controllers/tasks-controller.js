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

const update = async (req, res) => {
    const taskId = req.params.id;

    try {
        const rowsUpdated = await knex("tasks").where({ id: taskId }).update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: `Task with ID ${taskId} not found`,
            });
        }

        const updatedTask = await knex("tasks").where({ id: taskId });

        res.json(updatedTask[0]);
    } catch (error) {
        res.status(500).json({
            message: `Unable to update task with ID ${taskId}: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    try {
        const rowsDeleted = await knex("tasks").where({ id: req.params.id }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Task with ID ${req.params.id} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete user: ${error}`
        });
    }
};

module.exports = {
    index,
    findOne,
    update,
    remove
};