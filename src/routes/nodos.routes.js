const express = require('express');
const NodosController = require('../controllers/nodos.controller');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.post('/nodos-gps/:id_nodo', md_auth.ensureAuth, NodosController.gpsNodos);
router.get('/nodos-search/:id_sitio', md_auth.ensureAuth, NodosController.searchNodos);
router.get('/nodos', md_auth.ensureAuth, NodosController.listNodos);
router.post('/nodos', md_auth.ensureAuth, NodosController.createNodos);
router.get('/nodos/:id_nodo', md_auth.ensureAuth, NodosController.readNodos);
router.put('/nodos/:id_nodo', md_auth.ensureAuth, NodosController.updateNodos);
router.delete('/nodos/:id_nodo', md_auth.ensureAuth, NodosController.deleteNodos);

module.exports = router;