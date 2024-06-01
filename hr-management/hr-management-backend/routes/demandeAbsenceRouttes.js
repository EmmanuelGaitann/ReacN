// routes/demandeAbsenceRoutes.js
const express = require('express');
const router = express.Router();
const demandeAbsenceController = require('../controllers/demandeAbsenceController');

// Endpoint pour obtenir toutes les demandes d'absence
router.get('/', demandeAbsenceController.getAllDemandesAbsence);

// Endpoint pour créer une nouvelle demande d'absence
router.post('/', demandeAbsenceController.createDemandeAbsence);

// Endpoint pour obtenir une demande d'absence par ID
router.get('/:id', demandeAbsenceController.getDemandeAbsenceById);

// Endpoint pour mettre à jour une demande d'absence
router.put('/:id', demandeAbsenceController.updateDemandeAbsence);

// Endpoint pour supprimer une demande d'absence
router.delete('/:id', demandeAbsenceController.deleteDemandeAbsence);

// Endpoint pour approuver une demande d'absence
router.put('/:id/approve', demandeAbsenceController.approveDemandeAbsence);

// Endpoint pour rejeter une demande d'absence
router.put('/:id/reject', demandeAbsenceController.rejectDemandeAbsence);

module.exports = router;