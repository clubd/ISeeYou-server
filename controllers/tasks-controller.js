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

const create = async (req, res) => {
    const userId = req.params.id;

    if (!req.body.title || !req.body.description|| !req.body.status|| !req.body.priorityLevel) {
        return res.status(400).json({
            message: "Please provide all required information to create a task.",
        });
    }

    try {
        const taskData = {...req.body, users_id: userId};
        const result = await knex("tasks").insert(taskData);
        const newTaskId = result[0];
        await knex("assigns").insert({ users_id: userId, tasks_id: newTaskId });
        const createdTasks = await knex("tasks").where({ users_id: userId });

        res.status(201).json(createdTasks);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new task: ${error}`,
        });
    }
};

module.exports = {
    index,
    findOne,
    create,
};