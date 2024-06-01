// controllers/salaireController.js
const db = require("../config/db");

exports.getAllSalaires = (req, res) => {
  db.query("SELECT * FROM Salaires", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.createSalaire = (req, res) => {
  const { employe_id, montant, date } = req.body;

  db.query(
    "INSERT INTO Salaires (employe_id, montant, date) VALUES (?, ?, ?)",
    [employe_id, montant, date],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.status(201).json({ id: result.insertId, employe_id, montant, date });
    }
  );
};

exports.getSalaireById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Salaires WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Salaire non trouvé" });
    }
    res.json(result[0]);
  });
};

exports.updateSalaire = (req, res) => {
  const { id } = req.params;
  const { employe_id, montant, date } = req.body;

  db.query(
    "UPDATE Salaires SET employe_id = ?, montant = ?, date = ? WHERE id = ?",
    [employe_id, montant, date, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Salaire mis à jour" });
    }
  );
};

exports.deleteSalaire = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Salaires WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Salaire supprimé" });
  });
};

exports.initSalaires = (req, res) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  db.query("SELECT id, montant FROM Employes", (err, employes) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    const salaires = employes.map((employe) => [
      employe.id,
      employe.montant,
      firstDayOfMonth,
    ]);

    db.query(
      "INSERT INTO Salaires (employe_id, montant, date) VALUES ?",
      [salaires],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        res.json({ message: "Salaires initialisés pour le mois en cours" });
      }
    );
  });
};
