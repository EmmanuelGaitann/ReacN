// routes/salaireRoutes.js
const express = require('express');
const router = express.Router();
const salaireController = require('../controllers/salaireController');

// Endpoint pour obtenir tous les salaires
router.get('/', salaireController.getAllSalaires);

// Endpoint pour créer un nouveau salaire
router.post('/', salaireController.createSalaire);

// Endpoint pour obtenir un salaire par ID
router.get('/:id', salaireController.getSalaireById);

// Endpoint pour mettre à jour un salaire
router.put('/:id', salaireController.updateSalaire);

// Endpoint pour supprimer un salaire
router.delete('/:id', salaireController.deleteSalaire);

// Endpoint pour initialiser les salaires chaque mois
router.post('/init', salaireController.initSalaires);

module.exports = router;