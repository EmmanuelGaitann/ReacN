// routes/typeAbsenceRoutes.js
const express = require('express');
const router = express.Router();
const typeAbsenceController = require('../controllers/typeAbsenceController');

// Endpoint pour obtenir tous les types d'absence
router.get('/', typeAbsenceController.getAllTypesAbsence);

// Endpoint pour créer un nouveau type d'absence
router.post('/', typeAbsenceController.createTypeAbsence);

// Endpoint pour obtenir un type d'absence par ID
router.get('/:id', typeAbsenceController.getTypeAbsenceById);

// Endpoint pour mettre à jour un type d'absence
router.put('/:id', typeAbsenceController.updateTypeAbsence);

// Endpoint pour supprimer un type d'absence
router.delete('/:id', typeAbsenceController.deleteTypeAbsence);

module.exports = router;