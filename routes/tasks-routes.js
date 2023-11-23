const router = require("express").Router();
const taskController = require("../controllers/tasks-controller");

router.route("/").get(taskController.index);

module.exports = router;