const db = require("../database");

exports.getAllProjects = (req, res) => {
  const query = `SELECT * FROM projects`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
};

exports.getProjectById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM projects WHERE id = ?`;
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(row);
  });
};

exports.createProject = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const query = `INSERT INTO projects (title, description, created_by) VALUES (?, ?, ?)`;
  db.run(query, [title, description, req.user.id], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res
      .status(201)
      .json({ id: this.id, title, description, created_by: req.user.id });
  });
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const query = `UPDATE projects SET title = COALESCE(?, title), description = COALESCE(?, description) WHERE id = ?`;
  db.run(query, [title, description, id], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project updated successfully" });
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM projects WHERE id = ?`;
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  });
};
