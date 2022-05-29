const mysqlConnection = require('../../database.js');

function searchSitioUsuario(req, res) {
    const { id_usuario } = req.params;
    if (!id_usuario) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_listSitio_Usuario(?);`;
    mysqlConnection.query(query, [id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function listSitioUsuario(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    mysqlConnection.query('call sp_viewSitio_Usuario(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createSitioUsuario(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio, id_usuario } = req.body;
    if (!id_sitio || !id_usuario) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSitio_Usuario(?, ?, ?);`;
    mysqlConnection.query(query, [0, id_sitio, id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readSitioUsuario(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio_usuario } = req.params;
    if (!id_sitio_usuario) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewSitio_Usuario(?);', [id_sitio_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateSitioUsuario(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio_usuario } = req.params;
    const { id_sitio, id_usuario } = req.body;
    if (!id_sitio_usuario) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addSitio_Usuario(?, ?, ?);`;
    mysqlConnection.query(query, [id_sitio_usuario, id_sitio, id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteSitioUsuario(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_sitio_usuario } = req.params;
    if (!id_sitio_usuario) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeSitio_Usuario(?);', [id_sitio_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    searchSitioUsuario,
    listSitioUsuario,
    createSitioUsuario,
    readSitioUsuario,
    updateSitioUsuario,
    deleteSitioUsuario
}