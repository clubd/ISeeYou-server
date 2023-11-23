const router = require("express").Router();
const userController = require("../controllers/users-controller")

router.route("/").get(userController.index).post(userController.create);
router.route("/:id").get(userController.findOne).patch(userController.update);
router.route("/:id/tasks").get(userController.tasks);

module.exports = router;