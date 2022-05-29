const express = require('express');
const SitioUsuarioController = require('../../controllers/relaciones/sitio_usuario.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/search-sitio-usuario/:id_usuario', md_auth.ensureAuth, SitioUsuarioController.searchSitioUsuario);
router.get('/sitio-usuario', md_auth.ensureAuth, SitioUsuarioController.listSitioUsuario);
router.post('/sitio-usuario', md_auth.ensureAuth, SitioUsuarioController.createSitioUsuario);
router.get('/sitio-usuario/:id_sitio_usuario', md_auth.ensureAuth, SitioUsuarioController.readSitioUsuario);
router.put('/sitio-usuario/:id_sitio_usuario', md_auth.ensureAuth, SitioUsuarioController.updateSitioUsuario);
router.delete('/sitio-usuario/:id_sitio_usuario', md_auth.ensureAuth, SitioUsuarioController.deleteSitioUsuario);

module.exports = router;