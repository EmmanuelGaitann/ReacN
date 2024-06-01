const express = require("express");
const router = express.Router();
const absenceController = "../controllers/absenceController";

router.get("/", absenceController.getAllAbsences);
router.post("/", absenceController.creeateAbsence);
router.get("/:id", absenceController.getAllAbsencesById);
router.put("/:id", absenceController.updateAbsence);
router.delete("/:id", absenceController.deleteAbsence);

module.export = router;
