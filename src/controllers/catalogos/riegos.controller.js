const mysqlConnection = require('../../database.js');

function listRiegos(req, res) {
    mysqlConnection.query('call sp_viewRiegos(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createRiegos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, consumo, hora_riego, eficiencia_min, eficiencia_max, diferencial_altura } = req.body;
    if (!descripcion || !consumo || !hora_riego || !eficiencia_min || !eficiencia_max || !diferencial_altura) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addRiegos(?, ?);`;
    mysqlConnection.query(query, [0, descripcion, consumo, hora_riego, eficiencia_min, eficiencia_max, diferencial_altura], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readRiegos(req, res) {
    const { id_riego } = req.params;
    if (!id_riego) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewRiegos(?);', [id_riego], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateRiegos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_riego } = req.params;
    const { descripcion, consumo, hora_riego, eficiencia_min, eficiencia_max, diferencial_altura } = req.body;
    if (!id_riego || !descripcion || !consumo || !hora_riego || !eficiencia_min || !eficiencia_max || !diferencial_altura) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addRiegos(?, ?);`;
    mysqlConnection.query(query, [id_riego, descripcion, consumo, hora_riego, eficiencia_min, eficiencia_max, diferencial_altura], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteRiegos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_riego } = req.params;
    if (!id_riego) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeRiegos(?);', [id_riego], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    listRiegos,
    createRiegos,
    readRiegos,
    updateRiegos,
    deleteRiegos
}