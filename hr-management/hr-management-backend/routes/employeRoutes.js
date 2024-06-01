const express = require("express");
const router = express.Router();
const employeController = require("../controllers/employeController");

// Endpoint pour obtenir tous les employés
router.get("/", employeController.getAllEmployes);

// Endpoint pour créer un nouvel employé
router.post("/", employeController.createEmploye);

// Endpoint pour obtenir un employé par ID
router.get("/:id", employeController.getEmployeById);

// Endpoint pour mettre à jour un employé
router.put("/:id", employeController.updateEmploye);

// Endpoint pour supprimer un employé
router.delete("/:id", employeController.deleteEmploye);

module.exports = router;
