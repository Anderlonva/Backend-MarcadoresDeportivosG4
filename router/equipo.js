const { Router } = require('express');
const Equipo = require('../models/Equipo')
const { validarEquipo } = require('../helpers/validacion-equipo')

const router  = Router();

router.get('/', async function(req, res){
    try {
        
        const deportes = await Equipo.find();
        res.send(deportes);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});



router.post('/',  async function(req, res){

    try {

        const validar = validarEquipo(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }
    
        const existeEquipo = await Equipo.findOne({nombre: req.body.nombre})

        if (existeEquipo) {
            return res.status(400).send('Equipo ya existe');
        }

        let equipo = new Equipo();
        equipo.nombre = req.body.nombre;
        equipo.descripcion = req.body.descripcion;
        equipo.pais = req.body.pais;
        equipo.foto = req.body.foto;
        equipo.estado = req.body.estado;
        equipo.fechaCreacion = new Date();
        equipo.fechaActualizacion = new Date();

    
        equipo = await equipo.save();
    
        res.send(equipo); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
   
});



router.put('/:equipoId', async function(req, res){
    try {

       let equipo = await Equipo.findById(req.params.equipoId); 

        if (!equipo) {
            return res.status(400).send('El Equipo no existe');
        }

        let equipoNombre = await Equipo.findOne({nombre: req.body.nombre, _id: {$ne: equipo._id}});
                                                //$ne = no equals no igual 
                                                
          if (equipoNombre) {
            return res.status(400).send('El Equipo ya existe');
          }

          equipo.nombre = req.body.nombre;
          equipo.descripcion = req.body.descripcion;
          equipo.pais = req.body.pais;
          equipo.foto = req.body.foto;
          equipo.estado = req.body.estado;
          equipo.fechaActualizacion = new Date();

    
          equipo = await equipo.save(); 
    
        res.send(equipo); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});



router.get('/:equipoId', async function( req, res ) {
    try {
        const equipo = await Equipo.findById(req.params.equipoId)
        if (!equipo) {
            return res.status(404).send('Equipo no existe')
        }
        res.send(equipo)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router