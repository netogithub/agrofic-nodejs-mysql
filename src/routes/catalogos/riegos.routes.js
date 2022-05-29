const express = require('express');
const RiegosController = require('../../controllers/catalogos/riegos.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/riegos', md_auth.ensureAuth, RiegosController.listRiegos);
router.post('/riegos', md_auth.ensureAuth, RiegosController.createRiegos);
router.get('/riegos/:id_riego', md_auth.ensureAuth, RiegosController.readRiegos);
router.put('/riegos/:id_riego', md_auth.ensureAuth, RiegosController.updateRiegos);
router.delete('/riegos/:id_riego', md_auth.ensureAuth, RiegosController.deleteRiegos);

module.exports = router;