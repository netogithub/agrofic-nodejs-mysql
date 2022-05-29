const mysqlConnection = require('../../database.js');

function searchNodoSensor(req, res) {
    const { id_nodo } = req.params;
    if (!id_nodo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_listNodo_Sensor(?);`;
    mysqlConnection.query(query, [id_nodo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function listNodoSensor(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    mysqlConnection.query('call sp_viewNodo_Sensor(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createNodoSensor(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, id_nodo, id_sensor } = req.body;
    if (!descripcion || !id_nodo || !id_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addNodo_Sensor(?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, descripcion, id_nodo, id_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readNodoSensor(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_nodo_sensor } = req.params;
    if (!id_nodo_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewNodo_Sensor(?);', [id_nodo_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateNodoSensor(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_nodo_sensor } = req.params;
    const { descripcion, id_nodo, id_sensor } = req.body;
    if (!id_nodo_sensor || !descripcion || !id_nodo || !id_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addNodo_Sensor(?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_nodo_sensor, descripcion, id_nodo, id_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteNodoSensor(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_nodo_sensor } = req.params;
    if (!id_nodo_sensor) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeNodo_Sensor(?);', [id_nodo_sensor], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    searchNodoSensor,
    listNodoSensor,
    createNodoSensor,
    readNodoSensor,
    updateNodoSensor,
    deleteNodoSensor
}