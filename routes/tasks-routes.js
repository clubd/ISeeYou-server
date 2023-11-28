const router = require("express").Router();
const taskController = require("../controllers/tasks-controller");
const authorize = require("../middleware/authorize");

router.route("/").get(authorize, taskController.index);
router.route("/:id").get(authorize, taskController.findOne).patch(authorize, taskController.update).delete(authorize, taskController.remove);

module.exports = router;