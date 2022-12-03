const {Schema, model} = require('mongoose');

const EquipoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
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

})

module.exports = model('Equipo', EquipoSchema);