const mongoose = require('mongoose');

const URI = 'mongodb+srv://root:root@clustergaia.t9u3di8.mongodb.net/Juguetes?retryWrites=true&w=majority';

mongoose.connect(URI)
    .then( db => console.log('DB connected '))
    .catch(err => console.error(err))

// Exportar el módulo para conectar
module.exports = mongoose;
