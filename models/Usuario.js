const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: [
            'Admin',
            'Usuario'
        ]
    },
    estado: {
        type: String,
        required: true,
        enum: [
            'Activo',
            'Inactivo'
        ]
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    }


});

module.exports = model('Usuario', UsuarioSchema);