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

module.exports = {
    index,
    add
}