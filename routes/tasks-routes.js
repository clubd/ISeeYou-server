const router = require("express").Router();
const taskController = require("../controllers/tasks-controller");

router.route("/").get(taskController.index);
router.route("/:id").get(taskController.findOne).patch(taskController.update).delete(taskController.remove);

module.exports = router;