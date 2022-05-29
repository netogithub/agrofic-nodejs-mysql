const express = require('express');
const SuelosController = require('../../controllers/catalogos/suelos.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/suelos', md_auth.ensureAuth, SuelosController.listSuelos);
router.post('/suelos', md_auth.ensureAuth, SuelosController.createSuelos);
router.get('/suelos/:id_suelo', md_auth.ensureAuth, SuelosController.readSuelos);
router.put('/suelos/:id_suelo', md_auth.ensureAuth, SuelosController.updateSuelos);
router.delete('/suelos/:id_suelo', md_auth.ensureAuth, SuelosController.deleteSuelos);

module.exports = router;