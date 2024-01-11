const JugueteModel = require('../models/juguetes.model');
const jugueteCtrl = {};

jugueteCtrl.addJuguete = async (req,res) =>{
    const myJuguete = new JugueteModel(req.body);
    await myJuguete.save()
        .then(() =>{
            res.json({status: "Juguete añadido con éxito"})
        })
        .catch(err => res.send(err.message))
}
// Función GET.-
jugueteCtrl.getJuguetes = async (req,res)=>{
    const juguete = await JugueteModel.find()
        // Si todo funciona correctamente devolvemos en formato Json el mensaje
        .then((data)=>res.json(data))
        // Si no funciona de forma correcta mandamos el mensaje de error.
        .catch(err => res.send(err.message))
}

// Función Get para un solo elemento
jugueteCtrl.getJuguete = async (req,res)=> {
    const juguete = await JugueteModel.findById(req.params.id)
        // Si todo funciona correctamente devolvemos en formato Json el mensaje
        .then((data)=> {
            if(data!=null) res.json(data)
            else res.json({status: 'Ese juguete no existe'})
        })
        // Si no funciona de forma correcta mandamos el mensaje de error.
        .catch(err => res.send(err.message))
}

// Función PATCH para un solo elemento
jugueteCtrl.updateJuguete = async (req,res) => {
    // Guardamos la información.
    const juguete = req.body;
    // Si busca un id y no lo encuentra con el new:true nos lo crea
    await JugueteModel.findByIdAndUpdate(
        req.params.id,
        {$set: juguete},
        {new: true}
    )
        // Si todo funciona correctamente devolvemos en formato Json el mensaje y actualizamos
        .then((data)=>{
            if(data!=null) res.json({status: 'Juguete actualizado en la bbdd', data})
            else res.json({status: 'El juguete no existe en la bbdd'})
        })
        // Si no funciona de forma correcta mandamos el mensaje de error.
        .catch(err => res.send(err.message))
}

// Función DELETE.
jugueteCtrl.deleteJuguete = async (req,res) =>{
    await JugueteModel.findByIdAndDelete(req.params.id)
        // Si todo funciona correctamente devolvemos en formato Json el mensaje y borramos
        .then((data) =>{
            if(data!=null) res.json({satus: 'Juguete borrado de la bbdd'},data)
            else res.json({status: 'El juguete no existe en la bbdd'})
        })
        // Si no funciona de forma correcta mandamos el mensaje de error.
        .catch(err => res.send(err.message))
}

// Funcion para sacar las categorías de los juguetes
jugueteCtrl.getCategoria = async (req, res) => {
    // Sacamos los elementos que son distintos de los géneros de las películas de la BBDD
    await JugueteModel.find().distinct('categoria')
        // Si todo funciona correctamente
        .then((data) =>res.json(data))
        // Si no funciona de forma correcta mandamos el mensaje de error.
        .catch((err) => res.send(err.message))
}

// Funcion para GETONE por nombre.
jugueteCtrl.getByName = async (req,res)=> {
    // REGEX Notacion de texto (Expresiones regulares)
    const juguete = await JugueteModel.find({nombre: {$regex: req.params.name}})
        // Si todo funciona correctamente devolvemos en formato Json el mensaje
        .then((data)=> {
            if(data!=null) res.json(data)
            else res.json({status: 'El juguete no existe en la bbdd'})
        })
        // Si no funciona de forma correcta mandamos el mensaje de error.
        .catch(err => res.send(err.message))
}
module.exports = jugueteCtrl;
