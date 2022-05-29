'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

function createToken(nuevo) {
    var payload = {
        id_usuario: nuevo.id_usuario,
        estatus: nuevo.estatus,
        tipo_usuario: nuevo.tipo_usuario,
        username: nuevo.username,
        pass: nuevo.pass,
        nombre: nuevo.nombre,
        a_paterno: nuevo.a_paterno,
        a_materno: nuevo.a_materno,
        descripcion: nuevo.descripcion,
        email: nuevo.email,
        telefono: nuevo.telefono
    };

    return jwt.encode(payload, secret)
}

function ensureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403)
        .send({
            message: 'La peticion no tiene la cabecera de autenticación'
        });
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment.unix()) {
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        }
    } catch(ex) {
        return res.status(404).send({
            message: 'El token no es valido'
        });
    }
    req.user = payload;
    next();
}

module.exports = {
    ensureAuth,
    createToken
}