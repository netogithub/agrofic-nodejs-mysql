const mysqlConnection = require('../database.js');
var bcrypt = require('bcrypt-nodejs');
var md_auth = require('../middlewares/authenticated');

function testHash(req, res) {
    const { pass } = req.body;
    bcrypt.hash(pass, null, null, (err, hash) => {
        if (err) return res.status(500).send( {
            message: 'Error al encriptar la contraseña'
        })
        console.log(hash);
        res.status(200).send({
            message: hash
        })
    })
}

function loginUsuarios(req, res) {
    const { username, pass , gettoken} = req.body;
    if (!username || !pass) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_loginUsuarios(?);`;
    mysqlConnection.query(query, [username], (err, rows, fields) => {
        var user = rows[0][0];
        var passOrigin = user.pass;
        if(!err) {
            bcrypt.compare(pass, passOrigin, (err, check) => {
                if (check) {
                    // devolver datos de usuario
                    if (gettoken) {
                        // generar y devolver token
                        return res.status(200).send({
                            token: md_auth.createToken(user)
                        });
                    } else {
                        // devolver datos de usuario //
                        user.pass = "";
                        return res.status(200).send({
                            user
                        });
                    }
                } else {
                    return res.status(404).send({
                        message: 'El usuario no se ha podido identificar!!'
                    });
                }
            });
        } else {
            console.log(err);
        }
    });
}

function listUsuarios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    mysqlConnection.query('call sp_viewUsuarios(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createUsuarios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { tipo_usuario, username, pass, nombre, a_paterno, a_materno, descripcion, email, telefono } = req.body;
    if (!tipo_usuario || !username || !pass || !nombre || !a_paterno || !a_materno || !descripcion || !email || !telefono) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    let passhash;
    bcrypt.hash(pass, null, null, (err, hash) => {
        if (err) return res.status(500).send( {
            message: 'Error al encripar la contraseña'
        })
        passhash = hash;
    })
    const query = `call sp_addUsuarios(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, 1, tipo_usuario, username, passhash, nombre, a_paterno, a_materno, descripcion, email, telefono], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readUsuarios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_usuario } = req.params;
    if (!id_usuario) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewUsuarios(?);', [id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateUsuarios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_usuario } = req.params;
    const { nombre, a_paterno, a_materno, descripcion, email, telefono } = req.body;
    if (!id_usuario || !nombre || !a_paterno || !a_materno || !descripcion || !email || !telefono) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addUsuarios(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_usuario, 0, 0, 0, 0, nombre, a_paterno, a_materno, descripcion, email, telefono], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteUsuarios(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_usuario } = req.params;
    if (!id_usuario) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeUsuarios(?);', [id_usuario], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    loginUsuarios,
    listUsuarios,
    createUsuarios,
    readUsuarios,
    updateUsuarios,
    deleteUsuarios
}