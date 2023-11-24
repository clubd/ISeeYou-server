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

const findOne = async (req, res) => {
    try {
        const assignsFound = await knex("assigns").where({ id: req.params.id });

        if (assignsFound.length === 0) {
            return res.status(404).json({
                message: `Assign with ID ${req.params.id} not found`
            });
        }

        const assignData = assignsFound[0];
        res.json(assignData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve assign data for assign with ID ${req.params.id}`,
        });
    }
};

const add = async (req, res) => {
    const userId = req.query.userId;
    const taskId = req.query.taskId;

    try {
        const existingAssign = await knex("assigns").where({ users_id: userId, tasks_id: taskId });

        if (existingAssign.length > 0) {
            return res.status(400).json({
                message: "Assignment already exists for this user and task.",
            });
        }

        const result = await knex("assigns").insert({ users_id: userId, tasks_id: taskId });
        const newAssignId = result[0];

        res.status(201).json({ id: newAssignId, users_id: userId, tasks_id: taskId });
    } catch (error) {
        res.status(500).json({
            message: `Unable to create assignment: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    const userId = req.query.userId;
    const taskId = req.query.taskId;

    try {
        const rowsDeleted = await knex("assigns").where({ users_id: userId, tasks_id: taskId }).delete();

        if (rowsDeleted === 0) {
            return res.status(404).json({
                message: "Assignment not found for this user and task.",
            });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to remove assignment: ${error}`,
        });
    }
};

module.exports = {
    index,
    findOne,
    add,
    remove
}