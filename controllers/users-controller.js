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
        const usersFound = await knex("users")
            .where({ id: req.params.id });

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
        const tasks = await knex("users")
            .join("tasks", "tasks.users_id", "users.id")
            .where({ users_id: req.params.id });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve tasks for user with ID ${req.params.id}: ${error}`,
        });
    }
};

const createUser = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.password) {
        return res.status(400).json({
            message: "Please provide all required information for the user request",
        });
    }

    console.log('look here: ', req.body);

    try {
        const result = await knex("users").insert(req.body);
        console.log(result)
        const newUsersId = result[0];
        const createdUser = await knex("users").where({ id: newUsersId });

        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new user: ${error}`,
        });
    }
};

module.exports = {
    index,
    findOne,
    tasks,
    createUser,
};