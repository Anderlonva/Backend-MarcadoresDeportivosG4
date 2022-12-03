const { Schema, model } = require('mongoose');

const eventoSchema = Schema({

    descripcion: {
        type: String,
        required: true
    },

    equipoUno: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },

    equipoDos: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true

    },

    tipoDeporte: {
        type: Schema.Types.ObjectId,
        ref: 'Deporte',
        required: true
    },
    marcadorEuno: {
        type: String,
        required: true
    },
    marcadorEdos: {
        type: String,
        required: true
    },
    usuarioCreo: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
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

});

module.exports = model('Evento', eventoSchema);