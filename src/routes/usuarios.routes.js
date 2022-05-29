const express = require('express');
const UsuariosController = require('../controllers/usuarios.controller');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

//router.post('/hash', UsuariosController.testHash);
router.post('/login', UsuariosController.loginUsuarios);
router.get('/usuarios', md_auth.ensureAuth, UsuariosController.listUsuarios);
router.post('/usuarios', md_auth.ensureAuth, UsuariosController.createUsuarios);
router.get('/usuarios/:id_usuario', md_auth.ensureAuth, UsuariosController.readUsuarios);
router.put('/usuarios/:id_usuario', md_auth.ensureAuth, UsuariosController.updateUsuarios);
router.delete('/usuarios/:id_usuario', md_auth.ensureAuth, UsuariosController.deleteUsuarios);

module.exports = router;