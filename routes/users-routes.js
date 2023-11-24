const router = require("express").Router();
const userController = require("../controllers/users-controller")

router.route("/").get(userController.index);
router.route("/:id").get(userController.findOne).patch(userController.update).delete(userController.remove);
router.route("/:id/tasks").get(userController.tasks).post(userController.createTask);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;