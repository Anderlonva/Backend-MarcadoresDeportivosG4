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
    fechaEvento: {
        type: String,
        required: true
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