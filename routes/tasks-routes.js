const router = require("express").Router();
const taskController = require("../controllers/tasks-controller");

router.route("/").get(taskController.index);
router.route("/:id").get(taskController.findOne);
router.route("/users/:id/tasks").post(taskController.create);

module.exports = router;