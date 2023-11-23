const router = require("express").Router();
const assignController = require("../controllers/assigns-controller")

router.route("/").get(assignController.index);

module.exports = router;