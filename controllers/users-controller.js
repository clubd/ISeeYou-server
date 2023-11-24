const knex = require("knex")(require("../knexfile"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "a667c5c6a02383e5730e4a9740c1628deefd405b5d243ff5a731e13831fdd1f1"


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

const register = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 14);
        const result = await knex('users').insert({
            firstName,
            lastName,
            email,
            phone,
            passwordHash,
        });

        const newUserId = result[0];
        const token = jwt.sign({ userId: newUserId }, secretKey, { expiresIn: '24h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Unable to register user.',
        });
    }
};

module.exports = {
    index,
    findOne,
    tasks,
    update,
    remove,
    createTask,
    register,
};