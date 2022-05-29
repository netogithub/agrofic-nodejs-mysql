const express = require('express');
const GenerosController = require('../../controllers/catalogos/generos.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/generos', md_auth.ensureAuth, GenerosController.listGeneros);
router.post('/generos', md_auth.ensureAuth, GenerosController.createGeneros);
router.get('/generos/:id_genero', md_auth.ensureAuth, GenerosController.readGeneros);
router.put('/generos/:id_genero', md_auth.ensureAuth, GenerosController.updateGeneros);
router.delete('/generos/:id_genero', md_auth.ensureAuth, GenerosController.deleteGeneros);

module.exports = router;