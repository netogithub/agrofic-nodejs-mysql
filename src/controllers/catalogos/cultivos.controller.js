const mysqlConnection = require('../../database.js');

function listCultivos(req, res) {
    mysqlConnection.query('call sp_viewCultivos(0);', (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createCultivos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion, deficit_min, deficit_max, p_raiz_min, p_raiz_max, tension_min, tension_max, id_especie } = req.body;
    if (!descripcion || !deficit_min || !deficit_max || !p_raiz_min || !p_raiz_max || !tension_min || !tension_max || !id_especie) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addCultivos(?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [0, descripcion, deficit_min, deficit_max, p_raiz_min, p_raiz_max, tension_min, tension_max, id_especie], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readCultivos(req, res) {
    const { id_cultivo } = req.params;
    if (!id_cultivo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewCultivos(?);', [id_cultivo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updateCultivos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_cultivo } = req.params;
    const { descripcion, deficit_min, deficit_max, p_raiz_min, p_raiz_max, tension_min, tension_max, id_especie } = req.body;
    if (!id_cultivo || !descripcion || !deficit_min || !deficit_max || !p_raiz_min || !p_raiz_max || !tension_min || !tension_max || !id_especie) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addCultivos(?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    mysqlConnection.query(query, [id_cultivo, descripcion, deficit_min, deficit_max, p_raiz_min, p_raiz_max, tension_min, tension_max, id_especie], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deleteCultivos(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_cultivo } = req.params;
    if (!id_cultivo) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removeCultivos(?);', [id_cultivo], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    listCultivos,
    createCultivos,
    readCultivos,
    updateCultivos,
    deleteCultivos
}