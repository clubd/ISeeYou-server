const router = require("express").Router();
const taskController = require("../controllers/tasks-controller");

router.route("/").get(taskController.index);
router.route("/:id").get(taskController.findOne);

module.exports = router;