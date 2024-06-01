// controllers/absenceController.js
const db = require("../config/db");
const notificationService = require('../services/notificationService');

// Les autres méthodes...

exports.createAbsence = (req, res) => {
  const { employe_id, date, type_absence_id, commentaire } = req.body;

  db.query('INSERT INTO Absences (employe_id, date, type_absence_id, commentaire) VALUES (?, ?, ?, ?)', 
  [employe_id, date, type_absence_id, commentaire], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    // Vérification du nombre d'absences de l'employé
    db.query('SELECT COUNT(*) as absenceCount FROM Absences WHERE employe_id = ?', [employe_id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      const absenceCount = results[0].absenceCount;
      if (absenceCount >= 10) { // seuil d'alerte, peut être ajusté selon vos besoins
        // Récupération de l'email de l'employé
        db.query('SELECT email FROM Employes WHERE id = ?', [employe_id], (err, results) => {
          if (err) {
            return res.status(500).json({ error: err });
          }

          const email = results[0].email;
          const subject = 'Alerte d\'absences';
          const text = `Vous avez atteint ${absenceCount} jours d'absence. Veuillez contacter le service RH.`;

          // Envoi de la notification
          notificationService.sendNotification(email, subject, text);
        });
      }

      res.status(201).json({ id: result.insertId, employe_id, date, type_absence_id, commentaire });
    });
  });
};



exports.getAllAbsences = (req, res) => {
  db.query("SELECT * FROM Absences", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.createAbsence = (req, res) => {
  const { employe_id, date, type_absence_id, commentaire } = req.body;

  db.query(
    "INSERT INTO Absences (employe_id, date, type_absence_id, commentaire) VALUES (?, ?, ?, ?)",
    [employe_id, date, type_absence_id, commentaire],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res
        .status(201)
        .json({
          id: result.insertId,
          employe_id,
          date,
          type_absence_id,
          commentaire,
        });
    }
  );
};

exports.getAbsenceById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Absences WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Absence non trouvée" });
    }
    res.json(result[0]);
  });
};

exports.updateAbsence = (req, res) => {
  const { id } = req.params;
  const { employe_id, date, type_absence_id, commentaire } = req.body;

  db.query(
    "UPDATE Absences SET employe_id = ?, date = ?, type_absence_id = ?, commentaire = ? WHERE id = ?",
    [employe_id, date, type_absence_id, commentaire, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Absence mise à jour" });
    }
  );
};

exports.deleteAbsence = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Absences WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Absence supprimée" });
  });
};
