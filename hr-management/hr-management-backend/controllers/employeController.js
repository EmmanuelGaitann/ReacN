// controllers/employeController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getAllEmployes = (req, res) => {
  db.query("SELECT * FROM Employes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
};

exports.createEmploye = (req, res) => {
  const { nom, prenom, email, role, mot_de_passe, salaire_mensuel } = req.body;
  const hashedPassword = bcrypt.hashSync(mot_de_passe, 8);

  db.query(
    "INSERT INTO Employes (nom, prenom, email, role, mot_de_passe, salaire_mensuel, salaire_net) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      nom,
      prenom,
      email,
      role,
      hashedPassword,
      salaire_mensuel,
      salaire_mensuel,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res
        .status(201)
        .json({
          id: result.insertId,
          nom,
          prenom,
          email,
          role,
          salaire_mensuel,
          salaire_net: salaire_mensuel,
        });
    }
  );
};

exports.getEmployeById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM Employes WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    res.json(result[0]);
  });
};

exports.updateEmploye = (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, role, mot_de_passe, salaire_mensuel } = req.body;
  const hashedPassword = bcrypt.hashSync(mot_de_passe, 8);

  db.query(
    "UPDATE Employes SET nom = ?, prenom = ?, email = ?, role = ?, mot_de_passe = ?, salaire_mensuel = ?, salaire_net = ? WHERE id = ?",
    [
      nom,
      prenom,
      email,
      role,
      hashedPassword,
      salaire_mensuel,
      salaire_mensuel,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: "Employé mis à jour" });
    }
  );
};

exports.deleteEmploye = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Employes WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Employé supprimé" });
  });
};
