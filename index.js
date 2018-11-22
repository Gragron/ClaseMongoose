const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

// conexion de BD
mongoose.connect(keys.mongoConnection);

// creamos la app y solo debe existir solo un vez
const app = express();
app.use(bodyParser.json()); // es para que las respuestas siempre las devuelva en JSON

// exportamos las rutas de personas y cada que queramos exportar no se pueden todas a la vez 
// tiene que se una ruta por archivo
const rutaPersonas = require('./routes/personasRoutes')
rutaPersonas(app); // mandamos el app para que pueda utilizar express para poder ejecutar las rutas
// require('./routes/personasRoutes')(app); // es lo mismo que las dos lineas de arriba


// app.get('/', (req, res) => {
//     res.send({ mensaje: 'hola' })
// })

// puerto que escucha la aplicacion
app.listen(process.env.PORT || 5000);