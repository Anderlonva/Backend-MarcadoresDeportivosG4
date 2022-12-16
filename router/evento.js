const { Router } = require('express');
const Evento = require('../models/Evento')
const { validarEvento } = require('../helpers/validacion-evento')


const router = Router();

router.get('/', async function (req, res) {

    try {

        let eventos = await Evento.find().populate([ // populate sirve para hacer un join a las tablas 
            
            {
                path: 'equipoUno',
                select: 'nombre descripcion pais foto'
            },
            {
                path: 'equipoDos',
                select: 'nombre descripcion pais foto'
            },
            {
                path: 'tipoDeporte',
                select: 'nombre descripcion'
            },
            {
                path: 'usuarioCreo',
                select: 'nombre apellido email estado'
            }
        ]);
        res.send(eventos);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }


});


router.post('/',  async function (req, res) {

    try {

        const validar = validarEvento(req);

        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        const existeEvento = await Evento.findOne({ descripcion: req.body.descripcion })

        if (existeEvento) {
            return res.status(400).send('Evento ya existe');
        }

        let evento = new Evento();
        evento.descripcion = req.body.descripcion;
        evento.equipoUno = req.body.equipoUno._id;
        evento.equipoDos = req.body.equipoDos._id;
        evento.tipoDeporte = req.body.tipoDeporte._id;
        evento.marcadorEuno = req.body.marcadorEuno;
        evento.marcadorEdos = req.body.marcadorEdos;
        evento.usuarioCreo = req.body.usuarioCreo._id;
        evento.fechaEvento = req.body.fechaEvento;
        //evento.estado = req.body.estado;
        evento.fechaCreacion = new Date();
        evento.fechaActualizacion = new Date();


        evento = await evento.save();

        res.send(evento);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }

});



router.put('/:eventoId', async function (req, res) {
    try {

        let evento = await Evento.findById(req.params.eventoId);

        if (!evento) {
            return res.status(400).send('El Evento no existe');
        }

        let eventoDes = await Evento.findOne({ descripcion: req.body.descripcion, _id: { $ne: evento._id } });
        //$ne = no equals no igual 

        if (eventoDes) {
            return res.status(400).send('El Evento ya existe');
        }

        evento.descripcion = req.body.descripcion;
        evento.equipoUno = req.body.equipoUno;
        evento.equipoDos = req.body.equipoDos;
        evento.tipoDeporte = req.body.tipoDeporte;
        evento.marcadorEuno = req.body.marcadorEuno;
        evento.marcadorEdos = req.body.marcadorEdos;
        evento.usuarioCreo = req.body.usuarioCreo;
        evento.fechaEvento = req.body.fechaEvento;
        evento.estado = req.body.estado;
        evento.fechaActualizacion = new Date();


        evento = await evento.save();

        res.send(evento);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});



router.get('/:eventoId', async function (req, res) {
    try {
        const evento = await Evento.findById(req.params.eventoId)
        if (!evento) {
            return res.status(404).send('Evento no existe')
        }
        res.send(evento)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router