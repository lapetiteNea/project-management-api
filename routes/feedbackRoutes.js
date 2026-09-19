const express = require("express");
const router = express.Router({ mergeParams: true });
const feedbackController = require("../controllers/feedbackController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", authenticateToken, feedbackController.addFeedback);
router.get("/", authenticateToken, feedbackController.getProjectFeedbacks);

module.exports = router;
