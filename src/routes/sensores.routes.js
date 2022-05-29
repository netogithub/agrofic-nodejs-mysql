const express = require('express');
const SensoresController = require('../controllers/sensores.controller');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.get('/sensores', md_auth.ensureAuth, SensoresController.listSensores);
router.post('/sensores', md_auth.ensureAuth, SensoresController.createSensores);
router.get('/sensores/:id_sensor', md_auth.ensureAuth, SensoresController.readSensores);
router.put('/sensores/:id_sensor', md_auth.ensureAuth, SensoresController.updateSensores);
router.delete('/sensores/:id_sensor', md_auth.ensureAuth, SensoresController.deleteSensores);

module.exports = router;