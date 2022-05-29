const mysqlConnection = require('../../database.js');

function listGeneros(req, res) {
    mysqlConnection.query('call sp_viewGeneros(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createGeneros(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, nombre_cientifico } = req.body;
    if (!descripcion || !nombre_cientifico) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addGeneros(?, ?, ?);`;
    mysqlConnection.query(query, [0, descripcion, nombre_cientifico], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readGeneros(req, res) {
    const { id_genero } = req.params;
    if (!id_genero) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewGeneros(?);', [id_genero], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateGeneros(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_genero } = req.params;
    const { descripcion, nombre_cientifico } = req.body;
    if (!id_genero || !descripcion || !nombre_cientifico) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addGeneros(?, ?, ?);`;
    mysqlConnection.query(query, [id_genero, descripcion, nombre_cientifico], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteGeneros(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }                     
    const { id_genero } = req.params;
    if (!id_genero) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeGeneros(?);', [id_genero], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    listGeneros,
    createGeneros,
    readGeneros,
    updateGeneros,
    deleteGeneros
}