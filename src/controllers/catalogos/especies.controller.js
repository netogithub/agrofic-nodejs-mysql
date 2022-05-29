const mysqlConnection = require('../../database.js');

function listEspecies(req, res) {
    mysqlConnection.query('call sp_viewEspecies(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createEspecies(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, nombre_cientifico, id_genero } = req.body;
    if (!descripcion || !nombre_cientifico || !id_genero) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addEspecies(?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, descripcion, nombre_cientifico, id_genero], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readEspecies(req, res) {
    const { id_especie } = req.params;
    if (!id_especie) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewEspecies(?);', [id_especie], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateEspecies(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_especie } = req.params;
    const { descripcion, nombre_cientifico, id_genero } = req.body;
    if (!id_especie || !descripcion  || !nombre_cientifico || !id_genero) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addEspecies(?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_especie, descripcion, nombre_cientifico, id_genero], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteEspecies(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_especie } = req.params;
    if (!id_especie) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeEspecies(?);', [id_especie], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    listEspecies,
    createEspecies,
    readEspecies,
    updateEspecies,
    deleteEspecies
}