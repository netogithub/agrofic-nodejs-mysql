const mysqlConnection = require('../database.js');

function searchMonitoreo(req, res) {
    const { id_nodo_sensor, fecha } = req.body;
    if (!id_nodo_sensor || !fecha) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = 'call sp_listMonitoreo(?, ?);';
    mysqlConnection.query(query, [id_nodo_sensor, fecha], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function listMonitoreo(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    mysqlConnection.query('call sp_viewMonitoreo(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createMonitoreo(req, res) {
    const { temp_ambiente, hum_relativa, temp_suelo, profundidad, resistencia, tension, fecha, hora, id_sitio, id_nodo_sensor } = req.body;
    if (!temp_ambiente, hum_relativa, temp_suelo, profundidad, resistencia, tension, fecha, hora, id_sitio, id_nodo_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addMonitoreo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, temp_ambiente, hum_relativa, temp_suelo, profundidad, resistencia, tension, fecha, hora, id_sitio, id_nodo_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readMonitoreo(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_monitoreo } = req.params;
    if (!id_monitoreo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewMonitoreo(?);', [id_monitoreo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateMonitoreo(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_monitoreo } = req.params;
    const { temp_ambiente, hum_relativa, temp_suelo, profundidad, resistencia, tension, fecha, hora, id_sitio, id_nodo_sensor } = req.body;
    if (!id_monitoreo || !temp_ambiente || !hum_relativa || !temp_suelo || !profundidad || !resistencia || !tension || !fecha || !hora || !id_sitio || !id_nodo_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addMonitoreo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_monitoreo, temp_ambiente, hum_relativa, temp_suelo, profundidad, resistencia, tension, fecha, hora, id_sitio, id_nodo_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteMonitoreo(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_monitoreo } = req.params;
    if (!id_monitoreo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeMonitoreo(?);', [id_monitoreo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    searchMonitoreo,
    listMonitoreo,
    createMonitoreo,
    readMonitoreo,
    updateMonitoreo,
    deleteMonitoreo
}