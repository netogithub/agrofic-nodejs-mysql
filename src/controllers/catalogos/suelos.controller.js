const mysqlConnection = require('../../database.js');

function listSuelos(req, res) {
    mysqlConnection.query('call sp_viewSuelos(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createSuelos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, capacidad_campo, punto_marchites, agua_disponible } = req.body;
    if (!descripcion || !capacidad_campo || !punto_marchites || !agua_disponible) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSuelos(?, ?);`;
    mysqlConnection.query(query, [0, descripcion, capacidad_campo, punto_marchites, agua_disponible], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readSuelos(req, res) {
    const { id_suelo } = req.params;
    if (!id_suelo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewSuelos(?);', [id_suelo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateSuelos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_suelo } = req.params;
    const { descripcion, capacidad_campo, punto_marchites, agua_disponible } = req.body;
    if (!id_suelo || !descripcion || !capacidad_campo || !punto_marchites || !agua_disponible) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSuelos(?, ?);`;
    mysqlConnection.query(query, [id_suelo, descripcion, capacidad_campo, punto_marchites, agua_disponible], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteSuelos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_suelo } = req.params;
    if (!id_suelo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeSuelos(?);', [id_suelo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    listSuelos,
    createSuelos,
    readSuelos,
    updateSuelos,
    deleteSuelos
}