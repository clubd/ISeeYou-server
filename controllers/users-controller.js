const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const authorize = require("../middleware/authorize");

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
        const userId = req.params.id;
        console.log("Received user ID:", userId);

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing in the request." });
        }
        const tasks = await knex("users").join("tasks", "tasks.users_id", "users.id").where({ users_id: req.params.id });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve tasks for user with ID ${req.params.id}: ${error}`,
        });
    }
};

const update = [authorize, async (req, res) => {
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
}];

const remove = [authorize, async (req, res) => {
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
}];

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
        const result = await knex("users").insert({
            firstName,
            lastName,
            email,
            phone,
            passwordHash,
        });

        const newUserId = result[0];
        const token = jwt.sign({ userId: newUserId }, process.env.JWT_KEY, { expiresIn: "24h" });

        res.status(201).json({ data: { token } });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Unable to register user."
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await knex("users").where({ email: email }).first();
        if (!user) {
            return res.status(401).json({ message: "Authentication failed. User not found." });
        }

        const passwordCheck = await bcrypt.compare(password, user.passwordHash);

        if (!passwordCheck) {
            return res.status(401).json({ message: "Authentication failed. Incorrect Password." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: "24h" });
        res.json({ token, userId: user.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: `Unable to perform login: ${error.message}`,});
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
        login,
    };