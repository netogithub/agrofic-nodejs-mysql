const mysqlConnection = require('../../database.js');

function listPlantaciones(req, res) {
    mysqlConnection.query('call sp_viewPlantaciones(0);', (err, rows, fields) => {
        if (err) {
            console.log('entro');
            return res.status(500).send({
                message : "Error en la petición"
            });
        }
        let plantaciones = rows[0];
        if (!plantaciones[0].id_plantacion) {
            return res.status(404).send({
                message : "No hay plantaciones"
            });
        }
        if(!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

function createPlantaciones(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { descripcion } = req.body;
    if (!descripcion) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addPlantaciones(?, ?);`;
    mysqlConnection.query(query, [0, descripcion], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function readPlantaciones(req, res) {
    const { id_plantacion } = req.params;
    if (!id_plantacion) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_viewPlantaciones(?);', [id_plantacion], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function updatePlantaciones(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_plantacion } = req.params;
    const { descripcion } = req.body;
    if (!id_plantacion || !descripcion) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    const query = `call sp_addPlantaciones(?, ?);`;
    mysqlConnection.query(query, [id_plantacion, descripcion], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

function deletePlantaciones(req, res) {
    if (req.user.tipo_usuario != 1){
        return res.status(400).send({
            message : "No tienes los permisos para esta operacion"
        });
    }
    const { id_plantacion } = req.params;
    if (!id_plantacion) {
        return res.status(500).send({
            message: 'Envia todos los campos necesarios!!'
        });
    }
    mysqlConnection.query('call sp_removePlantaciones(?);', [id_plantacion], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0][0]);
        } else {
            console.log(err);
        }
    });
}

module.exports = {
    listPlantaciones,
    createPlantaciones,
    readPlantaciones,
    updatePlantaciones,
    deletePlantaciones
}