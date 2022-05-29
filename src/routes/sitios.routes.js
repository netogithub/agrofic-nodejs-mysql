const express = require('express');
const SitiosController = require('../controllers/sitios.controller');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.post('/sitio-gps/:id_sitio', md_auth.ensureAuth, SitiosController.gpsSitios);
router.get('/sitios', md_auth.ensureAuth, SitiosController.listSitios);
router.post('/sitios', md_auth.ensureAuth, SitiosController.createSitios);
router.get('/sitios/:id_sitio', md_auth.ensureAuth, SitiosController.readSitios);
router.put('/sitios/:id_sitio', md_auth.ensureAuth, SitiosController.updateSitios);
router.delete('/sitios/:id_sitio', md_auth.ensureAuth, SitiosController.deleteSitios);

module.exports = router;