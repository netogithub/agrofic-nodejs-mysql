const express = require('express');
const app = express();

// Settings //
app.set('port', process.env.PORT || 3000);

// Load routes
const generos_routes = require('./routes/catalogos/generos.routes');
const especies_routes = require('./routes/catalogos/especies.routes');
const cultivos_routes = require('./routes/catalogos/cultivos.routes');
const suelos_routes = require('./routes/catalogos/suelos.routes');
const riegos_routes = require('./routes/catalogos/riegos.routes');
const plantaciones_routes = require('./routes/catalogos/plantaciones.routes');
const sitios_routes = require('./routes/sitios.routes');
const nodos_routes = require('./routes/nodos.routes');
const sensores_routes = require('./routes/sensores.routes');
const nodo_sensor_routes = require('./routes/relaciones/nodo_sensor.routes');
const monitoreo_routes = require('./routes/monitoreo.routes');
const usuarios_routes = require('./routes/usuarios.routes');
const sitio_usuario_routes = require('./routes/relaciones/sitio_usuario.routes');

// Middlewares
app.use(express.json());

// CoRS
// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});


//Routes
const globalURL = '/api';
app.use(globalURL, generos_routes);
app.use(globalURL, especies_routes);
app.use(globalURL, cultivos_routes);
app.use(globalURL, suelos_routes);
app.use(globalURL, riegos_routes);
app.use(globalURL, plantaciones_routes);
app.use(globalURL, sitios_routes);
app.use(globalURL, nodos_routes);
app.use(globalURL, sensores_routes);
app.use(globalURL, nodo_sensor_routes);
app.use(globalURL, monitoreo_routes);
app.use(globalURL, usuarios_routes);
app.use(globalURL, sitio_usuario_routes);

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});