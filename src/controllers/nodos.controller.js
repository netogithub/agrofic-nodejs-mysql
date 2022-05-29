const mysqlConnection = require('../database.js');

function gpsNodos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_nodo } = req.params;
    const { latitud, longitud } = req.body;
    if (!id_nodo || !latitud || !longitud) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = 'call sp_gpsNodos(?, ?, ?);';
    mysqlConnection.query(query, [id_nodo, latitud, longitud], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function searchNodos(req, res) {
    const { id_sitio } = req.params;
    if (!id_sitio) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = 'call sp_listNodos(?);';
    mysqlConnection.query(query, [id_sitio], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function listNodos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    mysqlConnection.query('call sp_viewNodos(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createNodos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, latitud, longitud, id_sitio } = req.body;
    if (!descripcion ||! latitud || !longitud || !id_sitio) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addNodos(?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, descripcion, latitud, longitud, id_sitio], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readNodos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_nodo } = req.params;
    if (!id_nodo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewNodos(?);', [id_nodo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateNodos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_nodo } = req.params;
    const { descripcion, id_sitio } = req.body;
    if (!id_nodo || !descripcion || !id_sitio) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addNodos(?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_nodo, descripcion, 0.0, 0.0, id_sitio], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteNodos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_nodo } = req.params;
    if (!id_nodo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeNodos(?);', [id_nodo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    gpsNodos,
    searchNodos,
    listNodos,
    createNodos,
    readNodos,
    updateNodos,
    deleteNodos
}