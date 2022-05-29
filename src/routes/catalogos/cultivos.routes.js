const express = require('express');
const CultivosController = require('../../controllers/catalogos/cultivos.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/cultivos', md_auth.ensureAuth, CultivosController.listCultivos);
router.post('/cultivos', md_auth.ensureAuth, CultivosController.createCultivos);
router.get('/cultivos/:id_cultivo', md_auth.ensureAuth, CultivosController.readCultivos);
router.put('/cultivos/:id_cultivo', md_auth.ensureAuth, CultivosController.updateCultivos);
router.delete('/cultivos/:id_cultivo', md_auth.ensureAuth, CultivosController.deleteCultivos);

module.exports = router;