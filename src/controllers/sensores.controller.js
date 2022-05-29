const mysqlConnection = require('../database.js');

function listSensores(req, res) {
    mysqlConnection.query('call sp_viewSensores(0);', (err, rows, fields) => {
        if(!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createSensores(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, marca, modelo } = req.body;
    if (!descripcion || !marca || !modelo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSensores(?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, descripcion, marca, modelo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readSensores(req, res) {
    const { id_sensor } = req.params;
    if (!id_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewSensores(?);', [id_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateSensores(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sensor } = req.params;
    const { descripcion, marca, modelo } = req.body;
    if (!id_sensor || !descripcion || !marca || !modelo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSensores(?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_sensor, descripcion, marca, modelo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteSensores(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sensor } = req.params;
    if (!id_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeSensores(?);', [id_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    listSensores,
    createSensores,
    readSensores,
    updateSensores,
    deleteSensores
}