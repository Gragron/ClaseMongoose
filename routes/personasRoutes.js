// llamamos a mongoose es como el puente { conector o driver de conexion }
const mongoose = require('mongoose'); // solo se conecta a BD Mongo

// cargamos middleware
// const personasMiddleware = require('../middlewares/personasMiddleware');
const  { fillData, typeData } = require('../middlewares/personasMiddleware'); // middleware with destructuring

// mandamos llamas al Schema o Modelo de BD
require('../models/Persona');
const Persona = mongoose.model('personas');

// exportamos 
module.exports = (app) => {
    /**
     * get all users
     */
    app.get('/api/personas', async (req, res) => {
        try {
            const respuesta = await Persona.find({});
            res.send(respuesta);
        } catch (error) {
            res.send(error.message);
        }
    })

    /**
     * get user
     */
    app.get('/api/personas/:id', async (req, res) => {
        try {
            const response = await Persona.find({ _id: req.params.id });
            res.send(response);
        } catch (error) {
            res.send(error.message);
        }
        // const respuesta = await Persona.find({});
        // res.send(respuesta);
    })


    // (parametros que recibe , respuesta) 
    /**
     * save new data user
     */
    app.post('/api/personas', 
        fillData,
        typeData,
        async (req, res) => {
            try {
                const { nombre, apellidos, edad, peso, ojos } = req.body; // destructuring data
                const newPerson = Persona({ nombre, apellidos, edad, peso, ojos });
                const request = await newPerson.save();
                res.send(request);
            } catch (error) {
                res.send(error.message);
            }
        }
    )

    /**
     * update data user
     */
    app.post('/api/personas/:identificador', 
    fillData,
    typeData,
    async (req, res) => {
        try {
            // recibe tres objetos { a quien modifico, datos que modifico, si mre regresa el dato viejo(false) o nuevo(true) }
            const response = await Persona.findOneAndUpdate(
                { _id: req.params.id },
                { ...req.body }, // es lo mismo que req.body ya que ya es un objeto
                { new: true }
            ).exec();
            res.send(response);
        } catch (error) {
            res.send(error.message);
        }
    })

    /**
     * delete user
     */
    app.delete('/api/personas/:identificador', async (req, res) => {
        try {
            const response = await Persona.deleteOne({ _id: req.params.id });
            res.send(response);
        } catch (error) {
            res.send(error.message);
        }
    })


}