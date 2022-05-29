const express = require('express');
const EspeciesController = require('../../controllers/catalogos/especies.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/especies', md_auth.ensureAuth, EspeciesController.listEspecies);
router.post('/especies', md_auth.ensureAuth, EspeciesController.createEspecies);
router.get('/especies/:id_especie', md_auth.ensureAuth, EspeciesController.readEspecies);
router.put('/especies/:id_especie', md_auth.ensureAuth, EspeciesController.updateEspecies);
router.delete('/especies/:id_especie', md_auth.ensureAuth, EspeciesController.deleteEspecies);

module.exports = router;