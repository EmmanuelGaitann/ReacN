// controllers/demandeAbsenceController.js
const db = require("../config/db");

exports.getAllDemandesAbsence = (req, res) => {
  db.query("SELECT * FROM Demandes_Absence", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.createDemandeAbsence = (req, res) => {
  const {
    employe_id,
    date_debut,
    date_fin,
    type_absence_id,
    commentaire,
    status,
  } = req.body;

  db.query(
    "INSERT INTO Demandes_Absence (employe_id, date_debut, date_fin, type_absence_id, commentaire, status) VALUES (?, ?, ?, ?, ?, ?)",
    [employe_id, date_debut, date_fin, type_absence_id, commentaire, status],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res
        .status(201)
        .json({
          id: result.insertId,
          employe_id,
          date_debut,
          date_fin,
          type_absence_id,
          commentaire,
          status,
        });
    }
  );
};

exports.getDemandeAbsenceById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM Demandes_Absence WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "Demande d'absence non trouvée" });
      }
      res.json(result[0]);
    }
  );
};

exports.updateDemandeAbsence = (req, res) => {
  const { id } = req.params;
  const {
    employe_id,
    date_debut,
    date_fin,
    type_absence_id,
    commentaire,
    status,
  } = req.body;

  db.query(
    "UPDATE Demandes_Absence SET employe_id = ?, date_debut = ?, date_fin = ?, type_absence_id = ?, commentaire = ?, status = ? WHERE id = ?",
    [
      employe_id,
      date_debut,
      date_fin,
      type_absence_id,
      commentaire,
      status,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Demande d'absence mise à jour" });
    }
  );
};

exports.deleteDemandeAbsence = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Demandes_Absence WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Demande d'absence supprimée" });
  });
};

exports.approveDemandeAbsence = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE Demandes_Absence SET status = ? WHERE id = ?",
    ["approuvée", id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Demande d'absence approuvée" });
    }
  );
};

exports.rejectDemandeAbsence = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE Demandes_Absence SET status = ? WHERE id = ?",
    ["rejetée", id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Demande d'absence rejetée" });
    }
  );
};
