const e = require('express');
const { Router } = require('express');
const Deporte = require('../models/Deporte');
const { validarDeporte } = require('../helpers/validacion-deporte');

const router  = Router();

router.get('/', async function(req, res){
    try {
        
        const deportes = await Deporte.find();
        res.send(deportes);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});



router.post('/',  async function(req, res){

    try {

        const validar = validarDeporte(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }
    
        const existeDeporte = await Deporte.findOne({nombre: req.body.nombre})

        if (existeDeporte) {
            return res.status(400).send('Deporte ya existe');
        }

        let deporte = new Deporte();
        deporte.nombre = req.body.nombre;
        deporte.descripcion = req.body.descripcion;
        deporte.estado = req.body.estado;
        deporte.fechaCreacion = new Date();
        deporte.fechaActualizacion = new Date();

    
        deporte = await deporte.save();
    
        res.send(deporte); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
   
});



router.put('/:deporteId', async function(req, res){
    try {

        let deporte = await Deporte.findById(req.params.deporteId); 

        if (!deporte) {
            return res.status(400).send('El Deporte no existe');
        }

        let deporteNombre = await Deporte.findOne({nombre: req.body.nombre, _id: {$ne: deporte._id}});
                                                //$ne = no equals no igual 
                                                
          if (deporteNombre) {
            return res.status(400).send('El Deporte ya existe');
          }

          deporte.nombre = req.body.nombre;
          deporte.descripcion = req.body.descripcion;
          deporte.estado = req.body.estado;
          deporte.fechaActualizacion = new Date();

    
          deporte = await deporte.save(); 
    
        res.send(deporte); 
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});



router.get('/:deporteId', async function( req, res ) {
    try {
        const deporte = await Deporte.findById(req.params.deporteId)
        if (!deporte) {
            return res.status(404).send('Deporte no existe')
        }
        res.send(deporte)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router