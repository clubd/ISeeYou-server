const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
    try {
        const data = await knex("users");
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving Users: ${err}`)
    }
};

const findOne = async (req, res) => {
    try {
        const usersFound = await knex("users").where({ id: req.params.id });

        if (usersFound.length === 0) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`
            });
        }

        const userData = usersFound[0];
        res.json(userData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve user data for user with ID ${req.params.id}`,
        });
    }
};

const tasks = async (req, res) => {
    try {
        const tasks = await knex("users").join("tasks", "tasks.users_id", "users.id").where({ users_id: req.params.id });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve tasks for user with ID ${req.params.id}: ${error}`,
        });
    }
};

const create = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.password) {
        return res.status(400).json({
            message: "Please provide all required information for the user request",
        });
    }

    try {
        const result = await knex("users").insert(req.body);
        const newUsersId = result[0];
        const createdUser = await knex("users").where({ id: newUsersId });

        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new user: ${error}`,
        });
    }
};

const update = async (req, res) => {
    try {
        const rowsUpdated = await knex("users").where({ id: req.params.id }).update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`
            });
        }

        const updatedUser = await knex("users").where({ id: req.params.id });

        res.json(updatedUser[0]);
    } catch (error) {
        res.status(500).json({
            message: `Unable to update user with ID ${req.params.id}: ${error}`
        });
    }
};

const remove = async (req, res) => {
    try {
        const rowsDeleted = await knex("users").where({ id: req.params.id }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `User with ID ${req.params.id} not found` });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete user: ${error}`
        });
    }
};

const createTask = async (req, res) => {
    const userId = req.params.id;

    if (!req.body.title || !req.body.description || !req.body.status || !req.body.priorityLevel || !req.body.deadline) {
        return res.status(400).json({
            message: "Please provide all required information to create a task.",
        });
    }

    try {
        const taskData = { ...req.body, users_id: userId };
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
    tasks,
    create,
    update,
    remove,
    createTask
};