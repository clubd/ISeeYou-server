const router = require("express").Router();
const assignController = require("../controllers/assigns-controller")

router.route("/").get(assignController.index);
router.route("/:id").get(assignController.findOne);
router.route("/add").post(assignController.add);
router.route("/remove").delete(assignController.remove);

module.exports = router;