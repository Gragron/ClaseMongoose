const mongoose = require('mongoose');
const { Schema } = mongoose;

const personaSchema = new Schema({
    nombre: String,
    apellidos: {
        paterno: String,
        materno: String
    },
    edad: Number,
    peso: Number,
    ojos: {
        type: Number,
        default: 2
    }
})

// link de collection con Schema
mongoose.model('personas', personaSchema)