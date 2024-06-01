// controllers/typeAbsenceController.js
const db = require("../config/db");

exports.getAllTypesAbsence = (req, res) => {
  db.query("SELECT * FROM Types_Absences", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.createTypeAbsence = (req, res) => {
  const { nom, description } = req.body;

  db.query(
    "INSERT INTO Types_Absences (nom, description) VALUES (?, ?)",
    [nom, description],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ id: result.insertId, nom, description });
    }
  );
};

exports.getTypeAbsenceById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Types_Absences WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Type d'absence non trouvé" });
    }
    res.json(result[0]);
  });
};

exports.updateTypeAbsence = (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;

  db.query(
    "UPDATE Types_Absences SET nom = ?, description = ? WHERE id = ?",
    [nom, description, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Type d'absence mis à jour" });
    }
  );
};

exports.deleteTypeAbsence = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Types_Absences WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Type d'absence supprimé" });
  });
};
