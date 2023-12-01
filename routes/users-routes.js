const router = require("express").Router();
const userController = require("../controllers/users-controller");
const authorize = require("../middleware/authorize");

router.route("/").get(authorize, userController.index);
router.route("/:id").get(authorize, userController.findOne).patch(authorize, userController.update).delete(authorize, userController.remove);
router.route("/:id/tasks/").get(authorize, userController.tasks).post(authorize, userController.createTask);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;