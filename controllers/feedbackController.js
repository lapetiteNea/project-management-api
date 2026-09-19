const db = require("../database");

exports.addFeedback = (req, res) => {
  const { projectId } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment is required" });
  }

  // Check if project exists
  db.get(`SELECT * FROM projects WHERE id = ?`, [projectId], (err, project) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const query = `INSERT INTO feedbacks (project_id, user_id, comment) VALUES (?, ?, ?)`;
    db.run(query, [projectId, req.user.id, comment], function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({
        id: this.id,
        project_id: projectId,
        user_id: req.user.id,
        comment,
      });
    });
  });
};

exports.getProjectFeedbacks = (req, res) => {
  const { projectId } = req.params;

  const query = `
    SELECT f.id, f.comment, f.created_at, u.username 
    FROM feedbacks f
    JOIN users u ON f.user_id = u.id
    WHERE f.project_id = ?
    ORDER BY f.created_at DESC
  `;

  db.all(query, [projectId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
};
