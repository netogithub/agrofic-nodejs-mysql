const express = require('express');
const NodoSensorController = require('../../controllers/relaciones/nodo_sensor.controller');

const router = express.Router();
const md_auth = require('../../middlewares/authenticated');

router.get('/search-nodo-sensor/:id_nodo', md_auth.ensureAuth, NodoSensorController.searchNodoSensor);
router.get('/nodo-sensor', md_auth.ensureAuth, NodoSensorController.listNodoSensor);
router.post('/nodo-sensor', md_auth.ensureAuth, NodoSensorController.createNodoSensor);
router.get('/nodo-sensor/:id_nodo_sensor', md_auth.ensureAuth, NodoSensorController.readNodoSensor);
router.put('/nodo-sensor/:id_nodo_sensor', md_auth.ensureAuth, NodoSensorController.updateNodoSensor);
router.delete('/nodo-sensor/:id_nodo_sensor', md_auth.ensureAuth, NodoSensorController.deleteNodoSensor);

module.exports = router;