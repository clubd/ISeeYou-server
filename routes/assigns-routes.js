const router = require("express").Router();
const assignController = require("../controllers/assigns-controller")

router.route("/").get(assignController.index);
router.route("/add").post(assignController.add);

module.exports = router;