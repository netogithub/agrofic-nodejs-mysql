const express = require('express');
const PlantacionesController = require('../../controllers/catalogos/plantaciones.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/plantaciones', md_auth.ensureAuth, PlantacionesController.listPlantaciones);
router.post('/plantaciones', md_auth.ensureAuth, PlantacionesController.createPlantaciones);
router.get('/plantaciones/:id_plantacion', md_auth.ensureAuth, PlantacionesController.readPlantaciones);
router.put('/plantaciones/:id_plantacion', md_auth.ensureAuth, PlantacionesController.updatePlantaciones);
router.delete('/plantaciones/:id_plantacion', md_auth.ensureAuth, PlantacionesController.deletePlantaciones);

module.exports = router;