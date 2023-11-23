const router = require("express").Router();
const userController = require("../controllers/users-controller")

router.route("/").get(userController.index).post(userController.createUser);
router.route("/:id").get(userController.findOne);
router.route("/:id/tasks").get(userController.tasks);

module.exports = router;