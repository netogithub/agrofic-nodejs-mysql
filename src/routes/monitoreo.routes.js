const express = require('express');
const MonitoreoController = require('../controllers/monitoreo.controller');

const router = express.Router();
const md_auth = require('../middlewares/authenticated');

router.post('/monitoreo-fecha', md_auth.ensureAuth, MonitoreoController.searchMonitoreo);
router.get('/monitoreo', md_auth.ensureAuth, MonitoreoController.listMonitoreo);
router.post('/monitoreo', md_auth.ensureAuth, MonitoreoController.createMonitoreo);
router.get('/monitoreo/:id_monitoreo', md_auth.ensureAuth, MonitoreoController.readMonitoreo);
router.put('/monitoreo/:id_monitoreo', md_auth.ensureAuth, MonitoreoController.updateMonitoreo);
router.delete('/monitoreo/:id_monitoreo', md_auth.ensureAuth, MonitoreoController.deleteMonitoreo);

module.exports = router;