const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

router.get("/", authenticateToken, projectController.getAllProjects);
router.get("/:id", authenticateToken, projectController.getProjectById);
router.post(
  "/",
  authenticateToken,
  authorizeAdmin,
  projectController.createProject,
);
router.put(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  projectController.updateProject,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  projectController.deleteProject,
);

module.exports = router;
