const mysqlConnection = require('../database.js');

function installSitios(req, res) {
    const { estatus, clave, descripcion, latitud, longitud, id_cultivo, id_suelo, id_riego, id_plantacion } = req.body;
    const query = `call sp_addSitios(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, estatus, clave, descripcion, latitud, longitud, id_cultivo, id_suelo, id_riego, id_plantacion], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function gpsSitios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio } = req.params;
    const { latitud, longitud } = req.body;
    if (!id_sitio || !latitud || !longitud) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = 'call sp_gpsSitios(?, ?, ?);';
    mysqlConnection.query(query, [id_sitio, latitud, longitud], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function listSitios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    mysqlConnection.query('call sp_viewSitios(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createSitios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { clave, descripcion, id_cultivo, id_suelo, id_riego, id_plantacion } = req.body;
    if (!clave || !descripcion || !!id_cultivo || !id_suelo || !id_riego || !id_plantacion) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSitios(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, 1, clave, descripcion, 0.0, 0.0, id_cultivo, id_suelo, id_riego, id_plantacion], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readSitios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio } = req.params;
    if (!id_sitio) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewSitios(?);', [id_sitio], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateSitios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio } = req.params;
    const { estatus, clave, descripcion, latitud, longitud, id_cultivo, id_suelo, id_riego, id_plantacion } = req.body;
    if (!id_sitio || !clave || !descripcion || !!id_cultivo || !id_suelo || !id_riego || !id_plantacion) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSitios(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_sitio, 1, clave, descripcion, 0, 0, id_cultivo, id_suelo, id_riego, id_plantacion], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteSitios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio } = req.params;
    if (!id_sitio) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeSitios(?);', [id_sitio], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    gpsSitios,
    listSitios,
    createSitios,
    readSitios,
    updateSitios,
    deleteSitios
}