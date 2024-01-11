const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const JugueteSchema= new Schema(
    {
        nombre: {type: String, required: true},
        edad_minima: {type: Number, required: true},
        precio: {type: Number, required: true},
        categoria: {type: String, required: true},
        imagen: {type: String, required: true}
    }
);

module.exports = mongoose.model('Juguete',JugueteSchema,'Juguetes');
